/// <reference types="react" />
import { Breakpoint, ViewReflow } from "./utils";
/**
 * @typedef {object} ViewMetrics
 * @description Used track sizes read back from the laid-out grid.
 * Reading them from `getComputedStyle` rather than recomputing the responsive
 * props in JS means the numbers are always correct for the active breakpoint
 * without View needing to know which breakpoint that is.
 */
export interface ViewMetrics {
    /** Number of column tracks currently laid out. */
    columnCount: number;
    /** Number of row tracks currently laid out. */
    rowCount: number;
    /** Used width of the first column track, in px. */
    cellWidth: number;
    /** Used height of the first row track, in px. */
    cellHeight: number;
    /** Used column gap, in px. */
    columnGap: number;
    /** Used row gap, in px. */
    rowGap: number;
}
/**
 * @typedef {object} ViewLayout
 * @description The resolved grid shape, computed once by View and shared with every item.
 * Items reflow themselves rather than View rewriting their props, so an item inserted by
 * Gutenberg into existing inner blocks picks up the same rules with no extra plumbing.
 */
export interface ViewLayout {
    /** Column count at each breakpoint, however it was arrived at. */
    columnCounts: Record<Breakpoint, number>;
    /** The width addresses are authored against. Reflow triggers below this. */
    baseColumns: number;
    /** Default policy for items whose column no longer exists at a breakpoint. */
    reflow: ViewReflow;
}
export declare const EMPTY_METRICS: ViewMetrics;
export declare const DEFAULT_LAYOUT: ViewLayout;
export interface ViewContextValue {
    metrics: ViewMetrics;
    layout: ViewLayout;
    /** True when the item is rendered inside a View. Lets ViewItem warn when used loose. */
    inView: boolean;
}
export declare const ViewContext: import("react").Context<ViewContextValue>;
export declare const useViewContext: () => ViewContextValue;
