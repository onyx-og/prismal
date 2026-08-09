import { CanvasNode, ConnectionPoint, ConnectionPointSide, FlowDirection, NodeShape, ShapeRotation } from "./types";

/**
 * Ports for shapes that don't rotate — every side is already available, so there's no "which side
 * is input" question for Canvas to answer automatically.
 */
const STATIC_PORTS: Record<"circle" | "rectangle", ConnectionPoint[]> = {
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
};

type RotatableShape = "control" | "union" | "loop" | "end";

/** Each rotation-aware shape's ports as authored, i.e. at `rotation: 0`. */
const BASE_PORTS: Record<RotatableShape, ConnectionPoint[]> = {
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

/**
 * Which `rotation` makes each shape's ports match "vertical" (top-to-bottom) vs. "horizontal"
 * (left-to-right) flow — used to pick a default automatically when a node doesn't set its own
 * `rotation`. Each shape's `rotation: 0` is whatever orientation it happened to be authored in
 * (control/loop/end: vertical; union: horizontal), so the two flow directions land on different
 * rotation values per shape — this table is where that mapping is recorded.
 */
const FLOW_ROTATION: Record<RotatableShape, Record<FlowDirection, ShapeRotation>> = {
    control: { vertical: 0, horizontal: 270 },
    union: { vertical: 90, horizontal: 0 },
    loop: { vertical: 0, horizontal: 270 },
    end: { vertical: 0, horizontal: 270 },
};

const CLOCKWISE_SIDES: ConnectionPointSide[] = ["top", "right", "bottom", "left"];

/** Rotates a single side clockwise by `rotation` degrees — exported for shapes (e.g. Loop's repeat glyph) that need to move a visual detail in step with a rotated port. */
export const rotateSide = (side: ConnectionPointSide, rotation: ShapeRotation): ConnectionPointSide => {
    const steps = rotation / 90;
    return CLOCKWISE_SIDES[(CLOCKWISE_SIDES.indexOf(side) + steps) % 4];
};

const rotatePorts = (ports: ConnectionPoint[], rotation: ShapeRotation): ConnectionPoint[] =>
    rotation === 0 ? ports : ports.map((port) => ({ ...port, side: rotateSide(port.side, rotation) }));

const isRotatable = (shape: NodeShape): shape is RotatableShape => shape in BASE_PORTS;

export const getNodePorts = (shape: NodeShape, rotation: ShapeRotation = 0): ConnectionPoint[] =>
    isRotatable(shape) ? rotatePorts(BASE_PORTS[shape], rotation) : STATIC_PORTS[shape as "circle" | "rectangle"];

export const getPort = (shape: NodeShape, pointId: string, rotation: ShapeRotation = 0): ConnectionPoint | undefined =>
    getNodePorts(shape, rotation).find((p) => p.id === pointId);

/** Every shape's ports at `rotation: 0` — for introspection; prefer `getPortsForNode` for an actual node. */
export const DEFAULT_PORTS: Record<NodeShape, ConnectionPoint[]> = {
    ...STATIC_PORTS,
    ...BASE_PORTS,
};

/**
 * A node's effective rotation: its own `rotation` if set, otherwise the default for `flowDirection`
 * (Canvas's `orientation`, translated to "vertical"/"horizontal") — `0` for shapes that don't rotate.
 */
export const getNodeRotation = (
    node: { shape: NodeShape; rotation?: ShapeRotation },
    flowDirection: FlowDirection = "vertical",
): ShapeRotation => {
    if (node.rotation !== undefined) return node.rotation;
    return isRotatable(node.shape) ? FLOW_ROTATION[node.shape][flowDirection] : 0;
};

/** Convenience over `getNodePorts` for callers that already have the full node. */
export const getPortsForNode = (node: CanvasNode, flowDirection: FlowDirection = "vertical"): ConnectionPoint[] =>
    getNodePorts(node.shape, getNodeRotation(node, flowDirection));

/** Convenience over `getPort` for callers that already have the full node. */
export const getPortForNode = (node: CanvasNode, pointId: string, flowDirection: FlowDirection = "vertical"): ConnectionPoint | undefined =>
    getPortsForNode(node, flowDirection).find((p) => p.id === pointId);
