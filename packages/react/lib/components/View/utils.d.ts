/**
 * @module components/View/utils
 * @description Types and helpers shared by View and ViewItem.
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
/** Ordered smallest -> largest. Order matters: the CSS var fallback chain mirrors it. */
export declare const BREAKPOINTS: Breakpoint[];
/**
 * A value that may be given flat, or per breakpoint.
 * Mirrors the `span` / `ratio` / `hide` convention already used by Container.
 */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;
/**
 * A track size.
 * - `number` -> multiple of the View's base unit (`unit` prop, default `1rem`)
 * - `string` -> any raw CSS track size: `"1fr"`, `"120px"`, `"minmax(0, 1fr)"`, `"10%"`
 */
export type ViewSize = number | string;
/** Size of a single cell in the matrix: one value = square, tuple = [width, height]. */
export type ViewCellSize = ViewSize | [ViewSize, ViewSize];
/** `matrix[row][col]`. Ragged rows are allowed; missing cells are treated as `auto`. */
export type ViewMatrix = ViewCellSize[][];
/** Spreadsheet-style hook, e.g. `"A2"` = column A, row 2. 1-based, like a spreadsheet. */
export type ViewAddress = string;
export interface ViewCoords {
    /** 1-based grid column line. */
    col: number;
    /** 1-based grid row line. */
    row: number;
}
/**
 * @function parseAddress
 * @description Converts a spreadsheet-style hook into 1-based grid line numbers.
 * Columns are bijective base-26: A=1 ... Z=26, AA=27, AB=28.
 * @param {ViewAddress} address The hook, e.g. `"A2"` or `"AB12"`.
 * @returns {ViewCoords | null} The coordinates, or null if the address is malformed.
 * @example
 * parseAddress("A2")  // { col: 1, row: 2 }
 * parseAddress("AA1") // { col: 27, row: 1 }
 */
export declare const parseAddress: (address: ViewAddress) => ViewCoords | null;
/**
 * @function formatAddress
 * @description Inverse of parseAddress. Useful for editor UIs that place by drag.
 * @param {number} col 1-based column.
 * @param {number} row 1-based row.
 * @returns {ViewAddress}
 */
export declare const formatAddress: (col: number, row: number) => ViewAddress;
/**
 * @function isResponsiveMap
 * @description Type guard distinguishing a per-breakpoint map from a flat value.
 */
export declare const isResponsiveMap: <T>(value: Responsive<T>) => value is Partial<Record<Breakpoint, T>>;
/**
 * @function toBreakpointMap
 * @description Normalizes any Responsive<T> into a partial breakpoint map.
 * A flat value is treated as the `xs` (base) value.
 */
export declare const toBreakpointMap: <T>(value: Responsive<T> | undefined) => Partial<Record<Breakpoint, T>>;
/**
 * Where an item sits inside the grid area it was given.
 * Only meaningful when the item is smaller than its area — which is the normal
 * case for a layered overlay that spans wide but hugs one edge.
 */
export type ViewAlign = "start" | "center" | "end" | "stretch";
/**
 * A nudge applied after placement, in the item's own space.
 * - `ViewSize` -> same nudge on both axes
 * - `{ x, y }` -> per-axis
 *
 * Applied as a `translate`, so it never disturbs track sizing or the placement
 * of anything else — which is what you want for an element deliberately
 * straddling an edge.
 */
export type ViewOffset = ViewSize | {
    x?: ViewSize;
    y?: ViewSize;
};
/**
 * @function toLength
 * @description Renders a ViewSize as a CSS length. Same unit rule as track sizes:
 * numbers multiply the View's base unit.
 */
export declare const toLength: (size: ViewSize | undefined) => string;
/**
 * @function resolveOffset
 * @description Normalizes a ViewOffset into an `x y` pair for the `translate` property.
 * @returns {string | null} Null when the offset is a no-op.
 */
export declare const resolveOffset: (offset: ViewOffset | undefined) => string | null;
/**
 * What happens to an item whose address falls outside the grid at a given breakpoint.
 * Only ever applied when the breakpoint's grid is *narrower* than the one the address
 * was authored against — a layout that still fits is never touched.
 *
 * - `"none"`      -> leave it. Grid creates implicit columns and the View overflows.
 * - `"clamp"`     -> slide left until it fits, keeping its row. Preserves vertical rhythm.
 * - `"wrap"`      -> renumber cells linearly and re-derive the address. Preserves
 *                    reading order, at the cost of the original composition.
 * - `"transpose"` -> swap column and row, then clamp. For layouts that read wide on
 *                    desktop and tall on mobile.
 * - `"stack"`     -> abandon the address entirely; auto-place at full width.
 */
export type ViewReflow = "none" | "clamp" | "wrap" | "transpose" | "stack";
/**
 * Default column ladder used by `autoScale`, as a fraction of the base column count.
 * Chosen so a 12-column base lands on 4 / 6 / 8 / 12 / 12 — the degradation an author
 * of a 12-column layout already has in their head.
 */
