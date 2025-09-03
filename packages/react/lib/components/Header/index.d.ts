import React from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: React.ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<unknown>>;
export default Header;
