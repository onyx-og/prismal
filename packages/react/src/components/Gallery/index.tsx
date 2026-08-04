import {
    FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState
} from "react";
import ComponentProps from "../Component";
import { useMasonryGrid } from "components/Masonry";
import MasonryItem, { MasonryItemRef } from "components/Masonry/item";
import useIntersectionObserver from "hooks/useIntersectionObserver";

import "./index.scss";

type Ratio = "5-2" | "9-2" | "5-4" | "16-9" | "16-3" | "18-9" | "20-6" | "20-8" | "8-5" | "4-3" | "4-5";

const DEFAULT_RATIOS: Ratio[] = ["5-2", "9-2", "5-4", "16-9", "16-3", "18-9", "20-6", "20-8", "8-5", "4-3", "4-5"];

const ratioToAspectRatio = (ratio: Ratio): string => ratio.replace("-", " / ");

type GalleryItem = { [key: string]: any; ratio?: Ratio };

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
const Gallery: FC<GalleryProps<any>> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        data, itemRenderer,
        rowHeight = 8,
        ratios = DEFAULT_RATIOS,
        onLoadMore,
        legend, legendContext
    } = props;

    let className_ = "prismal-gallery";
    if (className) className_ = `${className_} ${className}`;

    let style_: { [key: string]: any } = {
        ["--row-height"]: `${rowHeight}px`,
    };
    if (style) style_ = { ...style_, ...style };

    // Caches the randomly-picked ratio per item object, so items already on screen don't
    // reshuffle their tile shape when onLoadMore appends more data.
    const ratioCache = useRef(new WeakMap<GalleryItem, Ratio>());

    const resolvedRatios = useMemo(() => data.map((item) => {
        if (item.ratio) return item.ratio;
        const cached = ratioCache.current.get(item);
        if (cached) return cached;
        const picked = ratios[Math.floor(Math.random() * ratios.length)];
        ratioCache.current.set(item, picked);
        return picked;
    }), [data, ratios]);

    const itemRefs = useRef<MasonryItemRef[]>([]);

    const refCollector = useCallback((ref: MasonryItemRef | null) => {
        if (ref) itemRefs.current.push(ref);
    }, []);

    const content = useMemo(() => {
        itemRefs.current = [];
        return data.map((item, i) => (
            <MasonryItem key={i} ref={refCollector}>
                <div className="prismal-gallery-item" style={{ aspectRatio: ratioToAspectRatio(resolvedRatios[i]) }}>
                    {itemRenderer(item)}
                    {legend ? <div className="prismal-gallery-legend">{legend(item, legendContext ?? {})}</div> : null}
                </div>
            </MasonryItem>
        ));
    }, [data, itemRenderer, refCollector, resolvedRatios, legend, legendContext]);

    const grid = useRef<HTMLDivElement>(null);

    useMasonryGrid(grid, rowHeight, itemRefs, [content]);

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [sentinelSet, setSentinelSet] = useState(false);

    const setSentinelRef = useCallback((node: HTMLDivElement | null) => {
        sentinelRef.current = node;
        setSentinelSet(!!node);
    }, []);

    const isSentinelVisible = useIntersectionObserver(sentinelRef, sentinelSet);

    useEffect(() => {
        if (isSentinelVisible) onLoadMore?.();
    }, [isSentinelVisible, onLoadMore]);

    return <>
        <div ref={grid} data-id={dataId} className={className_} style={style_}>
            {content}
        </div>
        {onLoadMore ? <div ref={setSentinelRef} className="prismal-gallery-sentinel" /> : null}
    </>;
};

export default Gallery;
