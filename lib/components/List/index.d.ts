import React from 'react';
import './index.scss';
import { ListProcessor } from './page';
import ComponentProps from 'components/Component';
/**
 * [TODO] Add infinity scroll and pagination back-to-top behaviour
 * when moving between pages
 */
export interface ProcessedListProps extends ComponentProps {
    data: any[];
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: React.ReactNode;
    headerClassName?: string;
    footer?: React.ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    listProcessor: ListProcessor;
    onProcessEnd?: (arg: any) => void;
    view?: 'list';
    type: 'process';
    padding?: 's' | 'm' | 'l';
}
export interface RawListProps extends ComponentProps {
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: React.ReactNode;
    headerClassName?: string;
    footer?: React.ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    children: React.ReactNode[];
    view?: 'list';
    type: 'raw';
    padding?: 's' | 'm' | 'l';
}
export type ListProps = ProcessedListProps | RawListProps;
export interface ProcessedGridProps extends ComponentProps {
    data: any[];
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: React.ReactNode;
    headerClassName?: string;
    footer?: React.ReactNode;
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
export interface RawGridProps extends ComponentProps {
    pageSize?: number;
    page?: number;
    infiniteScroll?: boolean;
    header?: React.ReactNode;
    headerClassName?: string;
    footer?: React.ReactNode;
    footerClassName?: string;
    showPageCtrl?: boolean;
    showExtremesCtrl?: boolean;
    children: React.ReactNode[];
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
declare const List: React.FC<ListComponentProps>;
export default List;
