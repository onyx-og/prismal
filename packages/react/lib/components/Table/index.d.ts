import { ReactNode, JSX } from "react";
import ComponentProps from "../Component";
import "./index.scss";
export type CellData = ReactNode;
export interface TableProps extends ComponentProps {
    data: {
        [keyX: string]: {
            [keyY: string]: CellData;
        };
    } | {
        [keyX: string]: any;
    }[];
    caption?: ReactNode;
    cellRenderer?: (props: {
        data: CellData;
        mode?: string;
    }) => JSX.Element;
}
declare const Table: (props: TableProps) => import("react/jsx-runtime").JSX.Element;
export default Table;
