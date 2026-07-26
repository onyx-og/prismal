/**
 * @module components/View/utils
 * @description Types and helpers shared by View and ViewItem.
 */

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

/** Ordered smallest -> largest. Order matters: the CSS var fallback chain mirrors it. */
export const BREAKPOINTS: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

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

const ADDRESS_RE = /^\s*([A-Za-z]+)\s*(\d+)\s*$/;

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
export const parseAddress = (address: ViewAddress): ViewCoords | null => {
    const match = ADDRESS_RE.exec(address);
    if (!match) return null;

    const [, letters, digits] = match;

    let col = 0;
    for (const char of letters.toUpperCase()) {
        col = col * 26 + (char.charCodeAt(0) - 64);
    }

    const row = parseInt(digits, 10);
    if (col < 1 || row < 1) return null;

    return { col, row };
};

/**
 * @function formatAddress
 * @description Inverse of parseAddress. Useful for editor UIs that place by drag.
 * @param {number} col 1-based column.
 * @param {number} row 1-based row.
 * @returns {ViewAddress}
 */
export const formatAddress = (col: number, row: number): ViewAddress => {
    let n = col;
    let letters = "";
    while (n > 0) {
        const rem = (n - 1) % 26;
        letters = String.fromCharCode(65 + rem) + letters;
        n = Math.floor((n - 1) / 26);
    }
    return `${letters}${row}`;
};

/**
 * @function isResponsiveMap
 * @description Type guard distinguishing a per-breakpoint map from a flat value.
 */
export const isResponsiveMap = <T,>(
    value: Responsive<T>
): value is Partial<Record<Breakpoint, T>> => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
    return BREAKPOINTS.some((bp) => bp in (value as object));
};

/**
 * @function toBreakpointMap
 * @description Normalizes any Responsive<T> into a partial breakpoint map.
 * A flat value is treated as the `xs` (base) value.
 */
export const toBreakpointMap = <T,>(
    value: Responsive<T> | undefined
): Partial<Record<Breakpoint, T>> => {
    if (value === undefined) return {};
    if (isResponsiveMap(value)) return value;
    return { xs: value as T };
};

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
export type ViewOffset = ViewSize | { x?: ViewSize; y?: ViewSize };

/**
 * @function toLength
 * @description Renders a ViewSize as a CSS length. Same unit rule as track sizes:
 * numbers multiply the View's base unit.
 */
export const toLength = (size: ViewSize | undefined): string => {
    if (size === undefined) return "0px";
    if (typeof size === "number") return `calc(${size} * var(--prismal-view-unit))`;
    return size;
};

/**
 * @function resolveOffset
 * @description Normalizes a ViewOffset into an `x y` pair for the `translate` property.
 * @returns {string | null} Null when the offset is a no-op.
 */
export const resolveOffset = (offset: ViewOffset | undefined): string | null => {
    if (offset === undefined) return null;

    if (typeof offset === "object") {
        const { x, y } = offset;
        if (x === undefined && y === undefined) return null;
        return `${toLength(x)} ${toLength(y)}`;
    }

    const both = toLength(offset);
    return `${both} ${both}`;
};

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
export const DEFAULT_COLUMN_SCALE: Record<Breakpoint, number> = {
    xs: 1 / 3,
    sm: 1 / 2,
    md: 2 / 3,
    lg: 1,
    xl: 1
};

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
export const deriveColumnCounts = (
    base: number,
    scale?: Partial<Record<Breakpoint, number>>
): Record<Breakpoint, number> => {
    const factors = { ...DEFAULT_COLUMN_SCALE, ...(scale ?? {}) };
    const counts = {} as Record<Breakpoint, number>;
    BREAKPOINTS.forEach((bp) => {
        counts[bp] = Math.max(1, Math.round(base * factors[bp]));
    });
    return counts;
};

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
export const resolveCascade = <T,>(
    map: Partial<Record<Breakpoint, T>>,
    bp: Breakpoint
): CascadeHit<T> | null => {
    for (let i = BREAKPOINTS.indexOf(bp); i >= 0; i -= 1) {
        const candidate = BREAKPOINTS[i];
        const value = map[candidate];
        if (value !== undefined) return { value, source: candidate };
    }
    return null;
};

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
export const applyReflow = (
    placement: ViewPlacement,
    base: number,
    target: number,
    mode: ViewReflow
): ViewPlacement => {
    // A grid at least as wide as the one the address was written for needs no rescue,
    // whatever the mode. This is what keeps reflow from firing on desktop.
    if (mode === "none" || target < 1 || base < 1 || target >= base) return placement;

    if (mode === "stack") return { col: 0, row: 0, span: target };

    const span = Math.max(1, Math.min(placement.span, target));
    const { col, row } = placement;

    // `wrap` renumbers the whole grid, so every item is remapped whether or not it
    // individually still fits. Skipping the ones that fit would leave them on their
    // original rows while their neighbours moved down, and they would collide.
    if (mode === "wrap") {
        const index = (row - 1) * base + (col - 1);
        let nextRow = Math.floor(index / target) + 1;
        let nextCol = (index % target) + 1;
        // Never split an item across the fold; push it to the next row instead.
        if (nextCol + span - 1 > target) {
            nextRow += 1;
            nextCol = 1;
        }
        return { col: nextCol, row: nextRow, span };
    }

    // `clamp` and `transpose` are per-item rescues: an item that still fits is
    // already where its author put it, and moving it would be gratuitous.
    if (col + span - 1 <= target) return { col, row, span };

    if (mode === "transpose") {
        const swapped = { col: row, row: col, span };
        return swapped.col + span - 1 <= target
            ? swapped
            : { col: Math.max(1, target - span + 1), row: swapped.row, span };
    }

    // clamp
    return { col: Math.max(1, target - span + 1), row, span };
};

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
export const isFlatResponsive = <T,>(value: Responsive<T> | undefined): boolean =>
    value !== undefined && !isResponsiveMap(value);

