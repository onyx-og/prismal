import { ReactNode, RefObject } from 'react';
/**
 * @typedef {object} MasonryItemRef
 * @description The ref object exposed by a MasonryItem, allowing the parent to apply styles.
 * @property {(style: {[key: string]: any}) => void} applyStyle A function to apply CSS styles to the item.
 * @property {RefObject<HTMLDivElement | null>} element Ref to the item's root DOM element.
 */
export interface MasonryItemRef {
    applyStyle: (style: {
        [key: string]: any;
    }) => void;
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
