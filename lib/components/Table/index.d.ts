import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
export type CellData = string | number | boolean;
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
