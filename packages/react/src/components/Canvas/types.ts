import { ReactNode } from "react";

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

/** The direction a diagram (or a single node's ports) flows in — see `CanvasOrientation`. */
export type FlowDirection = "vertical" | "horizontal";

/**
 * Degrees clockwise a shape's ports (and, for "union", its funnel) are rotated from that shape's
 * own authored default. Each rotation-aware shape picks its own meaning for "0" — whichever
 * orientation it was originally drawn in — so this is shape-relative, not a global compass value.
 */
export type ShapeRotation = 0 | 90 | 180 | 270;

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
    /**
     * Rotates the `in`/`true`/`false` ports from their default (`in` top, `true` right, `false`
     * bottom). Left unset, Canvas picks this automatically from its `orientation` — set it only to
     * override that per-node.
     */
    rotation?: ShapeRotation;
}

/** A converge node — multiple inputs, one output. */
export interface UnionNode<TData = unknown> extends BaseNode<TData> {
    shape: "union";
    /** Number of labeled input ports to render. Defaults to 2. */
    inputs?: number;
    /**
     * Rotates the funnel and its `in-a`/`in-b`/`out` ports together from their default (narrows
     * left→right). Left unset, Canvas picks this automatically from its `orientation` — set it only
     * to override that per-node.
     */
    rotation?: ShapeRotation;
}

export type LoopMode = "do-while" | "foreach";

export interface LoopNode<TData = unknown> extends BaseNode<TData> {
    shape: "loop";
    mode: LoopMode;
    /**
     * Rotates the `in`/`out`/`loop-back` ports from their default (`in` top, `out` bottom,
     * `loop-back` left). Left unset, Canvas picks this automatically from its `orientation` — set it
     * only to override that per-node.
     */
    rotation?: ShapeRotation;
}

/** A terminal node — one input, no outputs. */
export interface EndNode<TData = unknown> extends BaseNode<TData> {
    shape: "end";
    /**
     * Rotates the `in` port from its default (top). Left unset, Canvas picks this automatically from
     * its `orientation` — set it only to override that per-node.
     */
    rotation?: ShapeRotation;
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

/**
 * @typedef {object} PaletteEntry
 * @description One button in `NodePalette` — the floating "add node" panel Canvas renders in edit
 * mode. `Canvas`'s `paletteEntries` prop takes the full list to render (defaulting to
 * `defaultPaletteEntries`), so disabling a built-in shape or injecting a custom one is plain array
 * composition (filter / concat) rather than a separate prop for each.
 */
export interface PaletteEntry<TData = unknown> {
    /** Stable identity for the entry — what you filter on to disable a built-in one. */
    id: string;
    label: string;
    icon?: ReactNode;
    /** Builds the new node when this entry is clicked. `position` is a reasonable content-space landing spot (roughly the visible canvas center); it becomes the node's `position` as-is. */
    createNode: (position: Point) => CanvasNode<TData>;
}

export const isBranchingConnector = (connector: Connector): boolean =>
    Array.isArray(connector.destinationPoints) && connector.destinationPoints.length > 1;

export const destinationList = (connector: Connector): ConnectorEndpoint[] =>
    Array.isArray(connector.destinationPoints) ? connector.destinationPoints : [connector.destinationPoints];
