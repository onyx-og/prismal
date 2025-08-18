import './index.scss';

import React from 'react';
import ActionBarSection from './ActionBarSection';

import { setAccentStyle } from 'utils/colors';
import type { ActionBarItemConfig, ActionBarProps } from './types';

const ActionBar = ( props: ActionBarProps ) => {
    const { 
        items = [],
        children, defaultPosition = "right",
        type = 'default',
        accent, accentLight, accentDark,
        className, style,
        modalAreaId,
        sectionAlt
    } = props;
    let actionBarClass = `prismal-actionbar prismal-actionbar-${type}`;

    // const actionBarRef = React.useRef<HTMLDivElement>(null);
    // console.log("Got actionbar ref", actionBarRef);
    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};
    
    if (className) actionBarClass = `${actionBarClass} ${className}`;

    const processItem = React.useCallback((position: ActionBarItemConfig["position"]) => {
        const items_ = items.filter((i) =>
            i?.position == position
        );
        if (defaultPosition == position && children?.length) {
            let children_ = React.Children.toArray(children);
            let childrenItems: ActionBarItemConfig[] = children_.map((el, i) => {
                return {
                    item: el,
                    position: position,
                    key: `${position}-${i}`,
                }
            })

            items_.push(...childrenItems);
        }
        return items_;
    },[items, children, defaultPosition]);

    const leftItems = React.useMemo(() => {
        return processItem("left");
    },[processItem]);

    const centerItems = React.useMemo(() => {
        return processItem("center");
    },[processItem]);

    const rightItems = React.useMemo(() => {
        return processItem("right");
    },[processItem]);

    return (
        <div
            className={actionBarClass}
            style={style_}
        >
            <ActionBarSection modalAreaId={modalAreaId} altIcon={sectionAlt?.left} type='left' items={leftItems} />
            <ActionBarSection modalAreaId={modalAreaId} altIcon={sectionAlt?.center} type='center' items={centerItems} />
            <ActionBarSection modalAreaId={modalAreaId} altIcon={sectionAlt?.right} type='right' items={rightItems} />
        </div>
    )
};

export default ActionBar;