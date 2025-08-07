import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { BorderRadius } from '../../utils';
export interface CardProps extends ComponentProps {
    header?: React.ReactNode;
    headerClass?: string;
    footer?: React.ReactNode;
    footerClass?: string;
    children?: React.ReactNode;
    bodyClass?: string;
    orientation?: "vertical" | "horizontal";
    cornerRadius?: BorderRadius;
    padding?: 'xs' | "s" | 'm' | 'l';
}
declare const Card: React.FC<CardProps>;
export default Card;
