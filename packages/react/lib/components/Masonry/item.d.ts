import { ReactNode, RefObject } from 'react';
export interface MasonryItemRef {
    applyStyle: (style: {
        [key: string]: any;
    }) => void;
    element: RefObject<HTMLDivElement | null>;
}
declare const MasonryItem: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
} & import("react").RefAttributes<MasonryItemRef>>;
export default MasonryItem;
