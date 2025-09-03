import React from 'react';

export type ListProcessor = (arg: any[]) => {
    processed?: any[];
    elements: React.ReactNode[]
}

export interface PageProps {
    list: any[];
    listProcessor: ListProcessor;
    onProcessEnd?: (arg: any) => void;
}
const Page: React.FC<PageProps> = ( props ) => {
    const {
        list, listProcessor, onProcessEnd
    } = props;

    const { processed, elements } = listProcessor(list);

    // When provided execute a callback after executing listProcessor
    if (onProcessEnd && processed) onProcessEnd(processed);

    return <>
        {elements}
    </>
}

export default Page;