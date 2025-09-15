import './index.scss';

import {
    forwardRef, ForwardedRef, useRef, useState, useCallback,
    useMemo, Children, useImperativeHandle, 
} from 'react';
import ActionBarSection from './ActionBarSection';

import { setAccentStyle } from 'utils/colors';
import type { ActionBarItemConfig, ActionBarProps, ActionBarItemWithRefProps, ActionBarRef } from './types';


const ActionBarItemWithRef = forwardRef((props: ActionBarItemWithRefProps, ref: ForwardedRef<HTMLDivElement>) => {
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

const ActionBar = forwardRef((props: ActionBarProps, ref:  ForwardedRef<ActionBarRef>) => {
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

    // const actionBarRef = useRef<HTMLDivElement>(null);
    // console.log("Got actionbar ref", actionBarRef);
    let style_: { [key: string]: any } = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (style) style_ = { ...style_, ...style };

    if (className) actionBarClass = `${actionBarClass} ${className}`;

    const lowNode = useRef<HTMLDivElement[]>([]);
    const [lowNodeSet, marklowNodeSet] = useState<boolean>(false);

    const children_ = useMemo(() => {
        return Children.toArray(children);
    }, [children]);

    const childrenRefCollector = useCallback((node: HTMLDivElement | null, i: number) => {
        if (node) {
            lowNode.current[i] = node;
            if (children_.length-1 == i)  {
                marklowNodeSet(true)
            }
        }
    }, [children_]);

    const processItem = useCallback((position: ActionBarItemConfig["position"]) => {
        const items_ = items.filter((i) =>
            i?.position == position
        );
        if (defaultPosition == position && children_.length) {
            let childrenItems: ActionBarItemConfig[] = children_.map((el, i) => {
                return {
                    item: <ActionBarItemWithRef ref={(node) => childrenRefCollector(node,i)}>{el}</ActionBarItemWithRef>,
                    position: position,
                    key: `${position}-${i}`,
                }
            })

            items_.push(...childrenItems);
        }
        return items_;
    }, [items, children, defaultPosition]);

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

    const setHighNodeRef = useCallback((node: HTMLDivElement) => {
        if (highNode.current) {
            return;
        }
        if (node) {
            highNode.current = node;
            markhighNodeSet(true);
        }
    }, []);

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

export default ActionBar;
export type { ActionBarItemConfig };