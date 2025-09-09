import React from "react";
import './index.scss';
import ComponentProps from '../Component';
export interface CardProps extends ComponentProps {
    header?: React.ReactNode;
    headerClass?: string;
    footer?: React.ReactNode;
    footerClass?: string;
    children?: React.ReactNode;
    bodyClass?: string;
    orientation?: "vertical" | "horizontal";
    padding?: "none" | 'xs' | "s" | 'm' | 'l';
}
declare const Card: React.FC<CardProps>;
export default Card;
