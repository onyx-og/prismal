import React from 'react';

/**
 * @typedef {function} ListProcessor
 * @description A function that processes a list of items and returns renderable elements.
 */
export type ListProcessor = (
    /** The array of items to process. */
    arg: any[]
) => {
    /** An object containing the processed data and the elements to render. */
    processed?: any[];
    elements: React.ReactNode[]
}

/**
 * @typedef {object} PageProps
 * @description Props for the Page component.
 */
export interface PageProps {
    /** The list of items for the current page. */
    list: any[];
    /** The function to process and render the items. */
    listProcessor: ListProcessor;
    /** Callback fired after processing is complete. */
    onProcessEnd?: (arg: any) => void;
}

/**
 * @component Page
 * @description A component that represents a single page of items within a List, processed and rendered by a listProcessor.
 * @param {PageProps} props The component props.
 * @returns {React.ReactElement} The rendered page content.
 * @example
 * <Page list={[1, 2, 3]} listProcessor={(items) => ({ elements: items.map(i => <div>{i}</div>) })} />
 */
const Page: React.FC<PageProps> = (props) => {
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