import React from 'react';
import './index.scss';
import ComponentProps from '../Component';
export interface SidebarProps extends ComponentProps {
    areaId?: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: React.ReactNode;
    visible?: boolean;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
