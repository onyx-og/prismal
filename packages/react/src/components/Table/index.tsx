import {ReactNode, JSX, useMemo, useEffect, useCallback, useState, CSSProperties} from "react";
import ComponentProps from "../Component";

import "./index.scss";
import { setAccentStyle } from "utils/";

export type CellData = ReactNode;
export interface TableProps extends ComponentProps {
    data: {[keyX: string]: {[keyY: string]: CellData}} | {
        [keyX: string]: any;
    }[];
    caption?: ReactNode;
    cellRenderer?: (props: {data: CellData, mode?: string}) => JSX.Element
}

const defaultCellRenderer = (props: {data: CellData, coords?: [string, string], mode?: string}) => {
    const {data, coords, mode} = props;
    const key = `${coords ? coords.concat() : null}`;

    return <td key={key}>{data}</td>
}

interface HeaderCellProp {
    label: string;
    toggleOrder: (key: string) => void;
    setsOrdering?: false | 'asc' | 'desc';
}
const HeaderCell = (props: HeaderCellProp) => {
    const { toggleOrder, label, setsOrdering } = props;
    let className = "prismal-table-header-cell";
    if (setsOrdering) {
        className = `${className} prismal-table-header-cell-${setsOrdering}`;
    }

    return <th className={className} onClick={()=>toggleOrder(label)} scope="col">{label}</th>
}
const Table = (props: TableProps) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
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
    },[]);

    // const keysY = useMemo(()=> {
    //     let keys = Object.keys(data);
    //     if (setKeysY) {
    //         setKeysY(keys);
    //     };
    //     return keys;
    // },[data]);

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

    // Defines sorting params
    const toggleOrder = useCallback( (keyX: string) => {
        if (orderBy && orderBy[0] == keyX) {
            if (orderBy[1] ==  'asc') setOrder([keyX, 'desc']);
            else setOrder([keyX, 'asc']);
        } else setOrder([keyX, 'asc']);
    },[orderBy]);

    // Applies sort when specified
    useEffect(() => {
        if (orderBy) {
            sort(orderBy[0], orderBy[1]);
        }
    },[orderBy, data]);

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
    },[data, keysY_, keysX]);

    const columnHeaders = useMemo(()=> {
        const headers = keysX.map((k) => {
            return <HeaderCell label={k} toggleOrder={toggleOrder} 
                setsOrdering={(orderBy && orderBy[0] == k) ? orderBy[1] : false}/>
        });
        headers.unshift(<th scope="col"></th>)
        return headers;
    },[keysX, orderBy]);

    const rows = useMemo(()=> {
        const rows_: any[] = [];
        keysY_.forEach((r, i) => {
            rows_.push(<tr key={i}>
                <th scope="row">{r}</th>
                {Array.from(keysX, (v, key) => {
                    if (Array.isArray(data)) {
                        return cellRenderer({data: data[Number(r)][v], coords: [r, v]});
                    }
                    return cellRenderer({data: data[r][v], coords: [r, v]});
                })}
            </tr>)
        });
        return rows_;
    },[keysY_, keysX, data]);

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
            {/* [TODO] <tfoot>
                <tr>
                    <th scope="row" colSpan={2}>Average age</th>
                    <td>33</td>
                </tr>
            </tfoot> */}
        </table>
    </div>

}
export default Table;