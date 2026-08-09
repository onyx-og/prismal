import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
    Canvas, CanvasNode, Connector,
    exportCanvasToJSON, importCanvasFromJSON, CanvasImportError,
} from '@prismal/react';
import './stories.scss';

type Payload = { note?: string; retries?: number };

const baseNodes: CanvasNode<Payload>[] = [
    { id: 'start', name: 'Start', shape: 'circle', position: { x: 260, y: 20 }, width: 70, height: 70, data: {} },
    { id: 'decision', name: 'Valid?', shape: 'control', position: { x: 235, y: 140 }, width: 120, height: 90, data: {} },
    { id: 'processA', name: 'Process A', shape: 'rectangle', variant: 'rounded', position: { x: 30, y: 290 }, width: 150, height: 60, data: { note: 'Validates and normalizes input', retries: 2 } },
    { id: 'processB', name: 'Process B', shape: 'rectangle', variant: 'pill', position: { x: 400, y: 290 }, width: 150, height: 60, data: { note: 'Handles the fallback path' } },
    { id: 'loop', name: 'Each item', shape: 'loop', mode: 'foreach', position: { x: 30, y: 410 }, width: 150, height: 60, data: {} },
    { id: 'union', name: 'Merge', shape: 'union', position: { x: 270, y: 415 }, width: 100, height: 70, data: {} },
    { id: 'end', name: 'End', shape: 'end', position: { x: 285, y: 540 }, width: 50, height: 50, data: {} },
];

const baseConnectors: Connector[] = [
    { id: 'c1', sourcePoint: { nodeId: 'start', pointId: 'bottom' }, destinationPoints: { nodeId: 'decision', pointId: 'in' } },
    { id: 'c2', sourcePoint: { nodeId: 'decision', pointId: 'false' }, destinationPoints: { nodeId: 'processA', pointId: 'top' }, label: 'No' },
    { id: 'c3', sourcePoint: { nodeId: 'decision', pointId: 'true' }, destinationPoints: { nodeId: 'processB', pointId: 'top' }, label: 'Yes' },
    { id: 'c4', sourcePoint: { nodeId: 'processA', pointId: 'bottom' }, destinationPoints: { nodeId: 'loop', pointId: 'in' } },
    { id: 'c5', sourcePoint: { nodeId: 'loop', pointId: 'out' }, destinationPoints: { nodeId: 'union', pointId: 'in-a' } },
    { id: 'c6', sourcePoint: { nodeId: 'processB', pointId: 'bottom' }, destinationPoints: { nodeId: 'union', pointId: 'in-b' } },
    { id: 'c7', sourcePoint: { nodeId: 'union', pointId: 'out' }, destinationPoints: { nodeId: 'end', pointId: 'in' } },
];

const meta = {
    title: 'Commons/Canvas',
    component: Canvas,
} as Meta<typeof Canvas>;

type Story = StoryObj<typeof meta>;

export default meta;

/**
 * A small decision flowchart. Drag nodes, click to select (shift-click to multi-select),
 * Delete/Backspace to remove. Selecting a single node also reveals its NodeInspector fieldset in
 * the top-right corner — its legend hosts an Edit button that opens the NodeEditor modal (Basic/Data
 * tabs); submitting either tab updates the node.
 */
export const Default = () => {
    const [nodes, setNodes] = useState<CanvasNode<Payload>[]>(baseNodes);
    const [connectors, setConnectors] = useState<Connector[]>(baseConnectors);

    return (
        <div className="canvas-demo">
            <Canvas
                nodes={nodes}
                connectors={connectors}
                onNodesChange={setNodes}
                onConnectorsChange={setConnectors}
                height={620}
            />
        </div>
    );
};

/** Same graph, laid out automatically — resize the browser window to see it re-fit the canvas. */
export const AutoLayout = () => {
    const [nodes, setNodes] = useState<CanvasNode<Payload>[]>(
        baseNodes.map((node) => ({ ...node, position: { x: 0, y: 0 } })),
    );
    const [connectors, setConnectors] = useState<Connector[]>(baseConnectors);

    return (
        <div className="canvas-demo">
            <Canvas
                nodes={nodes}
                connectors={connectors}
                onNodesChange={setNodes}
                onConnectorsChange={setConnectors}
                autoLayout
                height={620}
            />
        </div>
    );
};

