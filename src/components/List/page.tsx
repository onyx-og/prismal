import React from 'react';

interface PageProps {
    list: any[];
    listProcessor: (arg: any) => {
        processed?: any;
        elements: JSX.Element[]
    };
    onProcessEnd?: (arg: any) => void;
}
const Page: React.FC<PageProps> = ( props ) => {
    const { list, listProcessor, onProcessEnd
    } = props;

    const { processed, elements } = listProcessor(list);

    // When provided execute a callback after executing listProcessor
    if (onProcessEnd) onProcessEnd(processed);

    return <>
        {elements}
    </>
}

export default Page;