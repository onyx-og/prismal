import { JSX, FC, ReactNode, useMemo, CSSProperties } from 'react';
import './index.scss';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ComponentProps from '../Component';
import { SidebarContext, SidebarContextValue } from './context';

/**
 * @typedef {object} SidebarProps
 * @description Props for the Sidebar component.
 */
export interface SidebarProps extends ComponentProps {
    /** The ID of the DOM element where the sidebar should be rendered. */
    areaId?: string;
    /** Callback function to close the sidebar. */
    closeSidebar?: () => void;
    /** Custom header content for the sidebar. */
    header?: JSX.Element;
    /** Custom footer content for the sidebar. */
    footer?: JSX.Element;
    /** The main content of the sidebar. */
    children?: ReactNode;
    /** Controls the visibility of the sidebar. */
    visible?: boolean;
    /**
     * Renders the sidebar in its collapsed form: a narrow rail that keeps the
     * panel on screen but only has room for icons. Content is told about this
     * through the sidebar context, so Menu items switch to icon-only rendering.
     */
    collapsed?: boolean;
    /** Shows the built-in collapse/expand toggle at the top of the panel. */
    collapsible?: boolean;
    /** Callback invoked by the built-in toggle to flip the collapsed state. */
    toggleCollapsed?: () => void;
    /** Width of the collapsed rail. Defaults to `3.5rem`. */
    collapsedWidth?: string;
}

/**
 * @component Sidebar
 * @description A sidebar component that slides in from the side, built on top of the Modal component.
 * Supports an expanded form and a collapsed "icon rail" form; the current form is published on
 * {@link SidebarContext} so nested content can adapt to the reduced width.
 * @param {SidebarProps} props The component props.
 * @returns {React.ReactElement} The rendered Sidebar component.
 * @example
 * <Sidebar visible={true} closeSidebar={() => {}}>
 *   <p>Sidebar content.</p>
 * </Sidebar>
 * @example
 * // Collapsed icon rail with the built-in toggle
 * <Sidebar visible collapsible collapsed={collapsed} toggleCollapsed={toggle}>
 *   <Menu data={items} />
 * </Sidebar>
 */
const Sidebar: FC<SidebarProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        areaId,
        header,
        children,
        footer,
        visible,
        closeSidebar,
        collapsed = false,
        collapsible = false,
        toggleCollapsed,
        collapsedWidth = '3.5rem'
    } = props;

    let sidebarClassName = 'sidebar';
    let sidebarFgClassName = "sidebar-fg";
    if (className) sidebarClassName = `${sidebarClassName} ${className}`;
    if (collapsed) sidebarClassName = `${sidebarClassName} is-collapsed`;
    let sidebarBgClassName = 'sidebar-bg';

    const style_ = {
        ...style,
        '--sidebar-collapsed-width': collapsedWidth
    } as CSSProperties;

    const context = useMemo<SidebarContextValue>(
        () => ({ inSidebar: true, collapsed }), [collapsed]
    );

    // The toggle lives in the content flow rather than the Modal header so it
    // survives a caller-provided `header` and stays put in the collapsed rail.
    const toggle = collapsible
        // `title` is rendered as label text by Button, so the hover hint goes
        // on the wrapper instead to keep the toggle strictly icon-only.
        ? <div className="sidebar-collapse-toggle" title={collapsed ? 'Expand' : 'Collapse'}>
            <Button
                shape="circle"
                type="text"
                onClick={toggleCollapsed}
                iconName={collapsed ? 'angle-right' : 'angle-left'}
            />
        </div>
        : null;

    return <Modal data-id={dataId}
        style={style_}
        visible={visible}
        areaId={areaId}
        className={sidebarClassName}
        bgClassName={sidebarBgClassName}
        fgClassName={sidebarFgClassName}
        header={header}
        footer={footer}
        closeModal={closeSidebar}
    >
        <SidebarContext.Provider value={context}>
            {toggle}
            {children}
        </SidebarContext.Provider>
    </Modal>
}

export default Sidebar;
