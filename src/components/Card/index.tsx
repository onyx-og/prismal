import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';

export interface CardProps extends ComponentProps  {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode; // Card content
    cornerRadius?: 's' | 'm' | 'l' | false;
    padding?: 's' | 'm' | 'l';
}

const Card: React.FC<CardProps> = ( props ) => {
    const {
        header, footer, accent, accentDark, accentLight,
        className, children,
        cornerRadius = 's', padding = 's',
    } = props;

    let cardClass = `alenite-card padding-${padding}`;
    if (className) cardClass = `${cardClass} ${className}`;
    
    cardClass = `${cardClass} corner-${cornerRadius}`;

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
