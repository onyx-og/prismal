import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import Modal from 'components/Modal';
import ComponentProps from '../Component';

export interface SidebarProps extends ComponentProps {
    areaId?: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: ReactNode;
    visible?: boolean;
}
const Sidebar: FC<SidebarProps> = ( props ) => {
    const {
        "data-id": dataId,
        className, style,
        areaId,
        header,
        children,
        footer,
        visible,
        closeSidebar
    } = props;

    let sidebarClassName = 'sidebar';
    let sidebarFgClassName = "sidebar-fg";
    if (className) sidebarClassName = `${sidebarClassName} ${className}`;
    let sidebarBgClassName = 'sidebar-bg';

    return <Modal data-id={dataId}
        style={style}
        visible={visible}
        areaId={areaId}
        className={sidebarClassName}
        bgClassName={sidebarBgClassName}
        fgClassName={sidebarFgClassName}
        header={header}
        footer={footer}
        closeModal={closeSidebar}
    >
        {children}
    </Modal>
}

export default Sidebar;