/**
 * Focuses on edit mode: `processA` starts selected, so its NodeInspector fieldset is already
 * visible in the top-right corner — click the Edit button in its legend to open NodeEditor.
 * The "Basic" tab edits the node's name; the "Data" tab edits `data.note` and `data.retries`,
 * here labeled explicitly via the `dataFields` prop rather than left to inference. Submitting
 * either tab updates the node in place, and the modal stays open so you can switch tabs.
 */
export const EditMode = () => {
    const [nodes, setNodes] = useState<CanvasNode<Payload>[]>(() =>
        baseNodes.map((node) => (node.id === 'processA' ? { ...node, isSelected: true } : node)),
    );
    const [connectors, setConnectors] = useState<Connector[]>(baseConnectors);

    return (
        <div className="canvas-demo">
            <Canvas
                nodes={nodes}
                connectors={connectors}
                onNodesChange={setNodes}
                onConnectorsChange={setConnectors}
                dataFields={[
                    { key: 'note', label: 'Note' },
                    { key: 'retries', label: 'Retry count', valueType: 'number' },
                ]}
                height={620}
            />
        </div>
    );
};

/**
 * Focuses on connectors, both ways to manage them. Drag from any node's small port circle onto
 * another node's port to draw a new connector directly on the canvas — a dashed preview line
 * follows the pointer while dragging, and releasing over a port completes it. `A` starts selected,
 * so its NodeInspector is already visible: open its Edit button and switch to the "Connections" tab
 * to manage the same graph from a form instead — existing connectors touching the node with a
 * remove button, plus node/port pickers to add a new one without leaving the modal.
 */
export const ConnectorEditing = () => {
    const [nodes, setNodes] = useState<CanvasNode<Payload>[]>([
        { id: 'a', name: 'A', shape: 'circle', position: { x: 40, y: 130 }, width: 70, height: 70, data: {}, isSelected: true },
        { id: 'b', name: 'B', shape: 'rectangle', variant: 'rounded', position: { x: 260, y: 30 }, width: 140, height: 60, data: {} },
        { id: 'c', name: 'C', shape: 'rectangle', variant: 'rounded', position: { x: 260, y: 210 }, width: 140, height: 60, data: {} },
    ]);
    const [connectors, setConnectors] = useState<Connector[]>([
        { id: 'ab', sourcePoint: { nodeId: 'a', pointId: 'right' }, destinationPoints: { nodeId: 'b', pointId: 'left' } },
    ]);

    return (
        <div className="canvas-demo">
            <Canvas
                nodes={nodes}
                connectors={connectors}
                onNodesChange={setNodes}
                onConnectorsChange={setConnectors}
                height={340}
            />
        </div>
    );
};

/**
 * Round-trips the diagram through JSON. "Export" fills the textarea with the current nodes and
 * connectors via `exportCanvasToJSON`; edit it (or paste something else in the same shape) and hit
 * "Import" to apply it back via `importCanvasFromJSON` — a `CanvasImportError` (bad JSON, or a node/
 * connector missing a required field) is caught and shown instead of updating the canvas.
 */
export const ImportExportJSON = () => {
    const [nodes, setNodes] = useState<CanvasNode<Payload>[]>(baseNodes);
    const [connectors, setConnectors] = useState<Connector[]>(baseConnectors);
    const [json, setJson] = useState('');
    const [importError, setImportError] = useState<string | null>(null);

    const handleExport = () => {
        setImportError(null);
        setJson(exportCanvasToJSON(nodes, connectors));
    };

    const handleImport = () => {
        try {
            const doc = importCanvasFromJSON<Payload>(json);
            setNodes(doc.nodes);
            setConnectors(doc.connectors);
            setImportError(null);
        } catch (error) {
            setImportError(error instanceof CanvasImportError ? error.message : 'Failed to import JSON.');
        }
    };

    return (
        <div className="canvas-demo">
            <Canvas
                nodes={nodes}
                connectors={connectors}
                onNodesChange={setNodes}
                onConnectorsChange={setConnectors}
                height={420}
            />
            <div className="canvas-demo-json-actions">
                <button type="button" onClick={handleExport}>Export JSON</button>
                <button type="button" onClick={handleImport}>Import JSON</button>
            </div>
            <textarea
                className="canvas-demo-json-editor"
                value={json}
                onChange={(event) => setJson(event.target.value)}
                placeholder="Click Export to populate, edit freely, then Import to apply"
                rows={12}
                spellCheck={false}
            />
            {importError ? <p className="canvas-demo-json-error">{importError}</p> : null}
        </div>
    );
};
