import {
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
    PointerEvent as ReactPointerEvent,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import { getRandId } from "utils/";
import { CanvasNode, Connector, ConnectorId, NodeId, Point, destinationList } from "./types";
import { DEFAULT_VIEWPORT, Viewport } from "./useViewport";

export interface UseCanvasOptions<TData = unknown> {
    nodes: CanvasNode<TData>[];
    connectors: Connector[];
    onNodesChange?: (nodes: CanvasNode<TData>[]) => void;
    onConnectorsChange?: (connectors: Connector[]) => void;
    /** Whether shift/ctrl/meta-click adds to the current selection instead of replacing it. Defaults to true. */
    multiSelect?: boolean;
    /** Current pan/zoom, so pointer positions can be mapped back to content-space coordinates. */
    viewport?: Viewport;
}

interface DragState {
    nodeId: NodeId;
    pointerId: number;
    /** Pointer position, in canvas-local coordinates, minus the node's position — kept constant through the drag. */
    grabOffset: Point;
    /** Set once the pointer has moved past a small threshold, so a drag's trailing click doesn't also toggle selection. */
    moved: boolean;
}

interface RewireTarget {
    connectorId: ConnectorId;
    role: "source" | "destination";
}

export interface ConnectingState {
    pointerId: number;
    sourceNodeId: NodeId;
    sourcePointId: string;
    /** Pointer position, in canvas-local coordinates — where the in-progress connector's loose end is drawn. */
    currentPoint: Point;
    /**
     * Set when the dragged-from port already belongs to a connector: dropping on a new port then
     * moves that connector's matching endpoint instead of adding a second connector alongside it.
     */
    rewire?: RewireTarget;
}

/** The first existing connector (if any) with an endpoint at this exact port, and which end it is. */
const findConnectorAtPort = (connectors: Connector[], nodeId: NodeId, pointId: string): RewireTarget | undefined => {
    for (const connector of connectors) {
        if (connector.sourcePoint.nodeId === nodeId && connector.sourcePoint.pointId === pointId) {
            return { connectorId: connector.id, role: "source" };
        }
        if (destinationList(connector).some((d) => d.nodeId === nodeId && d.pointId === pointId)) {
            return { connectorId: connector.id, role: "destination" };
        }
    }
    return undefined;
};

const DRAG_THRESHOLD_PX = 4;

/**
 * @function useCanvas
 * @description Drives Canvas's pointer interactions — node dragging, drag-to-connect (dragging a
 * port that already belongs to a connector rewires that connector's matching endpoint instead of
 * adding a new one alongside it), click-to-select (with shift/ctrl/meta for multi-select), and
 * Delete/Backspace removal of selected, deletable nodes and connectors. Canvas stays controlled:
 * this hook only ever proposes new arrays through `onNodesChange`/`onConnectorsChange`, it holds no
 * node state of its own besides the in-flight drag.
 */
export const useCanvas = <TData,>(
    containerRef: RefObject<SVGSVGElement | null>,
    options: UseCanvasOptions<TData>,
) => {
    const { nodes, connectors, onNodesChange, onConnectorsChange, multiSelect = true, viewport = DEFAULT_VIEWPORT } = options;
    const dragState = useRef<DragState | null>(null);
    const lastDragMoved = useRef(false);
    // State (not a ref) because the in-progress connector line is drawn from it every move.
    const [connecting, setConnecting] = useState<ConnectingState | null>(null);

    // Converts a client-space pointer position to content-space (the coordinate system nodes'
    // `position` live in), undoing both the SVG's on-screen placement and the pan/zoom transform.
    const toLocalPoint = useCallback((clientX: number, clientY: number): Point => {
        const rect = containerRef.current?.getBoundingClientRect();
        const screenX = rect ? clientX - rect.left : clientX;
        const screenY = rect ? clientY - rect.top : clientY;
        return {
            x: (screenX - viewport.x) / viewport.scale,
            y: (screenY - viewport.y) / viewport.scale,
        };
    }, [containerRef, viewport]);

    const updateNode = useCallback((nodeId: NodeId, patch: Partial<CanvasNode<TData>>) => {
        onNodesChange?.(nodes.map((node) => (
            node.id === nodeId ? { ...node, ...patch } as CanvasNode<TData> : node
        )));
    }, [nodes, onNodesChange]);

    const handlePointerDownNode = useCallback((node: CanvasNode<TData>, event: ReactPointerEvent) => {
        if (node.draggable === false) return;
        const local = toLocalPoint(event.clientX, event.clientY);
        dragState.current = {
            nodeId: node.id,
            pointerId: event.pointerId,
            grabOffset: { x: local.x - node.position.x, y: local.y - node.position.y },
            moved: false,
        };
        (event.target as Element).setPointerCapture?.(event.pointerId);
        updateNode(node.id, { isDragging: true } as Partial<CanvasNode<TData>>);
    }, [toLocalPoint, updateNode]);

    const handlePointerDownPort = useCallback((node: CanvasNode<TData>, pointId: string, event: ReactPointerEvent) => {
        if (node.connectable === false) return;
        (event.target as Element).setPointerCapture?.(event.pointerId);
        setConnecting({
            pointerId: event.pointerId,
            sourceNodeId: node.id,
            sourcePointId: pointId,
            currentPoint: toLocalPoint(event.clientX, event.clientY),
            rewire: findConnectorAtPort(connectors, node.id, pointId),
        });
    }, [connectors, toLocalPoint]);

    const handlePointerMove = useCallback((event: ReactPointerEvent) => {
        const drag = dragState.current;
        if (drag && drag.pointerId === event.pointerId) {
            const local = toLocalPoint(event.clientX, event.clientY);
            const position = { x: local.x - drag.grabOffset.x, y: local.y - drag.grabOffset.y };
            const currentNode = nodes.find((n) => n.id === drag.nodeId);
            if (currentNode && Math.hypot(position.x - currentNode.position.x, position.y - currentNode.position.y) > DRAG_THRESHOLD_PX) {
                drag.moved = true;
            }
            updateNode(drag.nodeId, { position } as Partial<CanvasNode<TData>>);
            return;
        }

        setConnecting((prev) => {
            if (!prev || prev.pointerId !== event.pointerId) return prev;
            return { ...prev, currentPoint: toLocalPoint(event.clientX, event.clientY) };
        });
    }, [nodes, toLocalPoint, updateNode]);

    /** Finds the port (if any) under the pointer at release — used to complete a drag-to-connect gesture. */
    const findPortAtPoint = useCallback((clientX: number, clientY: number) => {
        const target = document.elementFromPoint(clientX, clientY);
        const portEl = target?.closest("[data-port-id]");
        const nodeEl = portEl?.closest("[data-node-id]");
        const targetPointId = portEl?.getAttribute("data-port-id");
        const targetNodeId = nodeEl?.getAttribute("data-node-id");
        if (!targetNodeId || !targetPointId) return null;
        return { nodeId: targetNodeId, pointId: targetPointId };
    }, []);

    const handlePointerUp = useCallback((event: ReactPointerEvent) => {
        const drag = dragState.current;
        if (drag && drag.pointerId === event.pointerId) {
            dragState.current = null;
            lastDragMoved.current = drag.moved;
            updateNode(drag.nodeId, { isDragging: false } as Partial<CanvasNode<TData>>);
            return;
        }

        setConnecting((prev) => {
            if (!prev || prev.pointerId !== event.pointerId) return prev;
            const target = findPortAtPoint(event.clientX, event.clientY);
            // Dropping back on the same port that started the drag, or off any port, is a no-op —
            // for a rewire in particular, this leaves the connector exactly as it was.
            if (!target || (target.nodeId === prev.sourceNodeId && target.pointId === prev.sourcePointId)) {
                return null;
            }

            if (prev.rewire) {
                const { connectorId, role } = prev.rewire;
                onConnectorsChange?.(connectors.map((c) => {
                    if (c.id !== connectorId) return c;
                    if (role === "source") {
                        return { ...c, sourcePoint: { nodeId: target.nodeId, pointId: target.pointId } };
                    }
                    // role === "destination": replace only the matching entry, preserving any other
                    // branches when destinationPoints is an array.
                    const nextDestination = { nodeId: target.nodeId, pointId: target.pointId };
                    if (!Array.isArray(c.destinationPoints)) return { ...c, destinationPoints: nextDestination };
                    return {
                        ...c,
                        destinationPoints: c.destinationPoints.map((d) => (
                            d.nodeId === prev.sourceNodeId && d.pointId === prev.sourcePointId ? nextDestination : d
                        )),
                    };
                }));
            } else {
                const newConnector: Connector = {
                    id: getRandId(),
                    sourcePoint: { nodeId: prev.sourceNodeId, pointId: prev.sourcePointId },
                    destinationPoints: { nodeId: target.nodeId, pointId: target.pointId },
                };
                onConnectorsChange?.([...connectors, newConnector]);
            }
            return null;
        });
    }, [updateNode, findPortAtPoint, connectors, onConnectorsChange]);

    const selectNode = useCallback((node: CanvasNode<TData>, additive: boolean) => {
        if (node.selectable === false) return;
        onNodesChange?.(nodes.map((n) => {
            if (n.id === node.id) return { ...n, isSelected: !n.isSelected } as CanvasNode<TData>;
            if (!additive && n.isSelected) return { ...n, isSelected: false } as CanvasNode<TData>;
            return n;
        }));
        if (!additive) onConnectorsChange?.(connectors.map((c) => (c.isSelected ? { ...c, isSelected: false } : c)));
    }, [nodes, connectors, onNodesChange, onConnectorsChange]);

    const handleClickNode = useCallback((node: CanvasNode<TData>, event: ReactMouseEvent) => {
        if (lastDragMoved.current) {
            lastDragMoved.current = false;
            return;
        }
        selectNode(node, multiSelect && (event.shiftKey || event.metaKey || event.ctrlKey));
    }, [selectNode, multiSelect]);

    const selectConnector = useCallback((connector: Connector, additive: boolean) => {
        if (connector.selectable === false) return;
        onConnectorsChange?.(connectors.map((c) => {
            if (c.id === connector.id) return { ...c, isSelected: !c.isSelected };
            if (!additive && c.isSelected) return { ...c, isSelected: false };
            return c;
        }));
        if (!additive) onNodesChange?.(nodes.map((n) => (n.isSelected ? { ...n, isSelected: false } : n)));
    }, [connectors, nodes, onConnectorsChange, onNodesChange]);

    const handleClickConnector = useCallback((connector: Connector, event: ReactMouseEvent) => {
        selectConnector(connector, multiSelect && (event.shiftKey || event.metaKey || event.ctrlKey));
    }, [selectConnector, multiSelect]);

    const clearSelection = useCallback(() => {
        if (!nodes.some((n) => n.isSelected) && !connectors.some((c) => c.isSelected)) return;
        onNodesChange?.(nodes.map((n) => (n.isSelected ? { ...n, isSelected: false } : n)));
        onConnectorsChange?.(connectors.map((c) => (c.isSelected ? { ...c, isSelected: false } : c)));
    }, [nodes, connectors, onNodesChange, onConnectorsChange]);

    const deleteSelected = useCallback(() => {
        const removedIds = new Set(nodes.filter((n) => n.isSelected && n.deletable !== false).map((n) => n.id));
        if (removedIds.size) onNodesChange?.(nodes.filter((n) => !removedIds.has(n.id)));

        onConnectorsChange?.(connectors.filter((c) => {
            const destinations = Array.isArray(c.destinationPoints) ? c.destinationPoints : [c.destinationPoints];
            const touchesRemovedNode = removedIds.has(c.sourcePoint.nodeId) || destinations.some((d) => removedIds.has(d.nodeId));
            const explicitlyRemoved = c.isSelected && c.deletable !== false;
            return !touchesRemovedNode && !explicitlyRemoved;
        }));
    }, [nodes, connectors, onNodesChange, onConnectorsChange]);

    const handleKeyDown = useCallback((event: ReactKeyboardEvent) => {
        if (event.key !== "Delete" && event.key !== "Backspace") return;
        const target = event.target as HTMLElement;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
        event.preventDefault();
        deleteSelected();
    }, [deleteSelected]);

    return {
        connecting,
        handlePointerDownNode,
        handlePointerDownPort,
        handlePointerMove,
        handlePointerUp,
        handleClickNode,
        handleClickConnector,
        clearSelection,
        deleteSelected,
        handleKeyDown,
    };
};
