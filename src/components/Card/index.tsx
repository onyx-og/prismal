import React from "react";
import './index.scss';
import {hex2rgba} from '../../utils/colors';
import ComponentProps from '../Component';
import ActionBar, { ActionBarItemConfig } from "../ActionBar";
import Button from "../Button";
import { setAccentStyle } from 'utils/colors';

export interface CardProps extends ComponentProps {
    title?: string;
    children?: React.ReactNode;
    orientation?: "column" | "row";
    // TODO: set accepted sizes, and style accordingly
    size?: [number, number];
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    className?: string;
    onClick?: (arg?: any) => void;
    onClose?: (arg?: any) => void;
    transition?: boolean; // of comp visibility
    visible?: boolean;
    showClose?: boolean;
    bgColor?: string;
    headingCover?: string;
    headingClassName?: string;
    cornerRadius?: 's' | 'm' | 'l' | false;
    padding?: 's' | 'm' | 'l';
}
const Card: React.FC<CardProps> = ( props ) => {
    const {
        title, size = [3,2],
        onClick, onClose, topActionBarItems, orientation = "column",
        accent, accentDark, accentLight,
        bgColor = "#999999", headingCover,
        className, children, headingClassName,
        cornerRadius = 's', padding = 's',
        transition = false, btmActionBarItems,
        visible = true, showClose = false,
    } = props;

    let cardClass = `alenite-card f padding-${padding}`;
    if (className) cardClass = `${cardClass} ${className}`;
    let coverAnim = !headingCover;

    if (orientation == "column") cardClass = `${cardClass} fd-col`;
    else if (orientation == "row") cardClass = `${cardClass} fd-row`;  
    
    cardClass = `${cardClass} corner-${cornerRadius}`;
    if (coverAnim) cardClass = `${cardClass} cover-anim`;

    let _coverClass = "cover";
    if (headingClassName)  _coverClass = `${_coverClass} ${headingClassName}`;

    const [mounted, mount] = React.useState(!transition);
    const [visibility, setVisibility] = React.useState(false);

    React.useLayoutEffect(() => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if (visible && transition) {
            mount(visible);
            visiblityTimeoutId = window.setTimeout(() => setVisibility(true), 150)
        } else if (transition) {
            unmountTimeoutId = window.setTimeout(() => mount(visible), 1000);
            setVisibility(visible);
        }

        return () => {
            if (unmountTimeoutId) window.clearTimeout(unmountTimeoutId);
            if (visiblityTimeoutId) window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);

    if (visibility) {
        cardClass = `${cardClass} visible`;
    }

    let style: {[key: string]: any} = setAccentStyle({}, {accent, accentLight, accentDark});

    /* Trace unmount of component to trigger, if provided,
     * fire onClose callback
     */
    React.useEffect(() => {
        if (!mounted && !visible) {
            onClose && onClose();
        }
    }, [mounted]);

    const header = React.useMemo(()=> {
        if (headingCover != null || title?.length || topActionBarItems) {
            return <div className={_coverClass} style={{
                backgroundRepeat: headingCover ? 'no-repeat' : undefined,
                backgroundSize: headingCover ? 'contain' : undefined,
                backgroundPosition: headingCover ? 'center' : undefined,
                backgroundImage: headingCover ? "url("+headingCover+")" : undefined 
            }}>
                <div className='alenite-card-heading'><ActionBar position='top'
                items={[
                    title ? { item: <span>{title}</span>, position: 'center', key: 'modal-title', scale: false } : null,
                    ...(topActionBarItems instanceof Function && topActionBarItems() || topActionBarItems instanceof Array && topActionBarItems || []),
                    showClose ? {
                        item: <Button
                            shape='circle'
                            onClick={onClose} iconName='close'
                            accent={accent} accentDark={accentDark} accentLight={accentLight}
                        />,
                        position: 'right',
                        title: 'Close',
                        key: 'close-modal'
                    } : null
                ]}
            /></div>
            </div>
        }
    }, [headingCover, title, topActionBarItems, accent, accentDark, accentLight, showClose, onClose]);

    return mounted ? <div 
        className={cardClass}
        onClick={onClick}
        style={style}
    >
        {header}
        <div className="alenite-card-content">{children}</div>
        {btmActionBarItems && <ActionBar position='bottom'
            items={[
                ...(btmActionBarItems instanceof Function && btmActionBarItems() || btmActionBarItems instanceof Array && btmActionBarItems || [])
            ]}
        />}
    </div> : <></>
}

export default Card;
