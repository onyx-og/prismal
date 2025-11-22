import { ReactNode, RefObject } from 'react';
/**
 * @typedef {object} MasonryItemRef
 * @description The ref object exposed by a MasonryItem, allowing the parent to apply styles.
 */
export interface MasonryItemRef {
    /** A function to apply CSS styles to the item. */
    applyStyle: (style: {
        [key: string]: any;
    }) => void;
    /** Ref to the item's root DOM element. */
    element: RefObject<HTMLDivElement | null>;
}
/**
 * @component MasonryItem
 * @description An individual item within a Masonry layout, which can have its style dynamically applied by the parent.
 * @param {{ children: ReactNode }} props The component props.
 * @param {ForwardedRef<MasonryItemRef>} ref The forwarded ref.
 * @returns {React.ReactElement} The rendered masonry item.
 */
declare const MasonryItem: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
} & import("react").RefAttributes<MasonryItemRef>>;
export default MasonryItem;