/**
 * @function toTrackSize
 * @description Renders a ViewSize as a CSS track size.
 * Numbers are multiplied by the View's base unit so a grid can be described
 * in abstract cells ("3 units wide") rather than pixels.
 */
export const toTrackSize = (size: ViewSize | undefined): string => {
    if (size === undefined) return "auto";
    if (typeof size === "number") return `calc(${size} * var(--prismal-view-unit))`;
    return size;
};

/** Splits a cell entry into its width and height parts. */
const splitCell = (cell: ViewCellSize | undefined): [ViewSize | undefined, ViewSize | undefined] =>
    Array.isArray(cell) ? [cell[0], cell[1]] : [cell, cell];

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
export const largestTrack = (sizes: (ViewSize | undefined)[]): string => {
    const defined = sizes.filter((s): s is ViewSize => s !== undefined);
    if (defined.length === 0) return "auto";

    if (defined.every((s) => typeof s === "number")) {
        return toTrackSize(Math.max(...(defined as number[])));
    }

    const frs = defined.filter((s) => typeof s === "string" && /(^|\s)[\d.]+fr\s*$/.test(s)) as string[];
    if (frs.length > 0) {
        const widest = frs.reduce((a, b) => (parseFloat(a) >= parseFloat(b) ? a : b));
        return widest;
    }

    const rendered = Array.from(new Set(defined.map(toTrackSize)));
    return rendered.length === 1 ? rendered[0] : `max(${rendered.join(", ")})`;
};

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
export const resolveTracks = (input: TrackInput): ResolvedTracks | null => {
    const { columns, rows, cellWidth, cellHeight, matrix } = input;

    if (!matrix || matrix.length === 0) {
        if (!columns && !rows && cellWidth === undefined && cellHeight === undefined) return null;

        const columnCount = columns ?? 0;
        const rowCount = rows ?? 0;

        return {
            columns: columnCount
                ? `repeat(${columnCount}, ${toTrackSize(cellWidth)})`
                : "none",
            rows: rowCount ? `repeat(${rowCount}, ${toTrackSize(cellHeight)})` : "none",
            columnCount,
            rowCount
        };
    }

    const matrixCols = matrix.reduce((max, row) => Math.max(max, row.length), 0);
    const columnCount = Math.max(matrixCols, columns ?? 0);
    const rowCount = Math.max(matrix.length, rows ?? 0);

    const columnTracks: string[] = [];
    for (let c = 0; c < columnCount; c += 1) {
        const candidates = matrix.map((row) => splitCell(row[c])[0]);
        columnTracks.push(
            c < matrixCols ? largestTrack(candidates) : toTrackSize(cellWidth)
        );
    }

    const rowTracks: string[] = [];
    for (let r = 0; r < rowCount; r += 1) {
        const source = matrix[r];
        rowTracks.push(
            source ? largestTrack(source.map((cell) => splitCell(cell)[1])) : toTrackSize(cellHeight)
        );
    }

    return {
        columns: columnTracks.join(" "),
        rows: rowTracks.join(" "),
        columnCount,
        rowCount
    };
};
