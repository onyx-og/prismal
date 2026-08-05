import { FC, ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
type Ratio = "5-2" | "9-2" | "5-4" | "16-9" | "16-3" | "18-9" | "20-6" | "20-8" | "8-5" | "4-3" | "4-5";
type GalleryItem = {
    [key: string]: any;
    ratio?: Ratio;
};
export interface GalleryProps<T extends GalleryItem = GalleryItem> extends ComponentProps {
    /** The items to render. */
    data: T[];
    /** Renders a single item's content; the tile's aspect ratio is applied by Gallery, not the renderer. */
    itemRenderer: (item: T) => ReactNode;
    /** The height of each masonry row in pixels. */
    rowHeight?: number;
    /** The pool of ratios randomly assigned to items that don't carry their own `ratio`. */
    ratios?: Ratio[];
    /** Called when the trailing sentinel scrolls into view, so the consumer can load and append more data. */
    onLoadMore?: () => void;
    /** Renders a legend for a given item. `context` is passed through from `legendContext` untouched — Gallery has no opinion on its shape. */
    legend?: (item: T, context: Record<string, unknown>) => ReactNode;
    /** Arbitrary data (e.g. a timestamp, hover state) forwarded as-is to `legend`. */
    legendContext?: Record<string, unknown>;
}
/**
 * @component Gallery
 * @description A masonry gallery with infinite-scroll loading, randomized tile ratios for items that
 * don't specify their own, and an optional per-item legend.
 * @param {GalleryProps} props The component props.
 * @returns {React.ReactElement} The rendered Gallery component.
 * @example
 * <Gallery
 *   data={photos}
 *   itemRenderer={(photo) => <img src={photo.src} alt={photo.alt} />}
 *   legend={(photo, ctx) => <span>{photo.caption} — {String(ctx.now)}</span>}
 *   legendContext={{ now: Date.now() }}
 *   onLoadMore={loadNextPage}
 * />
 */
declare const Gallery: FC<GalleryProps<any>>;
export default Gallery;
