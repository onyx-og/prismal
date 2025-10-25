import { ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} HeaderProps
 * @description Props for the Header component.
 * @property {string} [navClass] Additional CSS class for the navigation container.
 * @property {string} [placeHolderClass] Additional CSS class for the placeholder element.
 * @property {ReactNode} [children] The content to be displayed within the header.
 * @property {boolean} [sticky=true] If true, the header becomes sticky on scroll.
 * @property {string} [stickyClass] Additional CSS class to apply when the header is sticky.
 */
export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
/**
 * @component Header
 * @description A header component that can be made sticky on scroll.
 * @param {HeaderProps} props The component props.
 * @param {React.Ref<any>} ref The forwarded ref.
 * @returns {React.ReactElement} The rendered Header component.
 * @example
 * <Header sticky>
 *   <nav>...</nav>
 * </Header>
 */
declare const Header: import("react").ForwardRefExoticComponent<HeaderProps & import("react").RefAttributes<unknown>>;
export default Header;
