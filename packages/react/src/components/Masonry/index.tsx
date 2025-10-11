import { RefObject, FC, useEffect, useCallback,useMemo, useRef, createRef, Children, CSSProperties} from "react";
import ComponentProps from "../Component";
import Card from "../Card";

import "./index.scss";
import MasonryItem, {MasonryItemRef} from "./item";


export const useMasonryGrid = (
    gridRef: RefObject<HTMLDivElement | null>, 
    rowHeight: number,
    itemRefs:  RefObject<MasonryItemRef[]>,
    dependencies: Array<any> = []) => {

    const getGap = (element: Element) => {
        const style = window.getComputedStyle(element);
        const gap = style.getPropertyValue('gap') || style.getPropertyValue('grid-gap') || '16px';
        return parseFloat(gap);
    }

    const resizeAll = useCallback(() => {
        const grid = gridRef.current;
        if (grid) {
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
    }, [gridRef]);

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
        if ('ResizeObserver' in window && grid) {
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
    }, [gridRef, watchImages, resizeAll, ...dependencies]);
};

export interface MasonryProcProps {
    type: "process";
    data: { [key: string]: any }[];
    itemRenderer?: (item: { [key: string]: any }) => React.ReactNode;
}
export interface MasonryRawProps {
    type: "raw";
    children: React.ReactNode | React.ReactNode[];
}

const defaultItemRenderer = (item: { [key: string]: any }) => {
    return <Card>

    </Card>
}
const MasonryProcessedItems = (props: {
    collector: (ref: MasonryItemRef | null) => void;
    data: { [key: string]: any }[];
    itemRenderer?: (item: { [key: string]: any }) => React.ReactNode;
}) => {
    const {
        data, collector,
        itemRenderer = defaultItemRenderer
    } = props;

    console.log("Got data", {data});

    return data.map(el => <MasonryItem ref={collector}>{itemRenderer(el)}</MasonryItem>);
}
interface BaseMasonryProps extends ComponentProps {
    rowHeight?: number;
};
type MasonryProps = (MasonryProcProps | MasonryRawProps) & BaseMasonryProps;
const Masonry: FC<MasonryProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
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

    const refCollector = (ref: MasonryItemRef | null) => {
        if (ref) {
            itemRefs.current.push(ref);
        }
    };

    const content = useMemo(() => {
        if (type == 'process') {
            return <MasonryProcessedItems collector={refCollector} itemRenderer={props.itemRenderer} data={props.data} />
        } else if (type === 'raw') {
            return Children.toArray(props.children).map( el => <MasonryItem ref={refCollector}>{el}</MasonryItem> );
        }
    }, [type]);

    const grid = useRef<HTMLDivElement>(null);

    useMasonryGrid(grid, rowHeight, itemRefs, [content]);

    return <div ref={grid} data-id={dataId}
        className={className_} style={style_}>
        {content}
    </div>
}

export default Masonry;