import { ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} HeaderProps
 * @description Props for the Header component.
 */
export interface HeaderProps extends ComponentProps {
    /** Additional CSS class for the navigation container. */
    navClass?: string;
    /** Additional CSS class for the placeholder element. */
    placeHolderClass?: string;
    /** The content to be displayed within the header. */
    children?: ReactNode;
    /** If true, the header becomes sticky on scroll. */
    sticky?: boolean;
    /** Additional CSS class to apply when the header is sticky. */
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
