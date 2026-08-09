import { RefObject, useEffect, useRef } from "react";
import { CanvasNode, Connector, NodeId, destinationList } from "./types";

export interface AutoLayoutOptions {
    /** Axis the graph flows along. Perpendicular siblings are centered on the cross axis. Defaults to "vertical". */
    direction?: "vertical" | "horizontal";
    /** Minimum gap between sibling nodes on the cross axis, in px. */
    nodeSpacing?: number;
    /** Minimum gap between layers along the flow axis, in px — layers spread further apart on a larger canvas. */
    layerSpacing?: number;
    /** Outer margin kept clear around the canvas edges, in px. */
    padding?: number;
}

const DEFAULT_OPTIONS: Required<AutoLayoutOptions> = {
    direction: "vertical",
    nodeSpacing: 48,
    layerSpacing: 120,
    padding: 40,
};

/** Depth of each node, following connectors forward from the roots (nodes with no incoming edge). */
const computeLayers = (nodes: CanvasNode[], connectors: Connector[]): Map<NodeId, number> => {
    const outgoing = new Map<NodeId, NodeId[]>();
    const indegree = new Map<NodeId, number>();
    nodes.forEach((node) => {
        outgoing.set(node.id, []);
        indegree.set(node.id, 0);
    });

    connectors.forEach((connector) => {
        if (!outgoing.has(connector.sourcePoint.nodeId)) return;
        destinationList(connector).forEach((destination) => {
            if (!indegree.has(destination.nodeId)) return;
            outgoing.get(connector.sourcePoint.nodeId)!.push(destination.nodeId);
            indegree.set(destination.nodeId, (indegree.get(destination.nodeId) ?? 0) + 1);
        });
    });

    const layer = new Map<NodeId, number>();
    const queue: NodeId[] = [];
    nodes.forEach((node) => {
        if ((indegree.get(node.id) ?? 0) === 0) {
            layer.set(node.id, 0);
            queue.push(node.id);
        }
    });
    // Nodes only reachable through a cycle (e.g. a loop's back-edge) never hit indegree 0 —
    // seed them at layer 0 so they still get placed instead of being dropped from the layout.
    nodes.forEach((node) => {
        if (!layer.has(node.id)) layer.set(node.id, 0);
    });

    // Bounded relaxation: a cyclic graph could otherwise push nodes back and forth forever.
    let guard = 0;
    const maxIterations = nodes.length * nodes.length + nodes.length;
    while (queue.length && guard < maxIterations) {
        guard++;
        const id = queue.shift()!;
        const currentLayer = layer.get(id) ?? 0;
        for (const nextId of outgoing.get(id) ?? []) {
            const proposed = currentLayer + 1;
            if (proposed > (layer.get(nextId) ?? 0)) {
                layer.set(nextId, proposed);
                queue.push(nextId);
            }
        }
    }

    return layer;
};

/**
 * @function autoLayoutNodes
 * @description Arranges nodes into layers that follow their connectors (roots first), spreading
 * layers to fill the given canvas size and centering each layer's siblings on the cross axis.
 * Pure function — pass the container's current size to get a layout that fits it.
 */
export const autoLayoutNodes = <TData,>(
    nodes: CanvasNode<TData>[],
    connectors: Connector[],
    size: { width: number; height: number },
    options: AutoLayoutOptions = {},
): CanvasNode<TData>[] => {
    if (nodes.length === 0 || size.width <= 0 || size.height <= 0) return nodes;
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const vertical = opts.direction === "vertical";
    const layers = computeLayers(nodes, connectors);

    const byLayer = new Map<number, CanvasNode<TData>[]>();
    nodes.forEach((node) => {
        const l = layers.get(node.id) ?? 0;
        if (!byLayer.has(l)) byLayer.set(l, []);
        byLayer.get(l)!.push(node);
    });
    const layerIndexes = [...byLayer.keys()].sort((a, b) => a - b);

    const mainExtent = vertical ? size.height : size.width;
    const availableMain = Math.max(0, mainExtent - opts.padding * 2);
    const fitGap = layerIndexes.length > 1 ? availableMain / (layerIndexes.length - 1) : 0;
    const layerGap = Math.max(opts.layerSpacing, fitGap);

    const crossExtent = vertical ? size.width : size.height;

    return nodes.map((node) => {
        const l = layers.get(node.id) ?? 0;
        const siblings = byLayer.get(l)!;
        const indexInLayer = siblings.indexOf(node);
        const crossSizes = siblings.map((s) => (vertical ? s.width : s.height));
        const totalCross = crossSizes.reduce((sum, s) => sum + s, 0) + opts.nodeSpacing * (siblings.length - 1);

        let crossStart = Math.max(opts.padding, (crossExtent - totalCross) / 2);
        for (let i = 0; i < indexInLayer; i++) crossStart += crossSizes[i] + opts.nodeSpacing;

        const mainPosition = opts.padding + layerIndexes.indexOf(l) * layerGap;
        const position = vertical
            ? { x: crossStart, y: mainPosition }
            : { x: mainPosition, y: crossStart };

        return { ...node, position };
    });
};

export interface UseAutoLayoutOptions extends AutoLayoutOptions {
    /** Set false to disable without unmounting the hook. Defaults to true. */
    enabled?: boolean;
}

/**
 * @function useAutoLayout
 * @description Keeps a node graph auto-arranged and responsive: it re-runs `autoLayoutNodes`
 * whenever the container resizes or the graph's structure changes (nodes/connectors added or
 * removed), but not on every position tweak from a manual drag — so it doesn't fight the user.
 */
export const useAutoLayout = <TData,>(
    containerRef: RefObject<Element | null>,
    nodes: CanvasNode<TData>[],
    connectors: Connector[],
    onNodesChange: (nodes: CanvasNode<TData>[]) => void,
    options: UseAutoLayoutOptions = {},
): void => {
    const { enabled = true, ...layoutOptions } = options;

    const structureSignature = [
        nodes.map((n) => `${n.id}:${n.shape}:${n.width}x${n.height}`).join(","),
        connectors
            .map((c) => `${c.sourcePoint.nodeId}.${c.sourcePoint.pointId}>${destinationList(c).map((d) => `${d.nodeId}.${d.pointId}`).join("|")}`)
            .join(","),
    ].join("#");

    const latestNodes = useRef(nodes);
    latestNodes.current = nodes;
    const latestConnectors = useRef(connectors);
    latestConnectors.current = connectors;
    const latestOnNodesChange = useRef(onNodesChange);
    latestOnNodesChange.current = onNodesChange;

    useEffect(() => {
        if (!enabled) return;
        const container = containerRef.current;
        if (!container) return;

        const runLayout = () => {
            const rect = container.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            latestOnNodesChange.current(
                autoLayoutNodes(latestNodes.current, latestConnectors.current, { width: rect.width, height: rect.height }, layoutOptions),
            );
        };

        runLayout();

        const observer = new ResizeObserver(runLayout);
        observer.observe(container);
        return () => observer.disconnect();
        // Re-run only when enabled toggles, the container changes, or the graph's structure changes —
        // `layoutOptions` is intentionally left out, its values are read fresh via closure on every run.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, containerRef, structureSignature]);
};
