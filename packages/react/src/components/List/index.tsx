import {FC, JSX, ReactNode,useState, useMemo, useCallback, useEffect} from 'react';
import './index.scss';
import Page, { ListProcessor } from './page';
import ComponentProps from '../Component';
import ActionBar, { ActionBarItemConfig } from "../ActionBar";
import Button from '../Button';
import { setAccentStyle } from 'utils/colors';

/**
 * [TODO] Add infinity scroll and pagination back-to-top behaviour
 * when moving between pages
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
    listProcessor: ListProcessor,
    onProcessEnd?: (arg: any) => void;
    view?: 'list';
    type: 'process';
    padding?: 's' | 'm' | 'l';
}

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

const List: FC<ListComponentProps> = ( props ) => {
    const {
        "data-id": dataId,
        pageSize = 24,
        page = 1,
        header,
        headerClassName,
        footer,
        footerClassName,
        showPageCtrl = true,
        showExtremesCtrl = false,
        view = 'list',
        type = 'raw',
        padding = 's',
    } = props;

    const {
        className,
        accent, accentLight, accentDark
    } = props;

    let className_ = `prismal-list prismal-list-type-${view}`;
    if (className) className_ = `${className_} ${className}`;

    let style = setAccentStyle({}, {accent, accentLight, accentDark});

    if (props.view == 'grid') {
        const {
            cols = 4, 
            xlCols = cols, 
            lgCols = xlCols-1 > 0 ? xlCols-1 : 1,
            mdCols = lgCols-1 > 0 ? lgCols-1 : 1, 
            smCols = mdCols-1 > 0 ? mdCols-1 : 1,
            xsCols = smCols-1 > 0 ? smCols-1 : 1, 
        } = props;

        style["--grid-colums-xs"] = xsCols;
        style["--grid-colums-sm"] = smCols;
        style["--grid-colums-md"] = mdCols;
        style["--grid-colums-lg"] = lgCols;
        style["--grid-colums-xl"] = xlCols;
        style["--grid-colums"] = cols;
    }

    const [currentPage, setPage] = useState<number>(page);

    useEffect(() => {
        setPage(page);
    },[page]);

    const data = useMemo(() => {
        let res: any[] | ReactNode[];
        if (props.type == "raw") {
            res = props.children;
        } else {
            res = props.data;
        }
        return res;
    }, [props.type]);

    const listSubSet = useMemo(() => {
        if (pageSize) {
            let subset = data.slice( currentPage * pageSize - pageSize, currentPage * pageSize );
            return subset;
        }
        return data;
    }, [data, currentPage, pageSize]);
    
    let listWrapperClass = `prismal-list-wrapper`;

    let listProcessor_: ListProcessor,
        onProcessEnd_: ((arg: any) => void) | undefined;

    if (props.type == "process") {
        const { listProcessor, onProcessEnd } = props;
        listProcessor_ = listProcessor;
        onProcessEnd_ = onProcessEnd;
    } else {
        listProcessor_ = (elements) => {
            return {
                elements: elements
            }
        }
    }

    const pageContainer = useMemo(() => {
        return <div className={listWrapperClass}>
            <div className={`prismal-page-container padding-${padding}`}>
                <Page list={listSubSet} 
                    listProcessor={listProcessor_}
                    onProcessEnd={onProcessEnd_}
                />
            </div>
        </div>
    },[listWrapperClass, padding, listSubSet, listProcessor_, onProcessEnd_]);

    let headerClassName_ = "prismal-list-header";
    if (headerClassName) headerClassName_ = `${headerClassName_} ${headerClassName}`;
    let footerClassName_ = "prismal-list-footer";
    if (footerClassName) footerClassName_ = `${footerClassName_} ${footerClassName}`;

    const header_ = useMemo(() => {
        return <div className={headerClassName_}>{header}</div>
    },[header, headerClassName]);

    const pageBackwards = useCallback(() => {
        setPage(currentPage-1);
    },[setPage, currentPage]);

    const pageForward = useCallback(() => {
        setPage(currentPage+1);
    },[setPage, currentPage]);

    const lastPage = useMemo(() => {
        if (pageSize) {
            return Math.ceil(data.length / pageSize);
        } else return 1;
    },[data.length,pageSize]);

    const pageJumpCtrl: ActionBarItemConfig[] = useMemo(() => {
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
        const result: ActionBarItemConfig[] = numbers_.map((n, i) => {
            return {
                item: <Button key={n} type={n==currentPage ? 'primary' : 'text'} onClick={()=>setPage(n)} disabled={n==currentPage}>{n}</Button>,
                position: 'center',
                key: `page-jump-ctrl-${i}`
            }
                
        })
        return result;
    },[showExtremesCtrl, lastPage, currentPage]);

    const leftExtreme = useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                <Button type='text' disabled={currentPage==1} onClick={()=>setPage(1)}>First</Button>
                {/* <Button type='text' disabled={true}>...</Button> */}
            </>
        }
    },[showExtremesCtrl,currentPage,lastPage]);

    const rightExtreme = useMemo(() => {
        if (showExtremesCtrl) {
            return <>
                {/* <Button type='text' disabled={true}>...</Button> */}
                <Button type='text' disabled={currentPage==lastPage} onClick={()=>setPage(lastPage)}>Last</Button>
            </>
        }
    },[showExtremesCtrl,currentPage,lastPage]);

    const pageCtrl = useMemo(() => {
        return <ActionBar items={[
            { item: <>{leftExtreme}</>, position: "left", key: "leftExtreme"},
            { item: <Button key={"backwards"} onClick={pageBackwards} disabled={currentPage==1}>Back</Button>, position: "left", key: "back"},
            ...pageJumpCtrl,
            { item: <Button key={"forward"} onClick={pageForward} disabled={currentPage==lastPage}>Next</Button>, position: "right", key: "next"},
            { item: <>{rightExtreme}</>, position: "right", key: "rightExtrme"}
        ]} />
    },[leftExtreme,pageBackwards,currentPage,pageJumpCtrl,pageForward,lastPage,rightExtreme]);

    const footer_ = useMemo(() => {
        return <div className={footerClassName_}>
            {showPageCtrl ? pageCtrl : <></>}
            {footer}
        </div>
    },[showPageCtrl, footerClassName_, pageCtrl, footer])

    const component = useMemo(() => {
        return <div data-id={dataId} className={className_} style={style}>
            {header_}
            {pageContainer}
            {footer_}
        </div>
    },[dataId, pageContainer,header_, style, className_, footer_]);

    return component;
}

export default List;