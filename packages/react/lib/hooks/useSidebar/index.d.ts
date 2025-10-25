import { FC } from 'react';
import { SidebarProps } from 'components/Sidebar';
/**
 * @typedef {object} UseSidebarReturn
 * @description The return object of the useSidebar hook.
 * @property {FC<SidebarProps>} Sidebar The Sidebar component, pre-configured with state management.
 * @property {boolean} state The current visibility state of the sidebar.
 * @property {() => void} open A function to open the sidebar.
 * @property {() => void} close A function to close the sidebar.
 */
type UseSidebarReturn = {
    Sidebar: FC<SidebarProps>;
    state: boolean;
    open: () => void;
    close: () => void;
};
/**
 * @function useSidebar
 * @description A custom hook to manage the state of a Sidebar component.
 * @param {object} [config] Configuration for the sidebar.
 * @param {string} [config.areaId] The ID of the DOM element to render the sidebar into.
 * @returns {UseSidebarReturn} An object containing the Sidebar component and state management functions.
 * @example
 * const { Sidebar, open } = useSidebar();
 * <Button onClick={open}>Open Sidebar</Button>
 * <Sidebar>Content</Sidebar>
 */
declare const useSidebar: (config?: {
    areaId?: string;
}) => UseSidebarReturn;
export default useSidebar;
