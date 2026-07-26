import {
    ReactNode, ReactElement, FC, Children, isValidElement, CSSProperties,
    useMemo, useRef, useState, useEffect
} from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";
import "./index.scss";
import { ViewContext, ViewMetrics, ViewLayout, EMPTY_METRICS } from "./context";
import ViewItem, { VIEW_ITEM_MARKER, ViewItemProps } from "./ViewItem";
import {
    BREAKPOINTS, Breakpoint, Responsive, ViewSize, ViewMatrix, ViewReflow,
    deriveColumnCounts, isResponsiveMap, resolveCascade, resolveTracks,
    toBreakpointMap, toTrackSize
} from "./utils";

/**
 * @typedef {object} ViewProps
 * @description Props for the View component.
 * @property {ReactNode} [children] ViewItem children. Anything else is dropped.
 * @property {object | number} [columns] Column count. A flat number is the *base* count and
 * feeds `autoScale`; a per-breakpoint object defines each width explicitly instead.
 * @property {boolean | object} [autoScale] Derive per-breakpoint column counts from the base
 * count. `true` uses the default ladder; an object overrides some or all of its fractions.
 * @property {number} [baseColumns] The width addresses are authored against. Defaults to the
 * widest resolved column count. Reflow triggers at breakpoints narrower than this.
 * @property {string} [reflow="clamp"] What to do with items whose column no longer exists.
 * @property {object | number} [rows] Explicit row count. Extra rows are created implicitly.
 * @property {object | number | string} [cellWidth] Uniform column width.
 * @property {object | number | string} [cellHeight] Uniform row height.
 * @property {object | Array} [matrix] Per-cell sizes, `matrix[row][col]`.
 * @property {string} [unit="1rem"] Base unit that numeric sizes multiply.
 * @property {object | number | string} [gap=0] Gap between cells.
 * @property {boolean} [dense=false] Let unhooked items backfill gaps left by hooked ones.
 */
export interface ViewProps extends ComponentProps {
    children?: ReactNode;
    columns?: Responsive<number>;
    autoScale?: boolean | Partial<Record<Breakpoint, number>>;
    baseColumns?: number;
    reflow?: ViewReflow;
    rows?: Responsive<number>;
    cellWidth?: Responsive<ViewSize>;
    cellHeight?: Responsive<ViewSize>;
    matrix?: Responsive<ViewMatrix>;
    unit?: string;
    gap?: Responsive<ViewSize>;
    dense?: boolean;
}

/**
 * @function isViewItem
 * @description Identifies a ViewItem element. Uses a static marker rather than a
 * `child.type === ViewItem` identity check so the guard survives duplicated module
 * instances — two copies of @prismal/react in a WordPress build, or HMR in the editor.
 */
const isViewItem = (child: unknown): child is ReactElement<ViewItemProps> => {
    if (!isValidElement(child)) return false;
    const type = child.type as unknown as Record<string, unknown> | undefined;
    return Boolean(type && type[VIEW_ITEM_MARKER] === true);
};

/**
 * @component View
 * @description A grid container whose children are restricted to ViewItem. Cells are
 * described either uniformly (columns/rows plus cellWidth/cellHeight) or per-cell via a
 * matrix; items hook to a spreadsheet address and extend toward the bottom-right.
 * Items may claim overlapping areas — ordering is DOM order by default, or explicit
 * via each item's `layer` prop — so a View works as a layered canvas, not only a tiling.
 * @param {ViewProps} props The component props.
 * @returns {React.ReactElement} The rendered View component.
 * @example
 * // A card inset from the edges, with a control pinned over its bottom-right corner.
 * <View columns={12} rows={8} cellWidth="1fr" cellHeight="1fr">
 *   <ViewItem at="B2" width={10} height={6} layer={0}>
 *     <Card>Base layer</Card>
 *   </ViewItem>
 *   <ViewItem at="J6" width={3} height={2} layer={1}
 *             justify="end" align="end" offset={{ x: 1, y: 1 }}>
 *     <Button>Straddles the edge</Button>
 *   </ViewItem>
 * </View>
 */
