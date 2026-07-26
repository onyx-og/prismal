import {
    ReactNode, FC, CSSProperties, useMemo, useRef, useState, useEffect
} from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";
import { useViewContext } from "./context";
import {
    BREAKPOINTS, Breakpoint, Responsive, ViewAddress, ViewAlign, ViewOffset,
    ViewReflow, ViewPlacement,
    applyReflow, isFlatResponsive, parseAddress, resolveCascade, resolveOffset,
    toBreakpointMap
} from "./utils";

/**
 * How many cells the item occupies on one axis.
 * - `number` -> an explicit span
 * - `"auto"` -> measured: the item grows toward the bottom-right until its
 *   natural content fits, snapping to whole cells
 */
export type ViewSpan = number | "auto";

/**
 * How the item participates in hit-testing. Relevant once items overlap.
 * - `"auto"`    -> normal; the item's whole box catches pointer events
 * - `"none"`    -> fully transparent to the pointer
 * - `"content"` -> the wrapper is transparent, its content is not. Use this for
 *   an overlay that spans a wide area to position a small element: the empty
 *   space passes clicks through to the layer beneath, the element itself doesn't.
 */
export type ViewPointerEvents = "auto" | "none" | "content";

/**
 * @typedef {object} ViewItemProps
 * @description Props for the ViewItem component.
 * @property {ReactNode} [children] The cell content.
 * @property {object | string} [at] Spreadsheet-style hook, e.g. `"A2"`. Omit to auto-place.
 * @property {object | number | "auto"} [width="auto"] Span in columns, measured when `"auto"`.
 * @property {object | number | "auto"} [height="auto"] Span in rows, measured when `"auto"`.
 * @property {object | number} [layer] Stacking order within the View. Higher paints later.
 * @property {object | string} [justify] Horizontal placement inside the item's grid area.
 * @property {object | string} [align] Vertical placement inside the item's grid area.
 * @property {object | number | string} [offset] Post-placement nudge, applied as a translate.
 * @property {string} [reflow] Overrides the View's reflow policy for this item alone.
 * @property {"auto" | "none" | "content"} [pointerEvents="auto"] Hit-testing behaviour.
 * @property {boolean} [clip=false] Hide overflow instead of letting content bleed past the span.
 */
export interface ViewItemProps extends ComponentProps {
    children?: ReactNode;
    at?: Responsive<ViewAddress>;
    width?: Responsive<ViewSpan>;
    height?: Responsive<ViewSpan>;
    layer?: Responsive<number>;
    justify?: Responsive<ViewAlign>;
    align?: Responsive<ViewAlign>;
    offset?: Responsive<ViewOffset>;
    reflow?: ViewReflow;
    pointerEvents?: ViewPointerEvents;
    clip?: boolean;
}

/** Marker used by View to accept this component across bundle / HMR boundaries. */
export const VIEW_ITEM_MARKER = "__prismalViewItem";

/**
 * @function spansFromNatural
 * @description Converts a measured natural size into a whole number of cells.
 * Solves `n * cell + (n - 1) * gap >= natural` for the smallest integer n.
 */
const spansFromNatural = (
    natural: number,
    cell: number,
    gap: number,
    limit: number
): number => {
    if (!natural || cell <= 0) return 1;
    const n = Math.ceil((natural + gap) / (cell + gap));
    const bounded = limit > 0 ? Math.min(n, limit) : n;
    return Math.max(1, bounded);
};

/**
 * @component ViewItem
 * @description A single placed cell inside a View. Anchors at its hook address and
 * extends toward the bottom-right, either to its content or to an explicit span.
 * When a breakpoint's grid is narrower than the one the address was authored against,
 * the item reflows itself according to the View's policy — unless the address was
 * authored for that breakpoint specifically, in which case it is left alone.
 * @param {ViewItemProps} props The component props.
 * @returns {React.ReactElement} The rendered ViewItem component.
 * @example
 * <ViewItem at="A2" width={2}>
 *   <Card>Spans A2:B2</Card>
 * </ViewItem>
 *
 * // An overlay hugging the top-right corner of the whole View, sitting above
 * // the card beneath it and letting clicks through everywhere except the badge.
 * // reflow="none" keeps it pinned to the corner at every width.
 * <ViewItem at="A1" width={12} height={8} layer={1} reflow="none"
 *           justify="end" align="start" pointerEvents="content">
 *   <Badge>New</Badge>
 * </ViewItem>
 */
