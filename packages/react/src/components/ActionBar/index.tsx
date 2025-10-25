import './index.scss';

import {
    forwardRef, ForwardedRef, useRef, useState, useCallback,
    useMemo, Children, useImperativeHandle, 
} from 'react';
// Add type-only import for style typing
import type { CSSProperties } from 'react';
import ActionBarSection from './ActionBarSection';

import { setAccentStyle } from 'utils/colors';
import type { ActionBarItemConfig, ActionBarProps, ActionBarItemWithRefProps, ActionBarRef } from './types';


/**
 * @component ActionBarItemWithRef
 * @description Wraps an ActionBar child to expose its DOM node via ref collection.
 * @param {ActionBarItemWithRefProps} props The wrapper props containing children to render.
 * @param {React.Ref<HTMLDivElement>} ref Forwarded ref to the wrapper div.
 * @returns {JSX.Element} The wrapper element that holds the child.
 * @example
 * <ActionBarItemWithRef>
 *   <button>Click</button>
 * </ActionBarItemWithRef>
 */
const ActionBarItemWithRef = forwardRef<HTMLDivElement, ActionBarItemWithRefProps>((props, ref) => {
    const { children } = props;
    const wrapperProps = {
        className: "prismal-actionbar-child-wref",
    };

    return (
        <div {...wrapperProps} ref={ref}>
            {children}
        </div>
    );
});
ActionBarItemWithRef.displayName = 'ActionBarItemWithRef';


/**
 * @component ActionBar
 * @description A flexible bar for actions and navigation, divided into left, center, and right sections.
 * @param {ActionBarProps} props The component props.
 * @param {React.Ref<ActionBarRef>} ref Forwarded ref to the ActionBar's managed DOM nodes.
 * @returns {JSX.Element} The rendered ActionBar component.
 * @example
 * <ActionBar items={[{ item: <Button>Action</Button>, position: 'right', key: 'action1' }]} />
 */
const ActionBar = forwardRef<ActionBarRef, ActionBarProps>((props, ref) => {
    const {
        items = [],
        children, defaultPosition = "right",
        type = 'default',
        accent, accentLight, accentDark,
        className, style,
        modalAreaId,
        sectionAlt, "data-id": dataId
    } = props;
    let actionBarClass = `prismal-actionbar prismal-actionbar-${type}`;

    let style_: CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (style) style_ = { ...style_, ...style };

    if (className) actionBarClass = `${actionBarClass} ${className}`;

    const lowNode = useRef<HTMLDivElement[]>([]);
    const [lowNodeSet, marklowNodeSet] = useState<boolean>(false);

    const children_ = useMemo(() => {
        return Children.toArray(children);
    }, [children]);

    /**
     * @function childrenRefCollector
     * @description Collects child wrapper DOM nodes and marks completion when the last child mounts.
     * @param {HTMLDivElement | null} node The mounted/unmounted DOM node reference.
     * @param {number} i Index of the child node.
     * @returns {void}
     * @example
     * <ActionBarItemWithRef ref={(node) => childrenRefCollector(node, i)}>{el}</ActionBarItemWithRef>
     */
    const childrenRefCollector = useCallback((node: HTMLDivElement | null, i: number) => {
        if (node) {
            lowNode.current[i] = node;
            if (children_.length - 1 === i) {
                marklowNodeSet(true);
            }
        }
    }, [children_]);

    /**
     * @function processItem
     * @description Filters items for a given section and augments with children placed at the default position.
     * @param {'left'|'center'|'right'} position The target section to process.
     * @returns {ActionBarItemConfig[]} The list of items to render in the section.
     * @example
     * const leftItems = processItem("left");
     */
    const processItem = useCallback((position: ActionBarItemConfig["position"]) => {
        const items_ = items.filter((i) => i?.position === position);
        if (defaultPosition === position && children_.length) {
            const childrenItems: ActionBarItemConfig[] = children_.map((el, i) => {
                return {
                    item: <ActionBarItemWithRef ref={(node) => childrenRefCollector(node, i)}>{el}</ActionBarItemWithRef>,
                    position: position,
                    key: `${position}-${i}`,
                };
            });

            items_.push(...childrenItems);
        }
        return items_;
    }, [items, children_, defaultPosition, childrenRefCollector]);

    const leftItems = useMemo(() => {
        return processItem("left");
    }, [processItem]);

    const centerItems = useMemo(() => {
        return processItem("center");
    }, [processItem]);

    const rightItems = useMemo(() => {
        return processItem("right");
    }, [processItem]);

    const highNode = useRef<HTMLDivElement>(null);
    const [highNodeSet, markhighNodeSet] = useState<boolean>(false);

    /**
     * @function setHighNodeRef
     * @description Sets the top-level DOM node reference once, when the component mounts.
     * @param {HTMLDivElement | null} node The root node reference or null on unmount.
     * @returns {void}
     * @example
     * <div ref={setHighNodeRef} />
     */
    const setHighNodeRef = useCallback((node: HTMLDivElement | null) => {
        if (highNode.current) return;
        if (node) {
            highNode.current = node;
            markhighNodeSet(true);
        }
    }, [markhighNodeSet]);

    useImperativeHandle(ref, () => ({
        lowNode: lowNode.current, // lowest managed DOM node(s)
        highNode: highNode.current, // highest managed DOM node
    }), [highNodeSet, lowNodeSet]);

    return <div data-id={dataId}
        className={actionBarClass}
        style={style_}
        ref={setHighNodeRef}>
        <ActionBarSection modalClassName='section-left-alt' modalAreaId={modalAreaId} 
            altIcon={sectionAlt?.left} type='left' items={leftItems} />
        <ActionBarSection modalClassName='section-center-alt' modalAreaId={modalAreaId}
            altIcon={sectionAlt?.center} type='center' items={centerItems} />
        <ActionBarSection modalClassName='section-right-alt' modalAreaId={modalAreaId}
            altIcon={sectionAlt?.right} type='right' items={rightItems} />
    </div>
});
ActionBar.displayName = 'ActionBar';

export default ActionBar;
export type { ActionBarItemConfig };