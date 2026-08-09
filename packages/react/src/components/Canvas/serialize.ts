import { CanvasNode, Connector } from "./types";

const CANVAS_DOCUMENT_VERSION = 1;

export interface CanvasDocument<TData = unknown> {
    version: number;
    nodes: CanvasNode<TData>[];
    connectors: Connector[];
}

export class CanvasImportError extends Error {}

/** Serializes a diagram's nodes and connectors to a JSON string. */
export const exportCanvasToJSON = <TData,>(
    nodes: CanvasNode<TData>[],
    connectors: Connector[],
    pretty = true,
): string => {
    const document: CanvasDocument<TData> = { version: CANVAS_DOCUMENT_VERSION, nodes, connectors };
    return JSON.stringify(document, null, pretty ? 2 : undefined);
};

/** Parses and shape-checks a JSON string produced by `exportCanvasToJSON` (or hand-authored in the same shape). */
export const importCanvasFromJSON = <TData = unknown,>(json: string): CanvasDocument<TData> => {
    let parsed: unknown;
    try {
        parsed = JSON.parse(json);
    } catch (error) {
        throw new CanvasImportError(`Canvas JSON is not valid JSON: ${(error as Error).message}`);
    }

    if (
        !parsed || typeof parsed !== "object"
        || !Array.isArray((parsed as { nodes?: unknown }).nodes)
        || !Array.isArray((parsed as { connectors?: unknown }).connectors)
    ) {
        throw new CanvasImportError("Canvas JSON must be an object with `nodes` and `connectors` arrays.");
    }

    const document = parsed as CanvasDocument<TData>;
    document.nodes.forEach((node, i) => {
        if (!node.id || !node.shape || !node.position) {
            throw new CanvasImportError(`Node at index ${i} is missing a required field (id, shape, or position).`);
        }
    });
    document.connectors.forEach((connector, i) => {
        if (!connector.id || !connector.sourcePoint || !connector.destinationPoints) {
            throw new CanvasImportError(`Connector at index ${i} is missing a required field (id, sourcePoint, or destinationPoints).`);
        }
    });

    return { version: document.version ?? CANVAS_DOCUMENT_VERSION, nodes: document.nodes, connectors: document.connectors };
};

/** Triggers a browser download of the diagram as a `.json` file. Browser-only (uses `document`/`URL.createObjectURL`). */
export const downloadCanvasJSON = (
    nodes: CanvasNode[],
    connectors: Connector[],
    filename = "canvas.json",
): void => {
    const blob = new Blob([exportCanvasToJSON(nodes, connectors)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};
