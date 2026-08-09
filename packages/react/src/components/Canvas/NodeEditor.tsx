import { useEffect, useMemo, useState } from "react";
import Modal from "components/Modal";
import Tabs from "components/Tabs";
import Form from "components/Form";
import TextInput from "components/Form/TextInput";
import Select from "components/Form/Select";
import Button from "components/Button";
import { getRandId } from "utils/";
import { CanvasNode, Connector, ConnectorEndpoint, ConnectorId, destinationList } from "./types";
import { getNodePorts } from "./ports";

export interface NodeDataField {
    /** Key into the node's `data` object. */
    key: string;
    label?: string;
    /** Coerces the submitted string back to this type when merging into `data`. Defaults to "string". */
    valueType?: "string" | "number";
}

/** Infers editable fields from a node's `data` payload — flat string/number/boolean values only. */
const inferDataFields = (data: unknown): NodeDataField[] => {
    if (!data || typeof data !== "object") return [];
    return Object.entries(data as Record<string, unknown>)
        .filter(([, value]) => typeof value === "string" || typeof value === "number" || typeof value === "boolean")
        .map(([key, value]) => ({ key, valueType: typeof value === "number" ? "number" : "string" }));
};

export interface NodeEditorProps<TData = unknown> {
    node: CanvasNode<TData> | null;
    visible: boolean;
    /** Fields rendered as TextInputs on the "Data" tab. Inferred from `node.data`'s primitive fields when omitted. */
    dataFields?: NodeDataField[];
    onClose?: () => void;
    /** Called with the updated node whenever the Basic or Data tab is submitted. */
    onSubmit: (node: CanvasNode<TData>) => void;
    /**
     * All nodes in the graph, used to populate the "Connections" tab's target-node picker.
     * That tab only renders when `nodes`, `connectors`, `onAddConnector`, and `onRemoveConnector`
     * are all provided — omit any of them to keep NodeEditor to just Basic/Data.
     */
    nodes?: CanvasNode<TData>[];
    /** All connectors, used to list the ones touching this node on the "Connections" tab. */
    connectors?: Connector[];
    /** Called with a fully-formed connector when "Add connector" is submitted. */
    onAddConnector?: (connector: Connector) => void;
    onRemoveConnector?: (connectorId: ConnectorId) => void;
}

/**
 * @component NodeEditor
 * @description A standalone Modal editor for a single Canvas node — a "Basic" tab for its name, a
 * "Data" tab exposing its `data` payload as text fields, and (when wired up with `nodes`/
 * `connectors`/`onAddConnector`/`onRemoveConnector`) a "Connections" tab listing the connectors
 * touching this node with controls to add a new one or remove an existing one. Each tab acts
 * independently and the modal stays open after a submit, so any tab can still be edited. Exported
 * on its own so it's reusable outside Canvas (e.g. driven by an external selection list rather than
 * Canvas's built-in NodeInspector).
 * @example
 * <NodeEditor
 *   node={editingNode}
 *   visible={!!editingNode}
 *   nodes={nodes}
 *   connectors={connectors}
 *   onClose={() => setEditingNode(null)}
 *   onSubmit={(updated) => setNodes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))}
 *   onAddConnector={(c) => setConnectors((prev) => [...prev, c])}
 *   onRemoveConnector={(id) => setConnectors((prev) => prev.filter((c) => c.id !== id))}
 * />
 */
