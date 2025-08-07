import React from 'react';
export type ListProcessor = (arg: any[]) => {
    processed?: any[];
    elements: React.ReactNode[];
};
export interface PageProps {
    list: any[];
    listProcessor: ListProcessor;
    onProcessEnd?: (arg: any) => void;
}
declare const Page: React.FC<PageProps>;
export default Page;
