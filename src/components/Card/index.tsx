import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, BorderRadius, setPadding, setBoxElevation } from '../../utils';

export interface CardProps extends ComponentProps  {
    header?: React.ReactNode;
    headerClass?: string;
    footer?: React.ReactNode;
    footerClass?: string;
    children?: React.ReactNode; // Card content
    bodyClass?: string;
    cornerRadius?: BorderRadius;
    padding?: 'xs' | "s" | 'm' | 'l';
}

const Card: React.FC<CardProps> = ( props ) => {
    const {
        header, headerClass,
        footer, footerClass,
        accent, accentDark, accentLight,
        className, style = {},
        children, bodyClass,
        cornerRadius = 'extra-small', padding = 's',
        elevation = 1
    } = props;

    let cardClass = `prismal-card`;
    if (className) cardClass = `${cardClass} ${className}`;

    let style_: {[key: string]: any} = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (cornerRadius) setBorderRadius(style_, cornerRadius);
    setBoxElevation(style_, elevation);
    setPadding(style_, padding);
    
    const header_ = React.useMemo(() => {
        let headerClass_ = "prismal-card-header";
        if (headerClass) {
            headerClass_ = `${headerClass_} ${headerClass}`;
        }
        if (header) {
            return <div className={headerClass_}>
                {header}
            </div>
        }
        return null;
    },[header, headerClass]);

    const body = React.useMemo(() => {
        let bodyClass_ = "prismal-card-body";
        if (bodyClass) {
            bodyClass_ = `${bodyClass_} ${bodyClass}`;
        }
        if (children) {
            return <div className={bodyClass_}>
                {children}
            </div>
        }
        return null;
    },[children, bodyClass]);

    const footer_ = React.useMemo(() => {
        let footerClass_ = "prismal-card-footer";
        if (footerClass) {
            footerClass_ = `${footerClass_} ${footerClass}`;
        }
        if (footer) {
            return <div className={footerClass_}>
                {footer}
            </div>
        }
        return null;
    },[footer, footerClass]);

    return <div 
        className={cardClass}
        style={style_}
    >
        {header_}
        {body}
        {footer_}
    </div>
}

export default Card;
