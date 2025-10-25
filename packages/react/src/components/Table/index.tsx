import {ReactNode, JSX, useMemo, useEffect, useCallback, useState, CSSProperties, FC} from "react";
import ComponentProps from "../Component";

import "./index.scss";
import { setAccentStyle } from "utils/";

/**
 * @typedef {ReactNode} CellData
 * @description The data type for a single cell in the table.
 */
export type CellData = ReactNode;

/**
 * @typedef {object} TableProps
 * @description Props for the Table component.
 * @property {{[keyX: string]: {[keyY: string]: CellData}} | {[keyX: string]: any}[]} data The data for the table, either as an object of objects or an array of objects.
 * @property {ReactNode} [caption] The caption for the table.
 * @property {(props: {data: CellData, mode?: string}) => JSX.Element} [cellRenderer] A function to custom render table cells.
 */
export interface TableProps extends ComponentProps {
    data: {[keyX: string]: {[keyY: string]: CellData}} | {
        [keyX: string]: any;
    }[];
    caption?: ReactNode;
    cellRenderer?: (props: {data: CellData, coords?: [string, string], mode?: string}) => JSX.Element
}

/**
 * @function defaultCellRenderer
 * @description The default renderer for table cells.
 * @param {object} props The props for the cell renderer.
 * @returns {JSX.Element} A table data cell element.
 */
const defaultCellRenderer = (props: {data: CellData, coords?: [string, string], mode?: string}) => {
    const {data, coords} = props;
    const key = `${coords ? coords.concat() : null}`;

    return <td key={key}>{data}</td>
}

/**
 * @typedef {object} HeaderCellProp
 * @description Props for the HeaderCell component.
 * @property {string} label The label for the header cell.
 * @property {(key: string) => void} toggleOrder A function to toggle the sorting order for the column.
 * @property {false | 'asc' | 'desc'} [setsOrdering] The current sorting order of the column.
 */
interface HeaderCellProp {
    label: string;
    toggleOrder: (key: string) => void;
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

    return <th className={className} onClick={()=>toggleOrder(label)} scope="col">{label}</th>
}

/**
 * @component Table
 * @description A component to display data in a sortable table.
 * @param {TableProps} props The component props.
 * @returns {React.ReactElement} The rendered Table component.
 * @example
 * <Table data={[{ id: 1, name: 'Item 1' }]} caption="My Table" />
 */
const Table: FC<TableProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        data, caption,
        cellRenderer = defaultCellRenderer
    } = props;

    let className_ = `prismal-table-container`; 
    if ( className ) className_ = `${className_} ${className}`;

    const caption_ = useMemo(() => {
        if (caption) {
            return <caption>
                {caption}
            </caption>
        }
        return null;
    },[caption]);

    const keysX = useMemo(()=> {
        let keys: {[key: string]: null} = {};
        Object.values(data).forEach(v => {
            Object.keys(v).forEach(k => keys[k] = null)
        })
        const keys_ = Object.keys(keys);
        return keys_;
    },[data]);

   const [keysY_, setKeysY] = useState(Object.keys(data));

    useEffect(() => {
        setKeysY(Object.keys(data));
    }, [data]);

    const [orderBy, setOrder] = useState<[string, 'asc' | 'desc'] | null>();

    /**
     * @function toggleOrder
     * @description Toggles the sorting order for a given column key.
     * @param {string} keyX The key of the column to sort.
     */
    const toggleOrder = useCallback( (keyX: string) => {
        if (orderBy && orderBy[0] == keyX) {
            if (orderBy[1] ==  'asc') setOrder([keyX, 'desc']);
            else setOrder([keyX, 'asc']);
        } else setOrder([keyX, 'asc']);
    },[orderBy]);

    /**
     * @function sort
     * @description Sorts the table data based on a column key and sort order.
     * @param {string} keyX The key of the column to sort by.
     * @param {'asc' | 'desc'} [sortOrder='asc'] The sort order.
     */
    const sort = useCallback((keyX: string, sortOrder: 'asc' | 'desc' = 'asc') => {
        let orderedList: [string, CellData][] = []
        for (const i of keysY_) {
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
    },[data, keysY_]);

    // Applies sort when specified
    useEffect(() => {
        if (orderBy) {
            sort(orderBy[0], orderBy[1]);
        }
    },[orderBy, data, sort]);

    const columnHeaders = useMemo(()=> {
        const headers = keysX.map((k) => {
            return <HeaderCell key={k} label={k} toggleOrder={toggleOrder} 
                setsOrdering={(orderBy && orderBy[0] == k) ? orderBy[1] : false}/>
        });
        headers.unshift(<th key="empty-header" scope="col"></th>)
        return headers;
    },[keysX, orderBy, toggleOrder]);

    const rows = useMemo(()=> {
        const rows_: any[] = [];
        keysY_.forEach((r, i) => {
            rows_.push(<tr key={i}>
                <th scope="row">{r}</th>
                {/* FIX: Removed `key` from props passed to `cellRenderer` to match type definition. */}
                {Array.from(keysX, (v) => {
                    if (Array.isArray(data)) {
                        return cellRenderer({data: data[Number(r)][v], coords: [r, v]});
                    }
                    return cellRenderer({data: data[r][v], coords: [r, v]});
                })}
            </tr>)
        });
        return rows_;
    },[keysY_, keysX, data, cellRenderer]);

    let style_: CSSProperties = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    return <div style={style_} data-id={dataId} className={className_} >
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
    </div>

}
export default Table;