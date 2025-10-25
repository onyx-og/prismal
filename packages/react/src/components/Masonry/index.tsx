import { RefObject, FC, useEffect, useCallback,useMemo, useRef, Children, CSSProperties, ReactNode, isValidElement} from "react";
import ComponentProps from "../Component";
import Card from "../Card";

import "./index.scss";
import MasonryItem, {MasonryItemRef} from "./item";


/**
 * @function useMasonryGrid
 * @description A custom hook to arrange items in a masonry layout.
 * @param {RefObject<HTMLDivElement | null>} gridRef Ref to the grid container element.
 * @param {number} rowHeight The height of each row in the grid.
 * @param {RefObject<MasonryItemRef[]>} itemRefs Ref to an array of masonry item refs.
 * @param {Array<any>} [dependencies=[]] Dependencies to re-trigger the layout calculation.
 */
export const useMasonryGrid = (
    gridRef: RefObject<HTMLDivElement | null>, 
    rowHeight: number,
    itemRefs:  RefObject<MasonryItemRef[]>,
    dependencies: Array<any> = []) => {

    /**
     * @function getGap
     * @description Gets the computed gap value of a grid element.
     * @param {Element} element The grid element.
     * @returns {number}
     */
    const getGap = (element: Element) => {
        const style = window.getComputedStyle(element);
        const gap = style.getPropertyValue('gap') || style.getPropertyValue('grid-gap') || '16px';
        return parseFloat(gap);
    }

    /**
     * @function resizeAll
     * @description Recalculates and applies the grid row span for all masonry items.
     */
    const resizeAll = useCallback(() => {
        const grid = gridRef.current;
        if (grid && itemRefs.current) {
            const gap = getGap(grid);
            const row = rowHeight;

            itemRefs.current.forEach(item => {
                if (item && item.applyStyle && item.element.current && item.element.current.offsetHeight) { 
                    const style: CSSProperties = {};
                    const domElement = item.element.current;
                    
                    const height = domElement.offsetHeight; 
                    const spanRow = Math.ceil((height + gap) / (row + gap));
                    style.gridRowEnd = `span ${spanRow}`;

                    item.applyStyle(style);
                }
            });
        }
    }, [gridRef, itemRefs, rowHeight]);

    /**
     * @function watchImages
     * @description Watches for image load events within the grid and triggers a resize.
     */
    const watchImages = useCallback(() => {
        const grid = gridRef.current;
        if (grid) {
            const imgs = grid.querySelectorAll('img');
            imgs.forEach(img => {
                if (img.complete) {
                    // Se l'immagine è già caricata, ricalcola nel prossimo frame
                    window.requestAnimationFrame(resizeAll);
                } else {
                    // Altrimenti, ricalcola al caricamento o in caso di errore
                    img.addEventListener('load', resizeAll, { once: true });
                    img.addEventListener('error', resizeAll, { once: true });
                }
            });
        }
    }, [gridRef, resizeAll]);

    useEffect(() => {
        const grid = gridRef.current;
        
        watchImages();
        resizeAll();

        let rtid = 0;
        const handleResize = () => {
            if (rtid) window.cancelAnimationFrame(rtid);
            rtid = window.requestAnimationFrame(resizeAll);
        };
        window.addEventListener('resize', handleResize);

        let ro: ResizeObserver;
        if ('ResizeObserver' in window && grid && itemRefs.current) {
            ro = new ResizeObserver(() => resizeAll());
            itemRefs.current.forEach(itemRef => {
                if(itemRef.element.current) ro.observe(itemRef.element.current);
            });
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (ro) {
                ro.disconnect();
            }
        };
    }, [gridRef, watchImages, resizeAll, dependencies, itemRefs]);
};

/**
 * @typedef {object} MasonryProcProps
 * @description Props for a Masonry component that processes data.
 * @property {"process"} type The type of masonry layout.
 * @property {{ [key: string]: any }[]} data The array of data items.
 * @property {(item: { [key: string]: any }) => React.ReactNode} [itemRenderer] A function to render each item.
 */
