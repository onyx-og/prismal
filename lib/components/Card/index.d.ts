import React from "react";
import './index.scss';
import ComponentProps from '../Component';
export interface CardProps extends ComponentProps {
    heading?: string;
    children?: React.ReactNode;
    size?: [number, number];
    size_s?: [number, number];
    size_m?: [number, number];
    size_l?: [number, number];
    className?: string;
    onClick?: () => void;
    onClose?: () => void;
    transition?: boolean;
    visible?: boolean;
    showClose?: boolean;
    bgColor?: string;
    cover?: string;
    cornerRadius?: 's' | 'm' | 'l' | false;
    padding?: 's' | 'm' | 'l';
    headingBgAlfa?: number;
    headingBgColor?: string;
    headingTextAlign?: 'start' | 'center' | 'end';
}
declare const Card: React.FC<CardProps>;
export default Card;
