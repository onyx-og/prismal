import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} SidebarProps
 * @description Props for the Sidebar component.
 * @property {string} [areaId] The ID of the DOM element where the sidebar should be rendered.
 * @property {() => void} [closeSidebar] Callback function to close the sidebar.
 * @property {JSX.Element} [header] Custom header content for the sidebar.
 * @property {JSX.Element} [footer] Custom footer content for the sidebar.
 * @property {ReactNode} [children] The main content of the sidebar.
 * @property {boolean} [visible] Controls the visibility of the sidebar.
 */
export interface SidebarProps extends ComponentProps {
    areaId?: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: ReactNode;
    visible?: boolean;
}
/**
 * @component Sidebar
 * @description A sidebar component that slides in from the side, built on top of the Modal component.
 * @param {SidebarProps} props The component props.
 * @returns {React.ReactElement} The rendered Sidebar component.
 * @example
 * <Sidebar visible={true} closeSidebar={() => {}}>
 *   <p>Sidebar content.</p>
 * </Sidebar>
 */
declare const Sidebar: FC<SidebarProps>;
export default Sidebar;
