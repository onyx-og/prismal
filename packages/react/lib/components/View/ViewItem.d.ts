import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import { Responsive, ViewAddress, ViewAlign, ViewOffset, ViewReflow } from "./utils";
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
 * @property {boolean} [clip=false] Constrain the item to the box implied by its own
 * width/height span — rather than the row/column track, which may be sized "auto" and
 * would otherwise grow to fit oversized content — and scroll whatever doesn't fit.
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
export declare const VIEW_ITEM_MARKER = "__prismalViewItem";
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
declare const ViewItem: FC<ViewItemProps>;
export default ViewItem;
