import React from 'react';
interface PageProps {
    list: any[];
    listProcessor: (arg: any) => {
        processed?: any;
        elements: JSX.Element[];
    };
    onProcessEnd?: (arg: any) => void;
}
declare const Page: React.FC<PageProps>;
export default Page;
