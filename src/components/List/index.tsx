import React from 'react';
import './index.scss';
import ActionBar, { ActionBarItemConfig } from 'components/ActionBar';
import Page from './page';

interface ListProps {
    data: any[];
    pageSize: number;
    infiniteScroll?: boolean;
    headerItems?: ActionBarItemConfig[];
    footerItems?: ActionBarItemConfig[];
    listProcessor: (arg: any) => {
        processed?: any;
        elements: JSX.Element[]
    },
    onProcessEnd?: (arg: any) => void;
    // size?: 'm' | 'l';
    type?: 'list' | 'grid';
    padding?: 's' | 'm' | 'l';
    className?: string;
    listClass?: string;
}
const List: React.FC<ListProps> = ( props ) => {
    const { 
        data, pageSize = 24,
        infiniteScroll,
        type = 'list',
        headerItems, footerItems,
        padding = 's',
        listProcessor, onProcessEnd,
        className, listClass
    } = props;

    const useInfinitePages = (
        list: any[],
        pageSize: number,
        listProcessor: (arg: any) => {
            processed?: any;
            elements: JSX.Element[]
        },
        onProcessEnd?: (arg: any) => void
    ) => {
        let pageNumber = Math.ceil(list.length / pageSize);
        let pages: JSX.Element[] = [];
        for ( var i = 0; i < pageNumber; i++ ) {
            let listSubset = list.slice( i * pageSize, i * pageSize + pageSize );
            let page = <Page key={i} list={listSubset} 
                listProcessor={listProcessor}
                onProcessEnd={onProcessEnd}
            />
            pages.push(page)
        }
        return pages
    }

    let _className = `alenite-list ${type}`;
    if (className) _className = `${className} ${_className}`;
    
    let _listClass = `list-wrapper`;
    if (listClass) _listClass = `${listClass} ${_listClass}`;

    return <div className={_className}>
        { headerItems && <ActionBar position="top"
            items={headerItems || []}
        /> }
        <div className={_listClass}>
            <div className={`page-container padding-${padding}`}>
            {/* <div className='columns jcc'> */}
                { infiniteScroll ? 
                    useInfinitePages(
                        data, pageSize,
                        listProcessor, 
                        onProcessEnd
                    ) :
                    <Page list={data} 
                        listProcessor={listProcessor}
                        onProcessEnd={onProcessEnd}
                    />
                }
            </div>
        </div>
        { footerItems && <ActionBar position="bottom"
            items={footerItems}
        /> }
    </div>
}

export default List;