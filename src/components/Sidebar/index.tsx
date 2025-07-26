import React, { useState } from 'react';
import './index.scss';
import Modal from 'components/Modal';
import ReactDOM from 'react-dom';

export interface SidebarProps {
    areaId: string;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: React.ReactNode;
    visible?: boolean;
}
const Sidebar: React.FC<SidebarProps> = ( props ) => {
    const {
        areaId,
        header,
        children,
        footer,
        visible,
        closeSidebar
    } = props;

    let sidebarClassName = 'sidebar';
    let sidebarFgClassName = "sidebar-fg";
    let sidebarBgClassName = 'sidebar-bg';

    return <Modal
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