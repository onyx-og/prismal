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
 * @property {any[]} data The array of data to be processed and displayed.
 * @property {number} [pageSize] The number of items to display per page.
 * @property {number} [page] The initial page number.
 * @property {boolean} [infiniteScroll] If true, enables infinite scrolling.
 * @property {ReactNode} [header] Content to display above the list.
 * @property {string} [headerClassName] CSS class for the header.
 * @property {ReactNode} [footer] Content to display below the list.
 * @property {string} [footerClassName] CSS class for the footer.
 * @property {boolean} [showPageCtrl] If true, shows pagination controls.
 * @property {boolean} [showExtremesCtrl] If true, shows first/last page controls.
 * @property {ListProcessor} listProcessor A function to process and render list items.
 * @property {(arg: any) => void} [onProcessEnd] Callback fired after data processing.
 * @property {'list'} [view] The view type.
 * @property {'process'} type The list type.
 * @property {'s' | 'm' | 'l'} [padding] The padding size for the list.
 */
export interface ProcessedListProps extends ComponentProps {
    data: any[];
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: ReactNode;
    headerClassName?: string;
    footer?: ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    listProcessor: ListProcessor;
    onProcessEnd?: (arg: any) => void;
    view?: 'list';
    type: 'process';
    padding?: 's' | 'm' | 'l';
}
/**
 * @typedef {object} RawListProps
 * @description Props for a List component that displays raw children.
 * @property {number} [pageSize] The number of items to display per page.
 * @property {number} [page] The initial page number.
 * @property {boolean} [infiniteScroll] If true, enables infinite scrolling.
 * @property {ReactNode} [header] Content to display above the list.
 * @property {string} [headerClassName] CSS class for the header.
 * @property {ReactNode} [footer] Content to display below the list.
 * @property {string} [footerClassName] CSS class for the footer.
 * @property {boolean} [showPageCtrl] If true, shows pagination controls.
 * @property {boolean} [showExtremesCtrl] If true, shows first/last page controls.
 * @property {ReactNode[]} children The array of nodes to display.
 * @property {'list'} [view] The view type.
 * @property {'raw'} type The list type.
 * @property {'s' | 'm' | 'l'} [padding] The padding size for the list.
 */
export interface RawListProps extends ComponentProps {
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: ReactNode;
    headerClassName?: string;
    footer?: ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    children: ReactNode[];
    view?: 'list';
    type: 'raw';
    padding?: 's' | 'm' | 'l';
}
export type ListProps = ProcessedListProps | RawListProps;
/**
 * @typedef {object} ProcessedGridProps
 * @description Props for a Grid component that processes data.
 * @property {any[]} data The array of data to be processed and displayed.
 * @property {number} [pageSize] The number of items to display per page.
 * @property {number} [page] The initial page number.
 * @property {boolean} [infiniteScroll] If true, enables infinite scrolling.
 * @property {ReactNode} [header] Content to display above the grid.
 * @property {string} [headerClassName] CSS class for the header.
 * @property {ReactNode} [footer] Content to display below the grid.
 * @property {string} [footerClassName] CSS class for the footer.
 * @property {boolean} [showPageCtrl] If true, shows pagination controls.
 * @property {boolean} [showExtremesCtrl] If true, shows first/last page controls.
 * @property {ListProcessor} listProcessor A function to process and render grid items.
 * @property {(arg: any) => void} [onProcessEnd] Callback fired after data processing.
 * @property {'grid'} [view] The view type.
 * @property {'process'} type The list type.
 * @property {'s' | 'm' | 'l'} [padding] The padding size for the grid.
 * @property {number} [cols] The number of columns in the grid.
 * @property {number} [xsCols] The number of columns for extra small screens.
 * @property {number} [smCols] The number of columns for small screens.
 * @property {number} [mdCols] The number of columns for medium screens.
 * @property {number} [lgCols] The number of columns for large screens.
 * @property {number} [xlCols] The number of columns for extra large screens.
 */
export interface ProcessedGridProps extends ComponentProps {
    data: any[];
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: ReactNode;
    headerClassName?: string;
    footer?: ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    listProcessor: ListProcessor;
    onProcessEnd?: (arg: any) => void;
    view?: 'grid';
    type: 'process';
    padding?: 's' | 'm' | 'l';
    cols?: number;
    xsCols?: number;
    smCols?: number;
    mdCols?: number;
    lgCols?: number;
    xlCols?: number;
}
/**
 * @typedef {object} RawGridProps
 * @description Props for a Grid component that displays raw children.
 * @property {number} [pageSize] The number of items to display per page.
 * @property {number} [page] The initial page number.
 * @property {boolean} [infiniteScroll] If true, enables infinite scrolling.
 * @property {ReactNode} [header] Content to display above the grid.
 * @property {string} [headerClassName] CSS class for the header.
 * @property {ReactNode} [footer] Content to display below the grid.
 * @property {string} [footerClassName] CSS class for the footer.
 * @property {boolean} [showPageCtrl] If true, shows pagination controls.
 * @property {boolean} [showExtremesCtrl] If true, shows first/last page controls.
 * @property {ReactNode[]} children The array of nodes to display.
 * @property {'grid'} [view] The view type.
 * @property {'raw'} type The list type.
 * @property {'s' | 'm' | 'l'} [padding] The padding size for the grid.
 * @property {number} [cols] The number of columns in the grid.
 * @property {number} [xsCols] The number of columns for extra small screens.
 * @property {number} [smCols] The number of columns for small screens.
 * @property {number} [mdCols] The number of columns for medium screens.
 * @property {number} [lgCols] The number of columns for large screens.
 * @property {number} [xlCols] The number of columns for extra large screens.
 */
export interface RawGridProps extends ComponentProps {
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: ReactNode;
    headerClassName?: string;
    footer?: ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    children: ReactNode[];
    view?: 'grid';
    type: 'raw';
    padding?: 's' | 'm' | 'l';
    cols?: number;
    xsCols?: number;
    smCols?: number;
    mdCols?: number;
    lgCols?: number;
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
