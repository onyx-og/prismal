import {
    ReactNode, JSX, useMemo, useEffect, useCallback, useState, useRef,
    CSSProperties, FC, forwardRef, ForwardedRef, useImperativeHandle
} from "react";
import ComponentProps from "../Component";
import ActionBar, { ActionBarItemConfig } from "../ActionBar";
import Button from "../Button";

import "./index.scss";
import { setAccentStyle } from "utils/";

/**
 * @typedef {ReactNode} CellData
 * @description The data type for a single cell in the table.
 */
export type CellData = ReactNode;

/** Default number of rows per page when pagination is enabled without an explicit `pageSize`. */
const DEFAULT_PAGE_SIZE = 10;

/**
 * @typedef {object} TableProps
 * @description Props for the Table component.
 */
export interface TableProps extends ComponentProps {
    /** The data for the table, either as an object of objects or an array of objects. */
    data: { [keyX: string]: { [keyY: string]: CellData } } | {
        [keyX: string]: any;
    }[];
    /** The caption for the table. */
    caption?: ReactNode;
    /** A function to custom render table cells. */
    cellRenderer?: (props: { data: CellData, coords?: [string, string], mode?: string }) => JSX.Element
    /** Enables pagination. Automatically enabled when `pageSize` or `infiniteScroll` is provided. */
    pagination?: boolean;
    /** The maximum number of rows displayed per page. Defaults to 10 when pagination is enabled. */
    pageSize?: number;
    /** The current (1-based) page. Updating it moves the table to that page, enabling external pagination control. */
    page?: number;
    /** Fired when the displayed page changes. Receives the target page and the count of currently
     * loaded pages; a target beyond the page count signals demand for data not yet fetched. */
    onPageMove?: (page: number, pageCount: number) => void;
    /** Content displayed above the table. */
    header?: ReactNode;
    /** Content displayed below the table. */
    footer?: ReactNode;
    /** Embeds the pager in the footer. Defaults to true when pagination is enabled (unless `infiniteScroll` is on). */
    pagerInFooter?: boolean;
    /** Embeds the pager in the header. Defaults to false. */
    pagerInHeader?: boolean;
    /** When true, injects a Refresh button in the table header bar. */
    refresh?: boolean;
    /** Called when the Refresh button is pressed. */
    onRefresh?: () => void;
    /** [DRAFT] Appends the next page when the bottom of the table becomes visible,
     * instead of pager navigation. Fires `onPageMove` on each advance. */
    infiniteScroll?: boolean;
}

/**
 * @typedef {object} TableRefType
 * @description The ref object exposed by the Table component, allowing external
 * control of pagination and sorting (mirrors the InputRefType strategy).
 */
export type TableRefType = {
    /** A flag to identify this as a table ref. */
    isTableRefType: boolean;
    /** The root DOM element of the table container. */
    element: HTMLDivElement | null;
    /** Returns the current (1-based) page. */
    getPage: () => number;
    /** Returns the count of currently loaded pages. */
    getPageCount: () => number;
    /** Moves the table to the given page (clamped to bounds). Fires `onPageMove`. */
    setPage: (page: number) => void;
    /** Moves the table to the next page. Fires `onPageMove`. */
    nextPage: () => void;
    /** Moves the table to the previous page. Fires `onPageMove`. */
    previousPage: () => void;
    /** Returns the active sort as [columnKey, order], or null when unsorted. */
    getOrder: () => [string, 'asc' | 'desc'] | null;
    /** Sorts the table by the given column key and order. */
    setOrder: (keyX: string, order?: 'asc' | 'desc') => void;
}

/**
 * @function defaultCellRenderer
 * @description The default renderer for table cells.
 * @param {object} props The props for the cell renderer.
 * @returns {JSX.Element} A table data cell element.
 */
const defaultCellRenderer = (props: { data: CellData, coords?: [string, string], mode?: string }) => {
    const { data, coords } = props;
    const key = `${coords ? coords.concat() : null}`;

    return <td key={key}>{data}</td>
}

/**
 * @typedef {object} HeaderCellProp
 * @description Props for the HeaderCell component.
 */
interface HeaderCellProp {
    /** The label for the header cell. */
    label: string;
    /** A function to toggle the sorting order for the column. */
    toggleOrder: (key: string) => void;
    /** The current sorting order of the column. */
    setsOrdering?: false | 'asc' | 'desc';
}

