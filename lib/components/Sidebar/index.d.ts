import React from 'react';
import './index.scss';
export interface SidebarProps {
    areaId: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: React.ReactNode;
    visible?: boolean;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
