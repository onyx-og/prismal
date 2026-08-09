import { ConnectionPoint, NodeShape } from "./types";

/**
 * Fixed connection points per node shape. Ports are not configurable per-instance —
 * every node of a given shape exposes the same set, matching how the shapes are drawn.
 */
export const DEFAULT_PORTS: Record<NodeShape, ConnectionPoint[]> = {
    circle: [
        { id: "top", side: "top" },
        { id: "right", side: "right" },
        { id: "bottom", side: "bottom" },
        { id: "left", side: "left" },
    ],
    rectangle: [
        { id: "top", side: "top" },
        { id: "right", side: "right" },
        { id: "bottom", side: "bottom" },
        { id: "left", side: "left" },
    ],
    control: [
        { id: "in", side: "top" },
        { id: "true", side: "right", label: "Yes" },
        { id: "false", side: "bottom", label: "No" },
    ],
    union: [
        { id: "in-a", side: "left", offset: 0.3 },
        { id: "in-b", side: "left", offset: 0.7 },
        { id: "out", side: "right" },
    ],
    loop: [
        { id: "in", side: "top" },
        { id: "out", side: "bottom" },
        { id: "loop-back", side: "left", label: "repeat" },
    ],
    end: [
        { id: "in", side: "top" },
    ],
};

export const getNodePorts = (shape: NodeShape): ConnectionPoint[] => DEFAULT_PORTS[shape];

export const getPort = (shape: NodeShape, pointId: string): ConnectionPoint | undefined =>
    DEFAULT_PORTS[shape].find((p) => p.id === pointId);
