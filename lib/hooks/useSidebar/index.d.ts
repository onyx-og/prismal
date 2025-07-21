import React from 'react';
import { SidebarProps } from 'components/Sidebar';
/**
 * Custom hook meant to export a Sidebar component and the methods to manage its state
 * This allows to provide the Sidebar component with headers, footers or content that can already alter that state
 * Also to ease the management of the state from other components outside the Sidebar.
 */
declare const useSidebar: () => {
    Sidebar: React.FC<SidebarProps>;
    state: boolean;
    open: () => void;
    close: () => void;
};
export default useSidebar;