export interface MasonryProcProps {
    type: "process";
    data: { [key: string]: any }[];
    itemRenderer?: (item: { [key: string]: any }) => React.ReactNode;
}

/**
 * @typedef {object} MasonryRawProps
 * @description Props for a Masonry component that uses raw children.
 * @property {"raw"} type The type of masonry layout.
 * @property {React.ReactNode | React.ReactNode[]} children The child elements to arrange.
 */
export interface MasonryRawProps {
    type: "raw";
    children: React.ReactNode | React.ReactNode[];
}

/**
 * @function defaultItemRenderer
 * @description The default renderer for masonry items.
 * @param {{ [key: string]: any }} item The item data.
 * @returns {React.ReactNode} A Card component.
 */
const defaultItemRenderer = (item: { [key: string]: any }) => {
    return <Card>
        {item.content}
    </Card>
}

/**
 * @component MasonryProcessedItems
 * @description Renders masonry items from a data array using a renderer function.
 * @param {object} props The component props.
 * @returns {React.ReactElement[]} An array of rendered MasonryItem components.
 */
const MasonryProcessedItems: FC<{
    collector: (ref: MasonryItemRef | null) => void;
    data: { [key: string]: any }[];
    itemRenderer?: (item: { [key: string]: any }) => React.ReactNode;
}> = (props) => {
    const {
        data, collector,
        itemRenderer = defaultItemRenderer
    } = props;

    return data.map((el, i) => <MasonryItem key={i} ref={collector}>{itemRenderer(el)}</MasonryItem>);
}

/**
 * @typedef {object} BaseMasonryProps
 * @description Base props for the Masonry component.
 * @property {number} [rowHeight=8] The height of each row in pixels.
 */
interface BaseMasonryProps extends ComponentProps {
    rowHeight?: number;
};
type MasonryProps = (MasonryProcProps | MasonryRawProps) & BaseMasonryProps;

/**
 * @component Masonry
 * @description A component for creating a masonry grid layout.
 * @param {MasonryProps} props The component props.
 * @returns {React.ReactElement} The rendered Masonry component.
 * @example
 * <Masonry type="raw" rowHeight={10}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Masonry>
 */
const Masonry: FC<MasonryProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        type,
        rowHeight = 8,
    } = props;

    let className_ = 'prismal-masonry';
    if (className) className_ = `${className_} ${className}`;

    let style_: { [key: string]: any } = {
        ['--row-height']: `${rowHeight}px`,
    };
    if (style) style_ = { ...style_, ...style };

    const itemRefs = useRef<MasonryItemRef[]>([]);

    /**
     * @function refCollector
     * @description Collects refs of masonry items.
     * @param {MasonryItemRef | null} ref The ref object of a masonry item.
     */
    const refCollector = (ref: MasonryItemRef | null) => {
        if (ref) {
            itemRefs.current.push(ref);
        }
    };

    const content = useMemo(() => {
        // Reset refs when content changes
        itemRefs.current = [];
        if (type === 'process') {
            return <MasonryProcessedItems collector={refCollector} itemRenderer={props.itemRenderer} data={props.data} />
        } else if (type === 'raw') {
            return Children.toArray(props.children).map( (el, i) => {
              if (isValidElement(el)) {
                return <MasonryItem key={i} ref={refCollector}>{el}</MasonryItem>;
              }
              return null;
            });
        }
    }, [type, (props as MasonryProcProps).data, (props as MasonryRawProps).children, (props as MasonryProcProps).itemRenderer]);

    const grid = useRef<HTMLDivElement>(null);

    useMasonryGrid(grid, rowHeight, itemRefs, [content]);

    return <div ref={grid} data-id={dataId}
        className={className_} style={style_}>
        {content}
    </div>
}

export default Masonry;