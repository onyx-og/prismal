import { FC, MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import ComponentProps from "../Component";
import { CanvasNode, Connector, ConnectorId, NodeId } from "./types";
import NodeView from "./Node";
import ConnectorView from "./Connector";
import NodeInspector from "./NodeInspector";
import NodeEditor, { NodeDataField } from "./NodeEditor";
import { useCanvas } from "./useCanvas";
import { AutoLayoutOptions, useAutoLayout } from "./layout";
import { getPortPosition } from "./geometry";
import { getPort } from "./ports";
import "./index.scss";

export interface CanvasProps<TData = unknown> extends ComponentProps {
    nodes: CanvasNode<TData>[];
    connectors: Connector[];
    onNodesChange?: (nodes: CanvasNode<TData>[]) => void;
    onConnectorsChange?: (connectors: Connector[]) => void;
    /** Whether shift/ctrl/meta-click adds to the current selection instead of replacing it. Defaults to true. */
    multiSelect?: boolean;
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
        autoLayout = false,
        editable = true,
        dataFields,
        width = "100%", height = "100%",
    } = props;

    const containerRef = useRef<SVGSVGElement>(null);
    const [editingNodeId, setEditingNodeId] = useState<NodeId | null>(null);

    const {
        connecting,
        handlePointerDownNode, handlePointerDownPort, handlePointerMove, handlePointerUp,
        handleClickNode, handleClickConnector, clearSelection, handleKeyDown,
    } = useCanvas(containerRef, { nodes, connectors, onNodesChange, onConnectorsChange, multiSelect });

    useAutoLayout(
        containerRef,
        nodes,
        connectors,
        onNodesChange ?? noop,
        typeof autoLayout === "object" ? { ...autoLayout, enabled: true } : { enabled: autoLayout },
    );

    let className_ = "prismal-canvas";
    if (className) className_ = `${className_} ${className}`;

    const sortedNodes = [...nodes].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const handleBackgroundClick = (event: ReactMouseEvent<SVGSVGElement>) => {
        if (event.target === containerRef.current) clearSelection();
    };

    const selectedNodes = nodes.filter((node) => node.isSelected);
    const inspectedNode = editable && selectedNodes.length === 1 ? selectedNodes[0] : null;
    const editingNode = editingNodeId ? nodes.find((node) => node.id === editingNodeId) ?? null : null;

    const submitNodeEdit = (updated: CanvasNode<any>) => {
        onNodesChange?.(nodes.map((node) => (node.id === updated.id ? updated : node)));
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
            const from = getPortPosition(connectingSource, connecting.sourcePointId);
            const fromSide = getPort(connectingSource.shape, connecting.sourcePointId)?.side;
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
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
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
                <g className="prismal-canvas-connectors">
                    {connectors.map((connector) => (
                        <ConnectorView
                            key={connector.id}
                            connector={connector}
                            nodes={nodes}
                            onClickConnector={handleClickConnector}
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
                            onPointerDownNode={handlePointerDownNode}
                            onPointerDownPort={handlePointerDownPort}
                            onClickNode={handleClickNode}
                        />
                    ))}
                </g>
            </svg>
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