/**
 * @component HeaderCell
 * @description A header cell component for the Table that supports sorting.
 * @param {HeaderCellProp} props The component props.
 * @returns {React.ReactElement} The rendered table header cell.
 */
const HeaderCell: FC<HeaderCellProp> = (props) => {
    const { toggleOrder, label, setsOrdering } = props;
    let className = "prismal-table-header-cell";
    if (setsOrdering) {
        className = `${className} prismal-table-header-cell-${setsOrdering}`;
    }

    return <th className={className} onClick={() => toggleOrder(label)} scope="col">{label}</th>
}

/**
 * @component Table
 * @description A component to display data in a sortable, optionally paginated table.
 * @param {TableProps} props The component props.
 * @param {ForwardedRef<TableRefType>} ref Exposes pagination and sorting control (see TableRefType).
 * @returns {React.ReactElement} The rendered Table component.
 * @example
 * <Table data={[{ id: 1, name: 'Item 1' }]} caption="My Table"
 *     pageSize={10} refresh onRefresh={reload}
 *     onPageMove={(page, pageCount) => { if (page >= pageCount) fetchMore(); }}
 * />
 */
const Table = forwardRef((props: TableProps, ref: ForwardedRef<TableRefType>) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        data, caption,
        cellRenderer = defaultCellRenderer,
        pageSize, page = 1, onPageMove,
        header, footer,
        pagerInHeader = false,
        refresh = false, onRefresh,
        infiniteScroll = false
    } = props;

    const pagination = props.pagination ?? (pageSize != null || infiniteScroll);
    const pageSize_ = pageSize ?? DEFAULT_PAGE_SIZE;
    // The pager is embedded in the footer whenever pagination is on, unless
    // stated otherwise or the table advances by scrolling.
    const pagerInFooter = props.pagerInFooter ?? (pagination && !infiniteScroll);

    let className_ = `prismal-table-container`;
    if (className) className_ = `${className_} ${className}`;

    const caption_ = useMemo(() => {
        if (caption) {
            return <caption>
                {caption}
            </caption>
        }
        return null;
    }, [caption]);

    const keysX = useMemo(() => {
        let keys: { [key: string]: null } = {};
        Object.values(data).forEach(v => {
            Object.keys(v).forEach(k => keys[k] = null)
        })
        const keys_ = Object.keys(keys);
        return keys_;
    }, [data]);

    const [keysY_, setKeysY] = useState(Object.keys(data));

    // Ref kept in sync during render so sort() can always read the latest
    // keysY_ without declaring it as a dependency (which would cause a cycle).
    const keysY_Ref = useRef<string[]>(keysY_);
    keysY_Ref.current = keysY_;

    useEffect(() => {
        setKeysY(Object.keys(data));
    }, [data]);

    const [orderBy, setOrder] = useState<[string, 'asc' | 'desc'] | null>();

    const [currentPage, setPage] = useState<number>(page);

    useEffect(() => {
        setPage(page);
    }, [page]);

    const pageCount = useMemo(() => {
        if (!pagination) return 1;
        return Math.max(1, Math.ceil(keysY_.length / pageSize_));
    }, [pagination, keysY_.length, pageSize_]);

    // Keeps the current page within bounds when the data shrinks.
    useEffect(() => {
        if (currentPage > pageCount) setPage(pageCount);
    }, [currentPage, pageCount]);

    /**
     * @function moveToPage
     * @description Moves the table to the given page (clamped to bounds) and notifies `onPageMove`.
     * @param {number} target The 1-based page to move to.
     */
    const moveToPage = useCallback((target: number) => {
        const target_ = Math.max(1, Math.min(target, pageCount));
        setPage(target_);
        if (onPageMove) onPageMove(target_, pageCount);
    }, [pageCount, onPageMove]);

    /**
     * @function toggleOrder
     * @description Toggles the sorting order for a given column key.
     * @param {string} keyX The key of the column to sort.
     */
    const toggleOrder = useCallback((keyX: string) => {
        if (orderBy && orderBy[0] == keyX) {
            if (orderBy[1] == 'asc') setOrder([keyX, 'desc']);
            else setOrder([keyX, 'asc']);
        } else setOrder([keyX, 'asc']);
    }, [orderBy]);

    /**
     * @function sort
     * @description Sorts the table data based on a column key and sort order.
     * @param {string} keyX The key of the column to sort by.
     * @param {'asc' | 'desc'} [sortOrder='asc'] The sort order.
     */
    const sort = useCallback((keyX: string, sortOrder: 'asc' | 'desc' = 'asc') => {
        let orderedList: [string, CellData][] = []
        // Read current keysY_ via ref — avoids adding keysY_ as a dependency
        // which would create an infinite loop: sort → setKeysY → keysY_ changes
        // → new sort ref → useEffect([sort]) fires → sort → …
        for (const i of keysY_Ref.current) {
            if (Array.isArray(data)) {
                orderedList.push([i, data[Number(i)][keyX]]);
            } else {
                orderedList.push([i, data[i][keyX]]);
            }
        }
        orderedList.sort((a, b) => {
            // Extract the CellData values from the second element of each tuple.
            const valueA = a[1];
            const valueB = b[1];

            let comparisonResult = 0;

            // Assume consistent types for comparison within a column/sort key.
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                comparisonResult = valueA - valueB;
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                comparisonResult = valueA.localeCompare(valueB);
            } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                // false (0) comes before true (1).
                comparisonResult = Number(valueA) - Number(valueB);
            } else {
                // For now, if types are mixed or unknown, they are considered equal for sorting.
                return 0;
            }
            // Apply sorting order (ascending or descending).
            return sortOrder === 'desc' ? -comparisonResult : comparisonResult;
        });

        const sortedKeysY = orderedList.map((tuple) => {
            return tuple[0]
        });
        setKeysY(sortedKeysY);
    }, [data]); // keysY_ intentionally omitted — accessed via keysY_Ref to break the dep cycle

    // Applies sort when specified
    useEffect(() => {
        if (orderBy) {
            sort(orderBy[0], orderBy[1]);
        }
    }, [orderBy, data, sort]);

    // Sorting applies to the full dataset first; the slice below only affects display.
    const visibleKeysY = useMemo(() => {
        if (!pagination) return keysY_;
        // Infinite scroll accumulates pages instead of replacing them.
        if (infiniteScroll) return keysY_.slice(0, currentPage * pageSize_);
        return keysY_.slice((currentPage - 1) * pageSize_, currentPage * pageSize_);
    }, [keysY_, pagination, infiniteScroll, currentPage, pageSize_]);

    const columnHeaders = useMemo(() => {
        const headers = keysX.map((k) => {
            return <HeaderCell key={k} label={k} toggleOrder={toggleOrder}
                setsOrdering={(orderBy && orderBy[0] == k) ? orderBy[1] : false} />
        });
        headers.unshift(<th key="empty-header" scope="col"></th>)
        return headers;
    }, [keysX, orderBy, toggleOrder]);

    const rows = useMemo(() => {
        const rows_: any[] = [];
        visibleKeysY.forEach((r, i) => {
            rows_.push(<tr key={i}>
                <th scope="row">{r}</th>
                {/* FIX: Removed `key` from props passed to `cellRenderer` to match type definition. */}
                {Array.from(keysX, (v) => {
                    if (Array.isArray(data)) {
                        return cellRenderer({ data: data[Number(r)][v], coords: [r, v] });
                    }
                    return cellRenderer({ data: data[r][v], coords: [r, v] });
                })}
            </tr>)
        });
        return rows_;
    }, [visibleKeysY, keysX, data, cellRenderer]);

    // [DRAFT] Infinite scroll: watches a sentinel below the table and advances one
    // page when it enters the viewport. The last requested page is tracked so that
    // a request for data beyond the loaded pages is only emitted once per boundary.
    const sentinelRef = useRef<HTMLDivElement>(null);
    const lastRequestedPage = useRef(0);

    /**
     * @function advanceInfinite
     * @description Advances to the next page on scroll, or signals demand for
     * not-yet-loaded data through `onPageMove` when the loaded pages are exhausted.
     */
    const advanceInfinite = useCallback(() => {
        const next = currentPage + 1;
        if (currentPage >= pageCount && lastRequestedPage.current >= next) return;
        lastRequestedPage.current = next;
        if (currentPage < pageCount) setPage(next);
        if (onPageMove) onPageMove(next, pageCount);
    }, [currentPage, pageCount, onPageMove]);

    useEffect(() => {
        if (!infiniteScroll || !pagination) return;
        if (typeof IntersectionObserver === 'undefined') return;
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) advanceInfinite();
        });
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [infiniteScroll, pagination, advanceInfinite]);

    const pagerItems = useMemo<ActionBarItemConfig[] | null>(() => {
        if (!pagination) return null;
        // Window of up to 3 page numbers centered on the current page.
        const start = Math.max(1, Math.min(currentPage - 1, pageCount - 2));
        const end = Math.min(pageCount, start + 2);
        const numbers: ActionBarItemConfig[] = [];
        for (let n = start; n <= end; n++) {
            numbers.push({
                item: <Button type={n == currentPage ? 'primary' : 'text'}
                    disabled={n == currentPage}
                    onClick={() => moveToPage(n)}>{n}</Button>,
                position: 'center',
                key: `page-jump-ctrl-${n}`
            });
        }
        return [
            {
                item: <Button type='text' iconName='chevron-left' title='Previous page'
                    disabled={currentPage <= 1}
                    onClick={() => moveToPage(currentPage - 1)} />,
                position: 'center',
                key: 'page-back'
            },
            ...numbers,
            {
                item: <Button type='text' iconName='chevron-right' title='Next page'
                    disabled={currentPage >= pageCount}
                    onClick={() => moveToPage(currentPage + 1)} />,
                position: 'center',
                key: 'page-next'
            }
        ];
    }, [pagination, currentPage, pageCount, moveToPage]);

    const refreshCtrl = useMemo<ActionBarItemConfig | null>(() => {
        if (!refresh) return null;
        return {
            item: <Button type='text' iconName='refresh' title='Refresh' onClick={onRefresh} />,
            position: 'right',
            key: 'table-refresh'
        };
    }, [refresh, onRefresh]);

    const headerBar = useMemo(() => {
        const items: ActionBarItemConfig[] = [];
        if (pagerInHeader && pagerItems) items.push(...pagerItems);
        if (refreshCtrl) items.push(refreshCtrl);
        if (!items.length) return null;
        return <ActionBar className="prismal-table-bar" useAlt={false} items={items} />;
    }, [pagerInHeader, pagerItems, refreshCtrl]);

    const footerBar = useMemo(() => {
        if (!pagerInFooter || !pagerItems) return null;
        return <ActionBar className="prismal-table-bar" useAlt={false} items={pagerItems} />;
    }, [pagerInFooter, pagerItems]);

    const header_ = useMemo(() => {
        if (!header && !headerBar) return null;
        return <div className="prismal-table-header">
            {header}
            {headerBar}
        </div>;
    }, [header, headerBar]);

    const footer_ = useMemo(() => {
        if (!footer && !footerBar) return null;
        return <div className="prismal-table-footer">
            {footerBar}
            {footer}
        </div>;
    }, [footer, footerBar]);

    const rootRef = useRef<HTMLDivElement>(null);

    /*
     * Exposes pagination and sorting control through the forwarded ref,
     * following the same strategy as form inputs (InputRefType).
     */
    useImperativeHandle(ref, () => ({
        isTableRefType: true,
        element: rootRef.current,
        getPage: () => currentPage,
        getPageCount: () => pageCount,
        setPage: moveToPage,
        nextPage: () => moveToPage(currentPage + 1),
        previousPage: () => moveToPage(currentPage - 1),
        getOrder: () => orderBy ?? null,
        setOrder: (keyX: string, order: 'asc' | 'desc' = 'asc') => setOrder([keyX, order])
    }), [currentPage, pageCount, moveToPage, orderBy]);

    let style_: CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (style) style_ = { ...style_, ...style };

    return <div ref={rootRef} style={style_} data-id={dataId} className={className_} >
        {header_}
        <div className="prismal-table-wrapper">
            <table>
                {caption_}
                <thead>
                    <tr>
                        {columnHeaders}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {(infiniteScroll && pagination) ?
                <div ref={sentinelRef} className="prismal-table-scroll-sentinel" aria-hidden="true" />
                : null}
        </div>
        {footer_}
    </div>

});
Table.displayName = 'Table';

export default Table;
