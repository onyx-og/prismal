import React from "react";
import './index.scss';
import ComponentProps from '../Component';
import { ActionBarItemConfig } from "../ActionBar";
export interface CardProps extends ComponentProps {
    title?: string;
    children?: React.ReactNode;
    orientation?: "column" | "row";
    size?: [number, number];
    topActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    btmActionBarItems?: ActionBarItemConfig[] | (() => ActionBarItemConfig[]);
    className?: string;
    onClick?: (arg?: any) => void;
    onClose?: (arg?: any) => void;
    transition?: boolean;
    visible?: boolean;
    showClose?: boolean;
    bgColor?: string;
    headingCover?: string;
    headingClassName?: string;
    cornerRadius?: 's' | 'm' | 'l' | false;
    padding?: 's' | 'm' | 'l';
}
declare const Card: React.FC<CardProps>;
export default Card;