const ViewItem: FC<ViewItemProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        children,
        at,
        width = "auto",
        height = "auto",
        layer,
        justify,
        align,
        offset,
        reflow,
        pointerEvents = "auto",
        clip = false
    } = props;

    const { metrics, layout, inView } = useViewContext();

    if (process.env.NODE_ENV !== "production" && !inView) {
        // eslint-disable-next-line no-console
        console.warn("[prismal] ViewItem rendered outside a View; it will not be placed.");
    }

    const measureRef = useRef<HTMLDivElement>(null);
    const [natural, setNatural] = useState({ width: 0, height: 0 });

    const atMap = useMemo(() => toBreakpointMap(at), [at]);
    // A flat address describes the base-width layout, not the xs one, so no breakpoint
    // counts as "authored" for it and reflow applies wherever the grid is narrower.
    const atIsFlat = useMemo(() => isFlatResponsive(at), [at]);
    const widthMap = useMemo(() => toBreakpointMap<ViewSpan>(width), [width]);
    const heightMap = useMemo(() => toBreakpointMap<ViewSpan>(height), [height]);
    const layerMap = useMemo(() => toBreakpointMap<number>(layer), [layer]);
    const justifyMap = useMemo(() => toBreakpointMap<ViewAlign>(justify), [justify]);
    const alignMap = useMemo(() => toBreakpointMap<ViewAlign>(align), [align]);
    const offsetMap = useMemo(() => toBreakpointMap<ViewOffset>(offset), [offset]);

    const needsMeasure = useMemo(
        () =>
            Object.values(widthMap).some((v) => v === "auto") ||
            Object.values(heightMap).some((v) => v === "auto"),
        [widthMap, heightMap]
    );

    /**
     * Measures the content at its intrinsic size. The wrapper is laid out at
     * `max-content` (see `.prismal-view-item-measure` in index.scss), so this is
     * the size the item *wants*, not the size the cell currently gives it.
     * `max-content` does not depend on the container, so widening the span in
     * response to the measurement cannot feed back into it.
     */
    useEffect(() => {
        const node = measureRef.current;
        if (!node || !needsMeasure) return undefined;

        const read = () => {
            const rect = node.getBoundingClientRect();
            setNatural((prev) =>
                Math.abs(prev.width - rect.width) < 0.5 &&
                Math.abs(prev.height - rect.height) < 0.5
                    ? prev
                    : { width: rect.width, height: rect.height }
            );
        };

        read();
        const observer = new ResizeObserver(read);
        observer.observe(node);
        return () => observer.disconnect();
    }, [needsMeasure]);

    /**
     * @member style_
     * @description Emits custom properties per breakpoint. A value is written only where
     * it differs from the breakpoint below, so the stylesheet's fallback chain carries
     * the rest and the markup stays small — an important consideration when a page holds
     * dozens of items and every one of them would otherwise carry five copies of
     * everything.
     */
    const style_ = useMemo(() => {
        const next: CSSProperties & Record<string, string | number> = {};
        setAccentStyle(next, { accent, accentLight, accentDark });

        const mode = reflow ?? layout.reflow;

        const autoWidthSpan = spansFromNatural(
            natural.width, metrics.cellWidth, metrics.columnGap, metrics.columnCount
        );
        const autoHeightSpan = spansFromNatural(
            natural.height, metrics.cellHeight, metrics.rowGap, metrics.rowCount
        );

        const emitted: Record<string, string | number> = {};
        const emit = (key: string, bp: Breakpoint, value: string | number) => {
            if (emitted[key] === value) return;
            emitted[key] = value;
            next[`--prismal-view-item-${key}-${bp}`] = value;
        };

        BREAKPOINTS.forEach((bp) => {
            const widthHit = resolveCascade(widthMap, bp);
            const heightHit = resolveCascade(heightMap, bp);

            const rawWidth = widthHit?.value ?? "auto";
            const rawHeight = heightHit?.value ?? "auto";
            const heightSpan = rawHeight === "auto" ? autoHeightSpan : rawHeight;

            const addressHit = resolveCascade(atMap, bp);
            let placement: ViewPlacement | null = null;

            if (addressHit) {
                const coords = parseAddress(addressHit.value);
                if (coords) {
                    const authored: ViewPlacement = {
                        col: coords.col,
                        row: coords.row,
                        span: rawWidth === "auto" ? autoWidthSpan : rawWidth
                    };

                    // An address written *for* this breakpoint is a deliberate
                    // instruction. Only an address inherited from a wider breakpoint
                    // gets rescued.
                    placement =
                        !atIsFlat && addressHit.source === bp
                            ? authored
                            : applyReflow(
                                authored,
                                layout.baseColumns,
                                layout.columnCounts[bp],
                                mode
                            );
                } else if (process.env.NODE_ENV !== "production") {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `[prismal] ViewItem: unparseable address "${addressHit.value}".`
                    );
                }
            }

            if (placement) {
                // col 0 is the reflow sentinel for "stop trying to place this and let
                // the grid flow it" — emitted as the CSS keyword, not omitted, or the
                // fallback chain would resurrect the address from the breakpoint below.
                emit("col", bp, placement.col === 0 ? "auto" : placement.col);
                emit("row", bp, placement.col === 0 ? "auto" : placement.row);
                emit("w", bp, placement.span);
            } else {
                emit("w", bp, rawWidth === "auto" ? autoWidthSpan : rawWidth);
            }

            emit("h", bp, heightSpan);

            const z = resolveCascade(layerMap, bp);
            if (z) emit("z", bp, z.value);

            const j = resolveCascade(justifyMap, bp);
            if (j) emit("justify", bp, j.value);

            const a = resolveCascade(alignMap, bp);
            if (a) emit("align", bp, a.value);

            const o = resolveCascade(offsetMap, bp);
            const translate = o ? resolveOffset(o.value) : null;
            if (translate !== null) emit("offset", bp, translate);
        });

        return style ? { ...next, ...style } : next;
    }, [
        accent, accentLight, accentDark, style,
        atMap, atIsFlat, widthMap, heightMap, layerMap, justifyMap, alignMap, offsetMap,
        reflow, layout, natural, metrics
    ]);

    const className_ = useMemo(() => {
        let out = "prismal-view-item";
        if (clip) out = `${out} prismal-view-item-clip`;
        if (pointerEvents !== "auto") out = `${out} prismal-view-item-pointer-${pointerEvents}`;
        if (className) out = `${out} ${className}`;
        return out;
    }, [className, clip, pointerEvents]);

    return (
        <div data-id={dataId} className={className_} style={style_}>
            <div
                ref={measureRef}
                className={
                    needsMeasure
                        ? "prismal-view-item-content prismal-view-item-measure"
                        : "prismal-view-item-content"
                }
            >
                {children}
            </div>
        </div>
    );
};

(ViewItem as unknown as Record<string, boolean>)[VIEW_ITEM_MARKER] = true;

export default ViewItem;
