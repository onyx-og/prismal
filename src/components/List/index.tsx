import React from 'react';
import './index.scss';
import Page from './page';
import ActionBar from "components/ActionBar";
import Button from 'components/Button';

export interface ListProps {
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
    listProcessor: (arg: any[]) => {
        processed?: any;
        elements: JSX.Element[]
    },
    onProcessEnd?: (arg: any) => void;
    type?: 'list' | 'grid';
    padding?: 's' | 'm' | 'l';
}
const List: React.FC<ListProps> = ( props ) => {
    const { 
        data, pageSize = 24,
        page = 1,
        header,
        headerClassName,
        footer,
        footerClassName,
        showPageCtrl = true,
        showExtremesCtrl = false,
        type = 'list',
        padding = 's',
        listProcessor, onProcessEnd,
    } = props;

    const [currentPage, setPage] = React.useState<number>(page);

    React.useEffect(() => {
        setPage(page);
    },[page]);

    const listSubSet = React.useMemo(() => {
        let subset = data.slice( currentPage * pageSize - pageSize, currentPage * pageSize );
        return subset;
    }, [data, currentPage, pageSize]);
    
    let listClass = `prismal-list prismal-list-type-${type}`,
    listWrapprerClass = `prismal-list-wrapper`;

    let headerClassName_ = "prismal-list-header";
    if (headerClassName) headerClassName_ = `${headerClassName_} ${headerClassName}`;
    let footerClassName_ = "prismal-list-footer";
    if (footerClassName) footerClassName_ = `${footerClassName_} ${footerClassName}`;

    const pageBackwards = React.useCallback(() => {
        setPage(currentPage-1);
    },[setPage, currentPage]);

    const pageForward = React.useCallback(() => {
        setPage(currentPage+1);
    },[setPage, currentPage]);

    const lastPage = React.useMemo(() => {
        return Math.ceil(data.length / pageSize)
    },[data.length,pageSize]);

    const pageJumpCtrl = React.useMemo(() => {
        let numbers_ = Array(lastPage);
        for (let i = 1; i <= lastPage; i++) {
            numbers_[i-1] = i;
        }
        if (currentPage==1) {
            numbers_ = numbers_.slice(0, 0 + 3)
        } else if (currentPage == lastPage) {
            numbers_ = numbers_.slice(lastPage - 3, lastPage);
        } else {
            numbers_ = numbers_.slice(currentPage - 2, currentPage + 1)
        }
        numbers_ = numbers_.map((n) => 
            <Button type={n==currentPage ? 'primary' : 'text'} onClick={()=>setPage(n)} disabled={n==currentPage}>{n}</Button>
        )
        return numbers_;
    },[showExtremesCtrl, lastPage, currentPage]);

    const leftExtreme = React.useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                <Button type='text' disabled={currentPage==1} onClick={()=>setPage(1)}>First</Button>
                {/* <Button type='text' disabled={true}>...</Button> */}
            </>
        }
    },[showExtremesCtrl,currentPage,lastPage]);

    const rightExtreme = React.useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                {/* <Button type='text' disabled={true}>...</Button> */}
                <Button type='text' disabled={currentPage==lastPage} onClick={()=>setPage(lastPage)}>Last</Button>
            </>
        }
    },[showExtremesCtrl,currentPage,lastPage]);

    const component = React.useMemo(() => {
        return <div className={listClass}>
            <div className={headerClassName_}>{header}</div>
            <div className={listWrapprerClass}>
                <div className={`prismal-page-container padding-${padding}`}>
                    <Page list={listSubSet} 
                        listProcessor={listProcessor}
                        onProcessEnd={onProcessEnd}
                    />
                </div>
            </div>
            <div className={footerClassName_}>
                {showPageCtrl ? <ActionBar items={[
                    { item: <>{leftExtreme}</>, position: "left", key: "leftExtreme"},
                    { item: <Button onClick={pageBackwards} disabled={currentPage==1}>Back</Button>, position: "left", key: "back"},
                    { item: <>{pageJumpCtrl}</>, position:"center", key: "pageJumpCtrl"},
                    { item: <Button onClick={pageForward} disabled={currentPage==lastPage}>Next</Button>, position: "right", key: "next"},
                    { item: <>{rightExtreme}</>, position: "right", key: "rightExtrme"}
                ]} position='bottom' /> : <></>}
                {footer}
            </div>
        </div>
    },[currentPage]);

    return component;
}

export default List;