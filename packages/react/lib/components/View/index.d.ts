import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
import ViewItem, { ViewItemProps } from "./ViewItem";
import { Breakpoint, Responsive, ViewSize, ViewMatrix, ViewReflow } from "./utils";
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
declare const View: FC<ViewProps>;
export default View;
export { ViewItem };
export type { ViewItemProps };
export * from "./utils";
