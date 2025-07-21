import React from 'react';
import './index.scss';
export interface SidebarProps {
    visible?: boolean;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: React.ReactNode;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
