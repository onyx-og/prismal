import { ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
declare const Header: import("react").ForwardRefExoticComponent<HeaderProps & import("react").RefAttributes<unknown>>;
export default Header;
