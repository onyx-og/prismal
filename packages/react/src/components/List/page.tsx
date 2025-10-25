import React from 'react';

/**
 * @typedef {function} ListProcessor
 * @description A function that processes a list of items and returns renderable elements.
 * @param {any[]} arg The array of items to process.
 * @returns {{processed?: any[], elements: React.ReactNode[]}} An object containing the processed data and the elements to render.
 */
export type ListProcessor = (arg: any[]) => {
    processed?: any[];
    elements: React.ReactNode[]
}

/**
 * @typedef {object} PageProps
 * @description Props for the Page component.
 * @property {any[]} list The list of items for the current page.
 * @property {ListProcessor} listProcessor The function to process and render the items.
 * @property {(arg: any) => void} [onProcessEnd] Callback fired after processing is complete.
 */
export interface PageProps {
    list: any[];
    listProcessor: ListProcessor;
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