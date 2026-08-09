import { FC, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import ComponentProps from "../Component";
import { CanvasNode, Connector, ConnectorId, NodeId, PaletteEntry, Point } from "./types";
import NodeView from "./Node";
import ConnectorView from "./Connector";
import NodeInspector from "./NodeInspector";
import NodeEditor, { NodeDataField } from "./NodeEditor";
import ViewportControls from "./ViewportControls";
import NodePalette from "./NodePalette";
import { defaultPaletteEntries } from "./palette";
import { useCanvas } from "./useCanvas";
import { AutoLayoutOptions, useAutoLayout } from "./layout";
import { useViewport, Viewport } from "./useViewport";
import { getPortPosition } from "./geometry";
import { getPortForNode } from "./ports";
import "./index.scss";

/** Direction the diagram flows in. "portrait" lays out top-to-bottom; "landscape" left-to-right. */
export type CanvasOrientation = "portrait" | "landscape";

export interface CanvasProps<TData = unknown> extends ComponentProps {
    nodes: CanvasNode<TData>[];
    connectors: Connector[];
    onNodesChange?: (nodes: CanvasNode<TData>[]) => void;
    onConnectorsChange?: (connectors: Connector[]) => void;
    /** Whether shift/ctrl/meta-click adds to the current selection instead of replacing it. Defaults to true. */
    multiSelect?: boolean;
    /**
     * The direction the diagram flows in — "portrait" (top-to-bottom, the default) or "landscape"
     * (left-to-right). Used as `autoLayout`'s default flow direction (an explicit `direction` in
     * `autoLayout`'s options still wins), and set as a CSS modifier class for orientation-specific
     * styling.
     */
    orientation?: CanvasOrientation;
    /**
     * Automatically arranges nodes into layers that follow the connectors, re-fitting the layout
     * whenever the canvas resizes. `true` uses the defaults; pass an options object to tune spacing
     * and flow direction. Off by default so manual node positions are left alone.
     */
    autoLayout?: boolean | AutoLayoutOptions;
    /**
     * Shows a `NodeInspector` fieldset over the canvas whenever exactly one node is selected, its
     * legend hosting an Edit button that opens `NodeEditor` (a Basic-info tab plus a Data tab built
     * from the node's `data` payload). Submitting either tab calls `onNodesChange`. Defaults to true.
     */
    editable?: boolean;
    /** Fields rendered on `NodeEditor`'s Data tab. Inferred from the editing node's `data` when omitted. */
    dataFields?: NodeDataField[];
    /**
     * Entries shown in the floating "add node" palette. Defaults to `defaultPaletteEntries` (the six
     * built-in shapes) — pass a filtered/extended array to disable a built-in one or inject a custom
     * one, e.g. `defaultPaletteEntries.filter((e) => e.id !== "loop").concat(myEntry)`.
     */
    paletteEntries?: PaletteEntry<TData>[];
    /** Shows the floating node palette. Defaults to true when `editable`. */
    showPalette?: boolean;
    /** Whether dragging the empty canvas background (or plain wheel/trackpad scroll) pans the view. Defaults to true. */
    panEnabled?: boolean;
    /** Whether ctrl/cmd+wheel (how browsers report trackpad pinch) and the zoom buttons work. Defaults to true. */
    zoomEnabled?: boolean;
    minZoom?: number;
    maxZoom?: number;
    /** Shows the floating zoom in/out/reset control. Defaults to true when `zoomEnabled`. */
    showZoomControls?: boolean;
    /** Controlled pan/zoom. Omit along with `onViewportChange` to let Canvas manage it internally. */
    viewport?: Viewport;
    onViewportChange?: (viewport: Viewport) => void;
    width?: number | string;
    height?: number | string;
}

const noop = () => {};

/**
 * @component Canvas
 * @description A node-graph canvas: draggable, selectable shapes (Circle, Rectangle, Control,
 * Union, Loop, End) connected by Connectors, rendered as a single SVG. Fully controlled — Canvas
 * proposes changes through `onNodesChange`/`onConnectorsChange` rather than owning state itself.
 * @example
 * <Canvas
 *   nodes={nodes}
 *   connectors={connectors}
 *   onNodesChange={setNodes}
 *   onConnectorsChange={setConnectors}
 *   autoLayout
 * />
 */
const Canvas: FC<CanvasProps<any>> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        nodes, connectors,
        onNodesChange, onConnectorsChange,
        multiSelect = true,
        orientation = "portrait",
        autoLayout = false,
        editable = true,
        dataFields,
        paletteEntries = defaultPaletteEntries,
        showPalette = editable,
        panEnabled = true,
        zoomEnabled = true,
        minZoom, maxZoom,
        showZoomControls = zoomEnabled,
        viewport: viewportProp, onViewportChange,
        width = "100%", height = "100%",
    } = props;

    const containerRef = useRef<SVGSVGElement>(null);
    const [editingNodeId, setEditingNodeId] = useState<NodeId | null>(null);

    const {
        viewport, lastPanMoved,
        handleBackgroundPointerDown,
        handlePointerMove: handleViewportPointerMove, handlePointerUp: handleViewportPointerUp,
        handleWheel, zoomIn, zoomOut, resetView,
    } = useViewport(containerRef, {
        viewport: viewportProp, onViewportChange, panEnabled, zoomEnabled, minZoom, maxZoom,
    });

    const {
        connecting,
        handlePointerDownNode, handlePointerDownPort, handlePointerMove, handlePointerUp,
        handleClickNode, handleClickConnector, clearSelection, handleKeyDown,
    } = useCanvas(containerRef, { nodes, connectors, onNodesChange, onConnectorsChange, multiSelect, viewport });

    const orientationDirection = orientation === "landscape" ? "horizontal" : "vertical";
    useAutoLayout(
        containerRef,
        nodes,
        connectors,
        onNodesChange ?? noop,
        typeof autoLayout === "object"
            ? { direction: orientationDirection, ...autoLayout, enabled: true }
            : { direction: orientationDirection, enabled: autoLayout },
    );

    let className_ = `prismal-canvas prismal-canvas-${orientation === "landscape" ? "l" : "p"}`;
    if (panEnabled) className_ = `${className_} prismal-canvas-pannable`;
    if (className) className_ = `${className_} ${className}`;

    const sortedNodes = [...nodes].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const handleAnyPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
        handlePointerMove(event);
        handleViewportPointerMove(event);
    };

    const handleAnyPointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
        handlePointerUp(event);
        handleViewportPointerUp(event);
    };

    const handleBackgroundClick = (event: ReactMouseEvent<SVGSVGElement>) => {
        if (event.target !== containerRef.current) return;
        if (lastPanMoved.current) {
            lastPanMoved.current = false;
            return;
        }
        clearSelection();
    };

    const selectedNodes = nodes.filter((node) => node.isSelected);
    const inspectedNode = editable && selectedNodes.length === 1 ? selectedNodes[0] : null;
    const editingNode = editingNodeId ? nodes.find((node) => node.id === editingNodeId) ?? null : null;

    const submitNodeEdit = (updated: CanvasNode<any>) => {
        onNodesChange?.(nodes.map((node) => (node.id === updated.id ? updated : node)));
    };

    const handleAddNode = (entry: PaletteEntry<any>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        const centerScreen = rect ? { x: rect.width / 2, y: rect.height / 2 } : { x: 0, y: 0 };
        // Small jitter so repeatedly clicking the same palette entry doesn't stack nodes exactly on top of each other.
        const jitter = () => (Math.random() - 0.5) * 40;
        const position: Point = {
            x: (centerScreen.x - viewport.x) / viewport.scale + jitter(),
            y: (centerScreen.y - viewport.y) / viewport.scale + jitter(),
        };
        const newNode = { ...entry.createNode(position), isSelected: true };
        onNodesChange?.([
            ...nodes.map((node) => (node.isSelected ? { ...node, isSelected: false } : node)),
            newNode,
        ]);
    };

    const addConnector = (connector: Connector) => {
        onConnectorsChange?.([...connectors, connector]);
    };

    const removeConnector = (connectorId: ConnectorId) => {
        onConnectorsChange?.(connectors.filter((c) => c.id !== connectorId));
    };

    const connectingSource = connecting ? nodes.find((n) => n.id === connecting.sourceNodeId) : undefined;
    const connectingPreviewPath = connecting && connectingSource
        ? (() => {
            const from = getPortPosition(connectingSource, connecting.sourcePointId, orientationDirection);
            const fromSide = getPortForNode(connectingSource, connecting.sourcePointId, orientationDirection)?.side;
            const dx = connecting.currentPoint.x - from.x;
            const dy = connecting.currentPoint.y - from.y;
            const c1 = fromSide === "left" || fromSide === "right"
                ? { x: from.x + dx * 0.5, y: from.y }
                : { x: from.x, y: from.y + dy * 0.5 };
            return `M ${from.x} ${from.y} Q ${c1.x} ${c1.y}, ${connecting.currentPoint.x} ${connecting.currentPoint.y}`;
        })()
        : null;

    return (
        <div className="prismal-canvas-wrapper">
            <svg
                ref={containerRef}
                data-id={dataId}
                className={className_}
                style={{ width, height, ...style }}
                tabIndex={0}
                onPointerDown={handleBackgroundPointerDown}
                onPointerMove={handleAnyPointerMove}
                onPointerUp={handleAnyPointerUp}
                onPointerLeave={handleAnyPointerUp}
                onWheel={handleWheel}
                onKeyDown={handleKeyDown}
                onClick={handleBackgroundClick}
            >
                <defs>
                    <marker
                        id="prismal-canvas-arrow" viewBox="0 0 10 10"
                        refX="8" refY="5" markerWidth="8" markerHeight="8"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                <g className="prismal-canvas-viewport" transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}>
                    <g className="prismal-canvas-connectors">
                        {connectors.map((connector) => (
                            <ConnectorView
                                key={connector.id}
                                connector={connector}
                                nodes={nodes}
                                flowDirection={orientationDirection}
                                onClickConnector={handleClickConnector}
                                dimmed={connecting?.rewire?.connectorId === connector.id}
                            />
                        ))}
                        {connectingPreviewPath ? (
                            <path className="prismal-canvas-connector-preview" d={connectingPreviewPath} fill="none" />
                        ) : null}
                    </g>
                    <g className="prismal-canvas-nodes">
                        {sortedNodes.map((node) => (
                            <NodeView
                                key={node.id}
                                node={node}
                                flowDirection={orientationDirection}
                                onPointerDownNode={handlePointerDownNode}
                                onPointerDownPort={handlePointerDownPort}
                                onClickNode={handleClickNode}
                            />
                        ))}
                    </g>
                </g>
            </svg>
            {showPalette ? (
                <NodePalette entries={paletteEntries} onAdd={handleAddNode} />
            ) : null}
            {showZoomControls ? (
                <ViewportControls scale={viewport.scale} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetView} />
            ) : null}
            {inspectedNode ? (
                <NodeInspector node={inspectedNode} onEdit={() => setEditingNodeId(inspectedNode.id)} />
            ) : null}
            {editable ? (
                <NodeEditor
                    node={editingNode}
                    visible={!!editingNode}
                    dataFields={dataFields}
                    nodes={nodes}
                    connectors={connectors}
                    flowDirection={orientationDirection}
                    onClose={() => setEditingNodeId(null)}
                    onSubmit={submitNodeEdit}
                    onAddConnector={addConnector}
                    onRemoveConnector={removeConnector}
                />
            ) : null}
        </div>
    );
};

export default Canvas;

export * from "./types";
export { DEFAULT_PORTS, getNodePorts, getPort } from "./ports";
export { getPortPosition, getPortLocalPosition, buildConnectorPath, resolveEndpoint } from "./geometry";
export { autoLayoutNodes, useAutoLayout } from "./layout";
export type { AutoLayoutOptions, UseAutoLayoutOptions } from "./layout";
export { exportCanvasToJSON, importCanvasFromJSON, downloadCanvasJSON, CanvasImportError } from "./serialize";
export type { CanvasDocument } from "./serialize";
export { default as NodeInspector } from "./NodeInspector";
export type { NodeInspectorProps } from "./NodeInspector";
export { default as NodeEditor } from "./NodeEditor";
export type { NodeEditorProps, NodeDataField } from "./NodeEditor";
export { useViewport, DEFAULT_VIEWPORT } from "./useViewport";
export type { Viewport, UseViewportOptions } from "./useViewport";
export { default as ViewportControls } from "./ViewportControls";
export type { ViewportControlsProps } from "./ViewportControls";
export { default as NodePalette } from "./NodePalette";
export type { NodePaletteProps } from "./NodePalette";
export { defaultPaletteEntries } from "./palette";
