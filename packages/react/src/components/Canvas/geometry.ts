import { CanvasNode, ConnectionPointSide, ConnectorEndpoint, FlowDirection, Point } from "./types";
import { getPortForNode } from "./ports";

const SIDE_NORMALS: Record<ConnectionPointSide, Point> = {
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
};

/** Position of a node's connection point relative to the node's own origin (0,0 = top-left). */
export const getPortLocalPosition = (node: CanvasNode, pointId: string, flowDirection: FlowDirection = "vertical"): Point => {
    const port = getPortForNode(node, pointId, flowDirection);
    const offset = port?.offset ?? 0.5;
    const { width, height } = node;

    switch (port?.side) {
        case "top": return { x: width * offset, y: 0 };
        case "bottom": return { x: width * offset, y: height };
        case "left": return { x: 0, y: height * offset };
        case "right": return { x: width, y: height * offset };
        default: return { x: width / 2, y: height / 2 };
    }
};

/** Absolute canvas-space position of a node's connection point. */
export const getPortPosition = (node: CanvasNode, pointId: string, flowDirection: FlowDirection = "vertical"): Point => {
    const local = getPortLocalPosition(node, pointId, flowDirection);
    return { x: node.position.x + local.x, y: node.position.y + local.y };
};

export const resolveEndpoint = (nodes: CanvasNode[], endpoint: ConnectorEndpoint, flowDirection: FlowDirection = "vertical") => {
    const node = nodes.find((n) => n.id === endpoint.nodeId);
    if (!node) return null;
    return {
        node,
        point: getPortForNode(node, endpoint.pointId, flowDirection),
        position: getPortPosition(node, endpoint.pointId, flowDirection),
    };
};

/** A smooth cubic-bezier path between two ports, curving away from each port's side. */
export const buildConnectorPath = (
    from: Point, fromSide: ConnectionPointSide | undefined,
    to: Point, toSide: ConnectionPointSide | undefined,
): string => {
    const distance = Math.max(40, Math.hypot(to.x - from.x, to.y - from.y) * 0.5);
    const n1 = SIDE_NORMALS[fromSide ?? "bottom"];
    const n2 = SIDE_NORMALS[toSide ?? "top"];
    const c1 = { x: from.x + n1.x * distance, y: from.y + n1.y * distance };
    const c2 = { x: to.x + n2.x * distance, y: to.y + n2.y * distance };
    return `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;
};
