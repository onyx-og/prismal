import './index.scss';

import React from 'react';
import ActionBarSection from './ActionBarSection';
import ComponentProps from '../Component';

import { setAccentStyle } from 'utils/colors';
export interface ActionBarItemConfig {
    item: JSX.Element;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}

export interface ActionBarProps extends ComponentProps {
    position: string;
    items: (ActionBarItemConfig | null)[];
    type?: 'default' | 'primary' | 'secondary';
};

const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(( props, ref ) => {
    const { 
        position ='top',
        items = [],
        type = 'default',
        accent, accentLight, accentDark,
        className
    } = props;
    let actionBarClass = `alenite-actionbar ${type} ${position}`;

    // const actionBarRef = React.useRef<HTMLDivElement>(null);
    // console.log("Got actionbar ref", actionBarRef);
    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});
    
    if (className) actionBarClass = `${actionBarClass} ${className}`;

    return (
        <div ref={ref}
            className={actionBarClass}
            style={style}
        >
            <ActionBarSection type='left' items={items} />
            <ActionBarSection type='center' items={items} />
            <ActionBarSection type='right' items={items} />
        </div>
    )
});

export default ActionBar;