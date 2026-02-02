import React, { ReactNode } from "react";
import "./index.scss";
export interface MenuItemProps {
    label?: ReactNode;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
