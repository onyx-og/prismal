import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: React.ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
declare const Header: (props: HeaderProps) => import("react/jsx-runtime").JSX.Element;
export default Header;
