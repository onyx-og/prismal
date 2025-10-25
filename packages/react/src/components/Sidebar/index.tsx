import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import Modal from 'components/Modal';
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