import { FC, JSX, ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import './index.scss';
import Page, { ListProcessor } from './page';
import ComponentProps from '../Component';
import ActionBar, { ActionBarItemConfig } from "../ActionBar";
import Button from '../Button';
import { setAccentStyle } from 'utils/colors';

/**
 * [TODO] Add infinity scroll and pagination back-to-top behaviour
 * when moving between pages
 */

/**
 * @typedef {object} ProcessedListProps
 * @description Props for a List component that processes data.
 */
export interface ProcessedListProps extends ComponentProps {
    /** The array of data to be processed and displayed. */
    data: any[];
    /** The number of items to display per page. */
    pageSize?: number;
    /** The initial page number. */
    page?: number;
    /** If true, enables infinite scrolling. */
    infiniteScroll?: boolean;
    /** Content to display above the list. */
    header?: ReactNode;
    /** CSS class for the header. */
    headerClassName?: string;
    /** Content to display below the list. */
    footer?: ReactNode;
    /** CSS class for the footer. */
    footerClassName?: string;
    /** If true, shows pagination controls. */
    showPageCtrl?: boolean;
    /** If true, shows first/last page controls. */
    showExtremesCtrl?: boolean;
    /** A function to process and render list items. */
    listProcessor: ListProcessor,
    /** Callback fired after data processing. */
    onProcessEnd?: (arg: any) => void;
    /** The view type. */
    view?: 'list';
    /** The list type. */
    type: 'process';
    /** The padding size for the list. */
    padding?: 's' | 'm' | 'l';
}

/**
 * @typedef {object} RawListProps
 * @description Props for a List component that displays raw children.
 */
export interface RawListProps extends ComponentProps {
    /** The number of items to display per page. */
    pageSize?: number;
    /** The initial page number. */
    page?: number;
    /** If true, enables infinite scrolling. */
    infiniteScroll?: boolean;
    /** Content to display above the list. */
    header?: ReactNode;
    /** CSS class for the header. */
    headerClassName?: string;
    /** Content to display below the list. */
    footer?: ReactNode;
    /** CSS class for the footer. */
    footerClassName?: string;
    /** If true, shows pagination controls. */
    showPageCtrl?: boolean;
    /** If true, shows first/last page controls. */
    showExtremesCtrl?: boolean;
    /** The array of nodes to display. */
    children: ReactNode[];
    /** The view type. */
    view?: 'list';
    /** The list type. */
    type: 'raw';
    /** The padding size for the list. */
    padding?: 's' | 'm' | 'l';
}

export type ListProps = ProcessedListProps | RawListProps;

/**
 * @typedef {object} ProcessedGridProps
 * @description Props for a Grid component that processes data.
 */
export interface ProcessedGridProps extends ComponentProps {
    /** The array of data to be processed and displayed. */
    data: any[];
    /** The number of items to display per page. */
    pageSize?: number;
    /** The initial page number. */
    page?: number;
    /** If true, enables infinite scrolling. */
    infiniteScroll?: boolean;
    /** Content to display above the grid. */
    header?: ReactNode;
    /** CSS class for the header. */
    headerClassName?: string;
    /** Content to display below the grid. */
    footer?: ReactNode;
    /** CSS class for the footer. */
    footerClassName?: string;
    /** If true, shows pagination controls. */
    showPageCtrl?: boolean;
    /** If true, shows first/last page controls. */
    showExtremesCtrl?: boolean;
    /** A function to process and render grid items. */
    listProcessor: ListProcessor;
    /** Callback fired after data processing. */
    onProcessEnd?: (arg: any) => void;
    /** The view type. */
    view?: 'grid';
    /** The list type. */
    type: 'process';
    /** The padding size for the grid. */
    padding?: 's' | 'm' | 'l';
    /** The number of columns in the grid. */
    cols?: number;
    /** The number of columns for extra small screens. */
    xsCols?: number;
    /** The number of columns for small screens. */
    smCols?: number;
    /** The number of columns for medium screens. */
    mdCols?: number;
    /** The number of columns for large screens. */
    lgCols?: number;
    /** The number of columns for extra large screens. */
    xlCols?: number;
}

/**
 * @typedef {object} RawGridProps
 * @description Props for a Grid component that displays raw children.
 */
export interface RawGridProps extends ComponentProps {
    /** The number of items to display per page. */
    pageSize?: number;
    /** The initial page number. */
    page?: number;
    /** If true, enables infinite scrolling. */
    infiniteScroll?: boolean;
    /** Content to display above the grid. */
    header?: ReactNode;
    /** CSS class for the header. */
    headerClassName?: string;
    /** Content to display below the grid. */
    footer?: ReactNode;
    /** CSS class for the footer. */
    footerClassName?: string;
    /** If true, shows pagination controls. */
    showPageCtrl?: boolean;
    /** If true, shows first/last page controls. */
    showExtremesCtrl?: boolean;
    /** The array of nodes to display. */
    children: ReactNode[];
    /** The view type. */
    view?: 'grid';
    /** The list type. */
    type: 'raw';
    /** The padding size for the grid. */
    padding?: 's' | 'm' | 'l';
    /** The number of columns in the grid. */
    cols?: number;
    /** The number of columns for extra small screens. */
    xsCols?: number;
    /** The number of columns for small screens. */
    smCols?: number;
    /** The number of columns for medium screens. */
    mdCols?: number;
    /** The number of columns for large screens. */
    lgCols?: number;
    /** The number of columns for extra large screens. */
    xlCols?: number;
}

export type GridProps = ProcessedGridProps | RawGridProps;

export type ListComponentProps = ListProps | GridProps;

/**
 * @component List
 * @description A component for displaying paginated data in a list or grid view.
 * @param {ListComponentProps} props The component props.
 * @returns {React.ReactElement} The rendered List or Grid component.
 * @example
 * <List type="raw">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </List>
 */
const List: FC<ListComponentProps> = (props) => {
    const {
        "data-id": dataId,
        pageSize = 24,
        page = 1,
        header,
        headerClassName,
        footer,
        footerClassName,
        showPageCtrl = true,
        showExtremesCtrl = false,
        view = 'list',
        padding = 's',
    } = props;

    const {
        className,
        accent, accentLight, accentDark
    } = props;

    let className_ = `prismal-list prismal-list-type-${view}`;
    if (className) className_ = `${className_} ${className}`;

    const style: Record<string, any> = setAccentStyle({}, { accent, accentLight, accentDark });

    if (props.view == 'grid') {
        const {
            cols = 4,
            xlCols = cols,
            lgCols = xlCols - 1 > 0 ? xlCols - 1 : 1,
            mdCols = lgCols - 1 > 0 ? lgCols - 1 : 1,
            smCols = mdCols - 1 > 0 ? mdCols - 1 : 1,
            xsCols = smCols - 1 > 0 ? smCols - 1 : 1,
        } = props;

        style["--grid-colums-xs"] = xsCols;
        style["--grid-colums-sm"] = smCols;
        style["--grid-colums-md"] = mdCols;
        style["--grid-colums-lg"] = lgCols;
        style["--grid-colums-xl"] = xlCols;
        style["--grid-colums"] = cols;
    }

    const [currentPage, setPage] = useState<number>(page);

    useEffect(() => {
        setPage(page);
    }, [page]);

    const data = useMemo(() => {
        let res: any[] | ReactNode[];
        if (props.type == "raw") {
            res = props.children;
        } else {
            res = props.data;
        }
        return res;
    }, [props]);

    const listSubSet = useMemo(() => {
        if (pageSize) {
            let subset = data.slice(currentPage * pageSize - pageSize, currentPage * pageSize);
            return subset;
        }
        return data;
    }, [data, currentPage, pageSize]);

    let listWrapperClass = `prismal-list-wrapper`;

    let listProcessor_: ListProcessor,
        onProcessEnd_: ((arg: any) => void) | undefined;

    if (props.type == "process") {
        const { listProcessor, onProcessEnd } = props;
        listProcessor_ = listProcessor;
        onProcessEnd_ = onProcessEnd;
    } else {
        listProcessor_ = (elements) => {
            return {
                elements: elements
            }
        }
    }

    const pageContainer = useMemo(() => {
        return <div className={listWrapperClass}>
            <div className={`prismal-page-container padding-${padding}`}>
                <Page list={listSubSet}
                    listProcessor={listProcessor_}
                    onProcessEnd={onProcessEnd_}
                />
            </div>
        </div>
    }, [listWrapperClass, padding, listSubSet, listProcessor_, onProcessEnd_]);

    let headerClassName_ = "prismal-list-header";
    if (headerClassName) headerClassName_ = `${headerClassName_} ${headerClassName}`;
    let footerClassName_ = "prismal-list-footer";
    if (footerClassName) footerClassName_ = `${footerClassName_} ${footerClassName}`;

    const header_ = useMemo(() => {
        return <div className={headerClassName_}>{header}</div>
    }, [header, headerClassName_]);

    /**
     * @function pageBackwards
     * @description Navigates to the previous page.
     */
    const pageBackwards = useCallback(() => {
        setPage(currentPage - 1);
    }, [setPage, currentPage]);

    /**
     * @function pageForward
     * @description Navigates to the next page.
     */
    const pageForward = useCallback(() => {
        setPage(currentPage + 1);
    }, [setPage, currentPage]);

    const lastPage = useMemo(() => {
        if (pageSize) {
            return Math.ceil(data.length / pageSize);
        } else return 1;
    }, [data.length, pageSize]);

    const pageJumpCtrl: ActionBarItemConfig[] = useMemo(() => {
        let numbers_ = Array(lastPage);
        for (let i = 1; i <= lastPage; i++) {
            numbers_[i - 1] = i;
        }
        if (currentPage == 1) {
            numbers_ = numbers_.slice(0, 0 + 3)
        } else if (currentPage == lastPage) {
            numbers_ = numbers_.slice(lastPage - 3, lastPage);
        } else {
            numbers_ = numbers_.slice(currentPage - 2, currentPage + 1)
        }
        const result: ActionBarItemConfig[] = numbers_.map((n, i) => {
            return {
                item: <Button key={n} type={n == currentPage ? 'primary' : 'text'} onClick={() => setPage(n)} disabled={n == currentPage}>{n}</Button>,
                position: 'center',
                key: `page-jump-ctrl-${i}`
            }

        })
        return result;
    }, [lastPage, currentPage]);

    const leftExtreme = useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                <Button type='text' disabled={currentPage == 1} onClick={() => setPage(1)}>First</Button>
            </>
        }
    }, [showExtremesCtrl, currentPage]);

    const rightExtreme = useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                <Button type='text' disabled={currentPage == lastPage} onClick={() => setPage(lastPage)}>Last</Button>
            </>
        }
    }, [showExtremesCtrl, currentPage, lastPage]);

    const pageCtrl = useMemo(() => {
        return <ActionBar items={[
            { item: <>{leftExtreme}</>, position: "left", key: "leftExtreme" },
            { item: <Button key={"backwards"} onClick={pageBackwards} disabled={currentPage == 1}>Back</Button>, position: "left", key: "back" },
            ...pageJumpCtrl,
            { item: <Button key={"forward"} onClick={pageForward} disabled={currentPage == lastPage}>Next</Button>, position: "right", key: "next" },
            { item: <>{rightExtreme}</>, position: "right", key: "rightExtrme" }
        ]} />
    }, [leftExtreme, pageBackwards, currentPage, pageJumpCtrl, pageForward, lastPage, rightExtreme]);

    const footer_ = useMemo(() => {
        return <div className={footerClassName_}>
            {showPageCtrl ? pageCtrl : <></>}
            {footer}
        </div>
    }, [showPageCtrl, footerClassName_, pageCtrl, footer])

    const component = useMemo(() => {
        return <div data-id={dataId} className={className_} style={style}>
            {header_}
            {pageContainer}
            {footer_}
        </div>
    }, [dataId, pageContainer, header_, style, className_, footer_]);

    return component;
}

export default List;