const NodeEditor = <TData,>(props: NodeEditorProps<TData>) => {
    const {
        node, visible, dataFields, onClose, onSubmit,
        nodes, connectors, onAddConnector, onRemoveConnector,
    } = props;

    const resolvedDataFields = useMemo(
        () => dataFields ?? inferDataFields(node?.data),
        [dataFields, node?.data],
    );

    const showConnections = !!(nodes && connectors && onAddConnector && onRemoveConnector);
    const otherNodes = useMemo(
        () => (node && nodes ? nodes.filter((n) => n.id !== node.id) : []),
        [nodes, node],
    );

    const [sourcePointId, setSourcePointId] = useState("");
    const [targetNodeId, setTargetNodeId] = useState("");
    const [targetPointId, setTargetPointId] = useState("");
    const [connectorLabel, setConnectorLabel] = useState("");

    // Reset the add-connector form whenever the node being edited changes underneath it.
    useEffect(() => {
        setSourcePointId(node ? getNodePorts(node.shape)[0]?.id ?? "" : "");
        setTargetNodeId("");
        setTargetPointId("");
        setConnectorLabel("");
    }, [node?.id]);

    if (!node) return null;

    const submitBasic = (formData: { [key: string]: any }) => {
        onSubmit({ ...node, name: formData.name ?? node.name });
    };

    const submitData = (formData: { [key: string]: any }) => {
        const nextData = { ...(node.data as object) } as Record<string, unknown>;
        resolvedDataFields.forEach((field) => {
            const raw = formData[field.key];
            if (raw === undefined) return;
            nextData[field.key] = field.valueType === "number" ? Number(raw) : raw;
        });
        onSubmit({ ...node, data: nextData as TData });
    };

    const sourcePorts = getNodePorts(node.shape);
    const targetNode = otherNodes.find((n) => n.id === targetNodeId);
    const targetPorts = targetNode ? getNodePorts(targetNode.shape) : [];

    const describeEndpoint = (endpoint: ConnectorEndpoint) => {
        const endpointNode = nodes?.find((n) => n.id === endpoint.nodeId);
        return `${endpointNode?.name ?? endpoint.nodeId} (${endpoint.pointId})`;
    };

    const touchingConnectors = showConnections
        ? connectors!.filter((c) => (
            c.sourcePoint.nodeId === node.id || destinationList(c).some((d) => d.nodeId === node.id)
        ))
        : [];

    const handleAddConnector = () => {
        if (!sourcePointId || !targetNodeId || !targetPointId) return;
        onAddConnector?.({
            id: getRandId(),
            sourcePoint: { nodeId: node.id, pointId: sourcePointId },
            destinationPoints: { nodeId: targetNodeId, pointId: targetPointId },
            ...(connectorLabel ? { label: connectorLabel } : {}),
        });
        setTargetNodeId("");
        setTargetPointId("");
        setConnectorLabel("");
    };

    const tabsData = [
        { name: "basic", label: "Basic" },
        { name: "data", label: "Data" },
        ...(showConnections ? [{ name: "connections", label: "Connections" }] : []),
    ];

    const connectionsContent = (
        <div className="prismal-canvas-connections-tab">
            <ul className="prismal-canvas-connector-list">
                {touchingConnectors.map((connector) => (
                    <li key={connector.id}>
                        <span>
                            {connector.sourcePoint.nodeId === node.id
                                ? `→ ${destinationList(connector).map(describeEndpoint).join(", ")}`
                                : `← ${describeEndpoint(connector.sourcePoint)}`}
                            {connector.label ? ` · ${connector.label}` : ""}
                        </span>
                        <Button
                            type="text" size="sm" iconName="close" title="Remove connector"
                            onClick={() => onRemoveConnector?.(connector.id)}
                        />
                    </li>
                ))}
                {touchingConnectors.length === 0 ? (
                    <li className="prismal-canvas-connector-list-empty">No connectors yet.</li>
                ) : null}
            </ul>
            <div className="prismal-canvas-connector-form">
                <Select
                    name="sourcePointId"
                    label="From this node's port"
                    options={sourcePorts.map((port) => ({
                        value: port.id,
                        element: port.label ? `${port.id} (${port.label})` : port.id,
                        selected: port.id === sourcePointId,
                    }))}
                    onChange={(value: string | string[]) => { if (typeof value === "string") setSourcePointId(value); }}
                />
                <Select
                    name="targetNodeId"
                    label="To node"
                    placeholder="Select a node.."
                    options={otherNodes.map((n) => ({ value: n.id, element: n.name, selected: n.id === targetNodeId }))}
                    onChange={(value: string | string[]) => {
                        if (typeof value !== "string") return;
                        setTargetNodeId(value);
                        setTargetPointId("");
                    }}
                />
                {targetNode ? (
                    <Select
                        name="targetPointId"
                        label="Target port"
                        placeholder="Select a port.."
                        options={targetPorts.map((port) => ({
                            value: port.id,
                            element: port.label ? `${port.id} (${port.label})` : port.id,
                            selected: port.id === targetPointId,
                        }))}
                        onChange={(value: string | string[]) => { if (typeof value === "string") setTargetPointId(value); }}
                    />
                ) : null}
                <TextInput
                    name="connectorLabel" label="Label (optional)" value={connectorLabel}
                    onChange={(value) => setConnectorLabel(typeof value === "string" ? value : "")}
                />
                <Button type="primary" onClick={handleAddConnector} disabled={!targetNodeId || !targetPointId}>
                    Add connector
                </Button>
            </div>
        </div>
    );

    return (
        <Modal className="prismal-canvas-node-editor" title={`Edit "${node.name}"`} visible={visible} closeModal={onClose}>
            <Tabs
                data={tabsData}
                content={{
                    basic: (
                        <Form name="canvas-node-basic" onSubmit={submitBasic}>
                            <TextInput name="name" label="Name" value={node.name} required />
                        </Form>
                    ),
                    data: resolvedDataFields.length ? (
                        <Form name="canvas-node-data" onSubmit={submitData}>
                            {resolvedDataFields.map((field) => (
                                <TextInput
                                    key={field.key}
                                    name={field.key}
                                    label={field.label ?? field.key}
                                    value={String((node.data as Record<string, unknown> | undefined)?.[field.key] ?? "")}
                                />
                            ))}
                        </Form>
                    ) : <p className="prismal-canvas-node-editor-empty">This node has no editable data fields.</p>,
                    ...(showConnections ? { connections: connectionsContent } : {}),
                }}
            />
        </Modal>
    );
};

export default NodeEditor;
