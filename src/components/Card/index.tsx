import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';

export interface CardProps extends ComponentProps  {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode; // Card content
    cornerRadius?: 's' | 'm' | 'l' | "xl" | false;
    padding?: 'xs' | "s" | 'm' | 'l';
}

const Card: React.FC<CardProps> = ( props ) => {
    const {
        header, footer, accent, accentDark, accentLight,
        className, children,
        cornerRadius = 's', padding = 's',
    } = props;

    let cardClass = `alenite-card card-p-${padding}`;
    if (className) cardClass = `${cardClass} ${className}`;
    
    if (cornerRadius) cardClass = `${cardClass} card-br-${cornerRadius}`;

    let style: {[key: string]: any} = setAccentStyle({}, {accent, accentLight, accentDark});

    return <div 
        className={cardClass}
        style={style}
    >
        {header}
        <div className="card-content">{children}</div>
        {footer}
    </div>
}

export default Card;
