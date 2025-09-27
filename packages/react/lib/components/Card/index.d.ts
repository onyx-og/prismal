import { ReactNode, FC } from "react";
import './index.scss';
import ComponentProps from '../Component';
export interface CardProps extends ComponentProps {
    header?: ReactNode;
    headerClass?: string;
    footer?: ReactNode;
    footerClass?: string;
    children?: ReactNode;
    bodyClass?: string;
    orientation?: "vertical" | "horizontal";
    padding?: "none" | 'xs' | "s" | 'm' | 'l';
}
declare const Card: FC<CardProps>;
export default Card;
