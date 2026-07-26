import { FC, ReactNode } from 'react';
import './index.scss';
import { ListProcessor } from './page';
import ComponentProps from '../Component';
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
    listProcessor: ListProcessor;
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
declare const List: FC<ListComponentProps>;
export default List;
