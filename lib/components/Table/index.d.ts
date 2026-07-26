import { ReactNode, JSX, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {ReactNode} CellData
 * @description The data type for a single cell in the table.
 */
export type CellData = ReactNode;
/**
 * @typedef {object} TableProps
 * @description Props for the Table component.
 */
export interface TableProps extends ComponentProps {
    /** The data for the table, either as an object of objects or an array of objects. */
    data: {
        [keyX: string]: {
            [keyY: string]: CellData;
        };
    } | {
        [keyX: string]: any;
    }[];
    /** The caption for the table. */
    caption?: ReactNode;
    /** A function to custom render table cells. */
    cellRenderer?: (props: {
        data: CellData;
        coords?: [string, string];
        mode?: string;
    }) => JSX.Element;
}
/**
 * @component Table
 * @description A component to display data in a sortable table.
 * @param {TableProps} props The component props.
 * @returns {React.ReactElement} The rendered Table component.
 * @example
 * <Table data={[{ id: 1, name: 'Item 1' }]} caption="My Table" />
 */
declare const Table: FC<TableProps>;
export default Table;