export declare const DEFAULT_COLUMN_SCALE: Record<Breakpoint, number>;
/**
 * @function deriveColumnCounts
 * @description Builds a per-breakpoint column count from a single base count.
 * @param {number} base The authored column count — the width addresses are written against.
 * @param {object} [scale] Overrides for some or all breakpoints, as fractions of base.
 * @returns {object} A count for every breakpoint, never below 1.
 * @example
 * deriveColumnCounts(12)                 // { xs: 4, sm: 6, md: 8, lg: 12, xl: 12 }
 * deriveColumnCounts(12, { xs: 0.25 })   // { xs: 3, sm: 6, md: 8, lg: 12, xl: 12 }
 */
export declare const deriveColumnCounts: (base: number, scale?: Partial<Record<Breakpoint, number>>) => Record<Breakpoint, number>;
export interface CascadeHit<T> {
    value: T;
    /** The breakpoint the value was actually declared at. */
    source: Breakpoint;
}
/**
 * @function resolveCascade
 * @description Resolves a breakpoint map the way the stylesheet does — nearest declared
 * value at or below the requested breakpoint.
 *
 * The `source` is the point of this function. It tells us whether a value was *authored*
 * for this breakpoint or merely *inherited* into it, and only inherited addresses get
 * reflowed: if you wrote `at={{ xs: "A3", lg: "F1" }}` you meant both, and neither should
 * be second-guessed.
 */
export declare const resolveCascade: <T>(map: Partial<Record<Breakpoint, T>>, bp: Breakpoint) => CascadeHit<T> | null;
export interface ViewPlacement {
    /** 1-based grid column line, or 0 meaning "let the grid auto-place this". */
    col: number;
    /** 1-based grid row line. Ignored when col is 0. */
    row: number;
    /** Span in columns. */
    span: number;
}
/**
 * @function applyReflow
 * @description Rescues a placement whose column no longer exists at the target width.
 *
 * @param {ViewPlacement} placement The authored placement.
 * @param {number} base Column count the address was authored against.
 * @param {number} target Column count at the breakpoint being resolved.
 * @param {ViewReflow} mode The policy.
 * @returns {ViewPlacement} The rescued placement. `col: 0` means auto-place.
 *
 * @example
 * // "F1" (col 6) in a grid that is 4 wide at xs
 * applyReflow({ col: 6, row: 1, span: 1 }, 12, 4, "clamp") // { col: 4, row: 1, span: 1 }
 * applyReflow({ col: 6, row: 1, span: 1 }, 12, 4, "wrap")  // { col: 2, row: 2, span: 1 }
 */
export declare const applyReflow: (placement: ViewPlacement, base: number, target: number, mode: ViewReflow) => ViewPlacement;
/**
 * @function isFlatResponsive
 * @description True when a value was given flat rather than per breakpoint.
 *
 * This distinction is load-bearing for reflow. `toBreakpointMap` files a flat value
 * under `xs` because that is how the CSS min-width cascade propagates it upward — but
 * semantically a flat `at="F1"` is not "F1 on mobile", it is "F1 in the layout I
 * designed", i.e. at the base width. Treating it as authored-for-xs would exempt it
 * from reflow at exactly the breakpoints that need it most.
 */
export declare const isFlatResponsive: <T>(value: Responsive<T> | undefined) => boolean;
/**
 * @function toTrackSize
 * @description Renders a ViewSize as a CSS track size.
 * Numbers are multiplied by the View's base unit so a grid can be described
 * in abstract cells ("3 units wide") rather than pixels.
 */
export declare const toTrackSize: (size: ViewSize | undefined) => string;
/**
 * @function largestTrack
 * @description Collapses several candidate sizes into one track size.
 *
 * CSS Grid sizes *tracks*, not individual cells, so a per-cell matrix cannot be
 * honoured literally: a column is as wide as its widest cell. This resolves that.
 * - all numeric -> arithmetic max
 * - otherwise   -> CSS `max()`, which resolves at layout time across mixed units
 * - `fr` values -> excluded from `max()` (invalid there); the largest `fr` wins outright,
 *   since a flexible track always absorbs at least its fixed siblings' space
 */
export declare const largestTrack: (sizes: (ViewSize | undefined)[]) => string;
export interface ResolvedTracks {
    columns: string;
    rows: string;
    columnCount: number;
    rowCount: number;
}
export interface TrackInput {
    columns?: number;
    rows?: number;
    cellWidth?: ViewSize;
    cellHeight?: ViewSize;
    matrix?: ViewMatrix;
}
/**
 * @function resolveTracks
 * @description Builds `grid-template-columns` / `grid-template-rows` for one breakpoint.
 *
 * Precedence: `matrix` describes the grid outright; `columns`/`rows` +
 * `cellWidth`/`cellHeight` describe a uniform grid. A matrix may still be
 * padded out to a larger `columns`/`rows` count using the uniform cell size.
 *
 * @param {TrackInput} input Resolved (non-responsive) values for one breakpoint.
 * @returns {ResolvedTracks | null} Null when there is nothing to declare at this breakpoint.
 */
export declare const resolveTracks: (input: TrackInput) => ResolvedTracks | null;
