import React from 'react';
import './index.scss';
import { ActionBarItemConfig } from 'components/ActionBar';
interface ListProps {
    data: any[];
    pageSize: number;
    infiniteScroll?: boolean;
    headerItems?: ActionBarItemConfig[];
    footerItems?: ActionBarItemConfig[];
    listProcessor: (arg: any) => {
        processed?: any;
        elements: JSX.Element[];
    };
    onProcessEnd?: (arg: any) => void;
    type?: 'list' | 'grid';
    padding?: 's' | 'm' | 'l';
    className?: string;
    listClass?: string;
}
declare const List: React.FC<ListProps>;
export default List;
