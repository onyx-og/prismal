export type NodeId = string;
export type ConnectorId = string;

export interface Point {
    x: number;
    y: number;
}

export type ConnectionPointSide = "top" | "right" | "bottom" | "left";

/** A fixed connection point rendered on a node's boundary. */
export interface ConnectionPoint {
    id: string;
    side: ConnectionPointSide;
    /** Position along the side, 0-1 (0 = start/left/top corner, 1 = end/right/bottom corner). Defaults to 0.5 (centered). */
    offset?: number;
    /** Optional label rendered next to the point, e.g. "Yes" / "No" on a Control node. */
    label?: string;
}

export type NodeShape = "circle" | "rectangle" | "control" | "union" | "loop" | "end";

/**
 * @typedef {object} BaseNode
 * @description Fields shared by every node shape.
 */
export interface BaseNode<TData = unknown> {
    id: NodeId;
    name: string;
    position: Point;
    /** Arbitrary consumer-defined payload carried by the node. */
    data: TData;
    isDragging?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    isSelected?: boolean;
    /** Whether this node's connection points are shown and usable. */
    connectable?: boolean;
    deletable?: boolean;
    width: number;
    height: number;
    zIndex?: number;
}

export interface CircleNode<TData = unknown> extends BaseNode<TData> {
    shape: "circle";
}

export type RectangleVariant = "sharp" | "rounded" | "pill";

export interface RectangleNode<TData = unknown> extends BaseNode<TData> {
    shape: "rectangle";
    variant?: RectangleVariant;
    /** Overrides the corner radius implied by `variant`, in px. */
    borderRadius?: number;
}

/** A branching / decision node, e.g. an "if" — one input, two outputs. */
export interface ControlNode<TData = unknown> extends BaseNode<TData> {
    shape: "control";
    /** Labels for the two outputs, in [truthy, falsy] order. Defaults to ["Yes", "No"]. */
    branches?: [string, string];
}

/** A converge node — multiple inputs, one output. */
export interface UnionNode<TData = unknown> extends BaseNode<TData> {
    shape: "union";
    /** Number of labeled input ports to render. Defaults to 2. */
    inputs?: number;
}

export type LoopMode = "do-while" | "foreach";

export interface LoopNode<TData = unknown> extends BaseNode<TData> {
    shape: "loop";
    mode: LoopMode;
}

/** A terminal node — one input, no outputs. */
export interface EndNode<TData = unknown> extends BaseNode<TData> {
    shape: "end";
}

export type CanvasNode<TData = unknown> =
    | CircleNode<TData>
    | RectangleNode<TData>
    | ControlNode<TData>
    | UnionNode<TData>
    | LoopNode<TData>
    | EndNode<TData>;

export interface ConnectorEndpoint {
    nodeId: NodeId;
    /** Id of a `ConnectionPoint` on that node (see `DEFAULT_PORTS`). */
    pointId: string;
}

/**
 * @typedef {object} Connector
 * @description An edge between two (or more) nodes. `destinationPoints` accepts either a single
 * endpoint or an array, so one source can branch into multiple destinations.
 */
export interface Connector {
    id: ConnectorId;
    sourcePoint: ConnectorEndpoint;
    destinationPoints: ConnectorEndpoint | ConnectorEndpoint[];
    label?: string;
    selectable?: boolean;
    isSelected?: boolean;
    deletable?: boolean;
}

export const isBranchingConnector = (connector: Connector): boolean =>
    Array.isArray(connector.destinationPoints) && connector.destinationPoints.length > 1;

export const destinationList = (connector: Connector): ConnectorEndpoint[] =>
    Array.isArray(connector.destinationPoints) ? connector.destinationPoints : [connector.destinationPoints];
