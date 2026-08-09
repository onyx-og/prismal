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
import { CanvasNode, Connector, NodeId, Point } from "./types";

export interface UseCanvasOptions<TData = unknown> {
    nodes: CanvasNode<TData>[];
    connectors: Connector[];
    onNodesChange?: (nodes: CanvasNode<TData>[]) => void;
    onConnectorsChange?: (connectors: Connector[]) => void;
    /** Whether shift/ctrl/meta-click adds to the current selection instead of replacing it. Defaults to true. */
    multiSelect?: boolean;
}

interface DragState {
    nodeId: NodeId;
    pointerId: number;
    /** Pointer position, in canvas-local coordinates, minus the node's position — kept constant through the drag. */
    grabOffset: Point;
    /** Set once the pointer has moved past a small threshold, so a drag's trailing click doesn't also toggle selection. */
    moved: boolean;
}

export interface ConnectingState {
    pointerId: number;
    sourceNodeId: NodeId;
    sourcePointId: string;
    /** Pointer position, in canvas-local coordinates — where the in-progress connector's loose end is drawn. */
    currentPoint: Point;
}

const DRAG_THRESHOLD_PX = 4;

/**
 * @function useCanvas
 * @description Drives Canvas's pointer interactions — node dragging, click-to-select (with
 * shift/ctrl/meta for multi-select), and Delete/Backspace removal of selected, deletable nodes
 * and connectors. Canvas stays controlled: this hook only ever proposes new arrays through
 * `onNodesChange`/`onConnectorsChange`, it holds no node state of its own besides the in-flight drag.
 */
export const useCanvas = <TData,>(
    containerRef: RefObject<SVGSVGElement | null>,
    options: UseCanvasOptions<TData>,
) => {
    const { nodes, connectors, onNodesChange, onConnectorsChange, multiSelect = true } = options;
    const dragState = useRef<DragState | null>(null);
    const lastDragMoved = useRef(false);
    // State (not a ref) because the in-progress connector line is drawn from it every move.
    const [connecting, setConnecting] = useState<ConnectingState | null>(null);

    const toLocalPoint = useCallback((clientX: number, clientY: number): Point => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return { x: clientX, y: clientY };
        return { x: clientX - rect.left, y: clientY - rect.top };
    }, [containerRef]);

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
        });
    }, [toLocalPoint]);

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
            if (target && !(target.nodeId === prev.sourceNodeId && target.pointId === prev.sourcePointId)) {
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
