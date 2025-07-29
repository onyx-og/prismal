import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, BorderRadius } from '../../utils';

export interface CardProps extends ComponentProps  {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode; // Card content
    cornerRadius?: BorderRadius;
    padding?: 'xs' | "s" | 'm' | 'l';
}

const Card: React.FC<CardProps> = ( props ) => {
    const {
        header, footer, accent, accentDark, accentLight,
        className, children,
        cornerRadius = 'small', padding = 's',
    } = props;

    let cardClass = `prismal-card card-p-${padding}`;
    if (className) cardClass = `${cardClass} ${className}`;

    let style: {[key: string]: any} = setAccentStyle({}, {accent, accentLight, accentDark});
    if (cornerRadius) style = setBorderRadius(style, cornerRadius);
    
    return <div 
        className={cardClass}
        style={style}
    >
        {header}
        <div className="prismal-card-content">{children}</div>
        {footer}
    </div>
}

export default Card;
