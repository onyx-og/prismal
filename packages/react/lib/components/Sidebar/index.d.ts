import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import ComponentProps from '../Component';
export interface SidebarProps extends ComponentProps {
    areaId?: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: ReactNode;
    visible?: boolean;
}
declare const Sidebar: FC<SidebarProps>;
export default Sidebar;
