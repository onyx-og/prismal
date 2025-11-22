import { useState, useImperativeHandle, ReactNode, forwardRef, ForwardedRef, useRef, RefObject } from 'react';


/**
 * @typedef {object} MasonryItemRef
 * @description The ref object exposed by a MasonryItem, allowing the parent to apply styles.
 */
export interface MasonryItemRef {
    /** A function to apply CSS styles to the item. */
    applyStyle: (style: { [key: string]: any }) => void;
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
// 'forwardRef' is necessary to allow the parent component (MasonryGrid) 
// to get a reference to the DOM of this element.
const MasonryItem = forwardRef((props: { children: ReactNode }, ref: ForwardedRef<MasonryItemRef>) => {
    const { children } = props;
    // 1. State to store the calculated style
    const [itemStyle, setItemStyle] = useState({});
    const elementRef = useRef(null);
    // 2. Expose the 'applyStyle' function through the ref
    // This function will be called by the useMasonryGrid Hook
    useImperativeHandle(ref, () => ({
        element: elementRef,
        // The outer component can call itemRef.current.applyStyle({...})
        applyStyle: (newStyle) => {
            setItemStyle(newStyle);
        }
    }));

    // Apply the stored style to the outer div
    return <div
        className="prismal-masonry-item"
        ref={elementRef} // The ref points to the DOM element we want to measure
        style={itemStyle} // The style is applied via React state
    >
        {children}
    </div>
});
MasonryItem.displayName = "MasonryItem";
export default MasonryItem;