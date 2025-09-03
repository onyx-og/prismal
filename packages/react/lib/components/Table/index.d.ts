import React from "react";
import ComponentProps from "../Component";
import "./index.scss";
export type CellData = React.ReactNode;
export interface TableProps extends ComponentProps {
    data: {
        [keyX: string]: {
            [keyY: string]: CellData;
        };
    };
    caption?: React.ReactNode;
    cellRenderer?: (props: {
        data: CellData;
        mode?: string;
    }) => JSX.Element;
}
declare const Table: (props: TableProps) => import("react/jsx-runtime").JSX.Element;
export default Table;