const View: FC<ViewProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        children,
        columns, autoScale, baseColumns, reflow = "clamp",
        rows, cellWidth, cellHeight, matrix,
        unit = "1rem",
        gap = 0,
        dense = false
    } = props;

    const gridRef = useRef<HTMLDivElement>(null);
    const [metrics, setMetrics] = useState<ViewMetrics>(EMPTY_METRICS);

    /**
     * @member layout
     * @description The resolved grid shape. Three ways to arrive at a column count, in
     * precedence order: a matrix declares it outright, an explicit per-breakpoint
     * `columns` object declares it, or `autoScale` derives the whole ladder from one
     * base number. The result is authoritative for both track building and reflow —
     * items must reflow against the same counts the tracks were built from, so this is
     * computed once and shared rather than recalculated per item.
     */
    const layout = useMemo<ViewLayout>(() => {
        const columnsMap = toBreakpointMap(columns);
        const matrixMap = toBreakpointMap(matrix);

        // A flat `columns={12}` is a base count; a map is a set of explicit widths.
        const explicitPerBreakpoint = isResponsiveMap(columns ?? {});
        const scaling = autoScale !== undefined && autoScale !== false && !explicitPerBreakpoint;

        const baseCandidate =
            baseColumns ??
            (typeof columns === "number" ? columns : undefined) ??
            Math.max(0, ...Object.values(columnsMap));

        const derived = scaling
            ? deriveColumnCounts(
                baseCandidate || 12,
                typeof autoScale === "object" ? autoScale : undefined
            )
            : null;

        const columnCounts = {} as Record<Breakpoint, number>;
        BREAKPOINTS.forEach((bp) => {
            const matrixHit = resolveCascade(matrixMap, bp);
            if (matrixHit) {
                columnCounts[bp] = matrixHit.value.reduce(
                    (max, row) => Math.max(max, row.length),
                    0
                );
                return;
            }
            if (derived) {
                columnCounts[bp] = derived[bp];
                return;
            }
            columnCounts[bp] = resolveCascade(columnsMap, bp)?.value ?? 0;
        });

        return {
            columnCounts,
            baseColumns: baseColumns ?? Math.max(1, ...Object.values(columnCounts)),
            reflow
        };
    }, [columns, autoScale, baseColumns, reflow, matrix]);

    /**
     * Reads back the *used* track sizes after layout. Doing it this way means the
     * responsive props are resolved once, by the cascade, instead of being
     * re-implemented as matchMedia logic in JS.
     */
    useEffect(() => {
        const node = gridRef.current;
        if (!node) return undefined;

        const read = () => {
            const computed = getComputedStyle(node);
            const columnTracks = computed.gridTemplateColumns
                .split(" ")
                .filter((token) => token && token !== "none")
                .map(parseFloat);
            const rowTracks = computed.gridTemplateRows
                .split(" ")
                .filter((token) => token && token !== "none")
                .map(parseFloat);

            const next: ViewMetrics = {
                columnCount: columnTracks.length,
                rowCount: rowTracks.length,
                cellWidth: columnTracks[0] || 0,
                cellHeight: rowTracks[0] || 0,
                columnGap: parseFloat(computed.columnGap) || 0,
                rowGap: parseFloat(computed.rowGap) || 0
            };

            setMetrics((prev) =>
                (Object.keys(next) as (keyof ViewMetrics)[]).every(
                    (key) => Math.abs(prev[key] - next[key]) < 0.5
                )
                    ? prev
                    : next
            );
        };

        read();
        const observer = new ResizeObserver(read);
        observer.observe(node);
        return () => observer.disconnect();
    }, [layout, rows, cellWidth, cellHeight, matrix, gap]);

    /**
     * @member style_
     * @description One set of custom properties per breakpoint; index.scss assembles
     * them into a fallback chain so a value set at `sm` holds until `md` overrides it.
     * Values are written only where they change, which matters once `autoScale` gives
     * every breakpoint a distinct column count.
     */
    const style_ = useMemo(() => {
        const next: CSSProperties & Record<string, string | number> = {};
        setAccentStyle(next, { accent, accentLight, accentDark });

        next["--prismal-view-unit"] = unit;

        const rowsMap = toBreakpointMap(rows);
        const cellWidthMap = toBreakpointMap(cellWidth);
        const cellHeightMap = toBreakpointMap(cellHeight);
        const matrixMap = toBreakpointMap(matrix);
        const gapMap = toBreakpointMap(gap);

        const emitted: Record<string, string | number> = {};
        const emit = (key: string, bp: Breakpoint, value: string | number) => {
            if (emitted[key] === value) return;
            emitted[key] = value;
            next[`--prismal-view-${key}-${bp}`] = value;
        };

        BREAKPOINTS.forEach((bp) => {
            const resolvedCellWidth = resolveCascade(cellWidthMap, bp)?.value;
            const resolvedCellHeight = resolveCascade(cellHeightMap, bp)?.value;

            const tracks = resolveTracks({
                columns: layout.columnCounts[bp],
                rows: resolveCascade(rowsMap, bp)?.value,
                cellWidth: resolvedCellWidth,
                cellHeight: resolvedCellHeight,
                matrix: resolveCascade(matrixMap, bp)?.value
            });

            if (tracks) {
                emit("cols", bp, tracks.columns);
                emit("rows", bp, tracks.rows);
            }

            // Implicit tracks must match the explicit ones, or a `wrap` reflow that
            // pushes items past the declared row count produces a grid whose last rows
            // are a different height from the rest.
            emit("auto-col", bp, toTrackSize(resolvedCellWidth));
            emit("auto-row", bp, toTrackSize(resolvedCellHeight));

            const gapValue = resolveCascade(gapMap, bp)?.value;
            if (gapValue !== undefined) emit("gap", bp, toTrackSize(gapValue));
        });

        return style ? { ...next, ...style } : next;
    }, [
        accent, accentLight, accentDark, style,
        layout, rows, cellWidth, cellHeight, matrix, unit, gap
    ]);

    const className_ = useMemo(() => {
        let out = "prismal-view";
        if (dense) out = `${out} prismal-view-dense`;
        if (className) out = `${out} ${className}`;
        return out;
    }, [className, dense]);

    /**
     * @member children_
     * @description Only ViewItem children survive. Dropping rather than wrapping keeps
     * the placement contract honest: everything in a View has an address.
     */
    const children_ = useMemo(() => {
        const kept: ReactNode[] = [];
        let dropped = 0;

        Children.forEach(children, (child) => {
            if (child === null || child === undefined || child === false) return;
            if (isViewItem(child)) kept.push(child);
            else dropped += 1;
        });

        if (dropped > 0 && process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
                `[prismal] View accepts only ViewItem children; dropped ${dropped}. ` +
                "Wrap the content in <ViewItem> to place it."
            );
        }

        return kept;
    }, [children]);

    const context = useMemo(
        () => ({ metrics, layout, inView: true }),
        [metrics, layout]
    );

    return (
        <ViewContext.Provider value={context}>
            <div ref={gridRef} data-id={dataId} className={className_} style={style_}>
                {children_}
            </div>
        </ViewContext.Provider>
    );
};

export default View;
export { ViewItem };
export type { ViewItemProps };
export * from "./utils";
