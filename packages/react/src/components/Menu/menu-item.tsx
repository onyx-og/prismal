import React, { ReactNode } from "react";
import Dropdown from "../Dropdown";
import "./index.scss";

export interface MenuItemProps {
    label?: ReactNode;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { label, onClick, children, className, icon } = props;

    const content = (
        <div className={`prismal-menu-item ${className || ''}`} onClick={onClick}>
            {icon && <span className="prismal-menu-item-icon">{icon}</span>}
            {label}
        </div>
    );

    if (children) {
        return <Dropdown type="default" toggleElement={content}>
            {children}
        </Dropdown>
    }

    return content;
}

export default MenuItem;