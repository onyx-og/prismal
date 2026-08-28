import { JSX, FC, ReactNode, useMemo, CSSProperties } from 'react';
import './index.scss';
import Modal from 'components/Modal';
import Card from 'components/Card';
import Button from 'components/Button';
import ComponentProps from '../Component';
import { SidebarContext, SidebarContextValue } from './context';

/**
 * @typedef {object} SidebarProps
 * @description Props for the Sidebar component.
 */
export interface SidebarProps extends ComponentProps {
    /**
     * How the sidebar occupies the page.
     * - `overlay` (default): portaled, floats over the page behind a backdrop
     *   and slides in and out with `visible`.
     * - `static`: rendered inline as part of the layout, always on screen,
     *   with no backdrop, no portal and no close affordance.
     */
    mode?: 'overlay' | 'static';
    /** The ID of the DOM element where the sidebar should be rendered. Overlay mode only. */
    areaId?: string;
    /** Callback function to close the sidebar. Overlay mode only. */
    closeSidebar?: () => void;
    /** Custom header content for the sidebar. */
    header?: JSX.Element;
    /** Custom footer content for the sidebar. */
    footer?: JSX.Element;
    /** The main content of the sidebar. */
    children?: ReactNode;
    /** Controls the visibility of the sidebar. Ignored in `static` mode, which is always visible. */
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
    /** Width of the expanded panel. Defaults to `calc(250px + 10vw)`. */
    width?: string;
}

/**
 * @component Sidebar
 * @description A sidebar panel, available either as an overlay that slides in over the page
 * or as a static panel that is part of the layout. Either form supports an expanded and a
 * collapsed "icon rail" state; the current state is published on an internal context so nested
 * content adapts to the reduced width without the consumer wiring anything up.
 * @param {SidebarProps} props The component props.
 * @returns {React.ReactElement} The rendered Sidebar component.
 * @example
 * // Overlay (default): slides in over the page
 * <Sidebar visible={true} closeSidebar={() => {}}>
 *   <p>Sidebar content.</p>
 * </Sidebar>
 * @example
 * // Static: part of the layout, collapsible to an icon rail
 * <Sidebar mode="static" collapsible collapsed={collapsed} toggleCollapsed={toggle}>
 *   <Menu data={items} />
 * </Sidebar>
 */
const Sidebar: FC<SidebarProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        mode = 'overlay',
        areaId,
        header,
        children,
        footer,
        visible,
        closeSidebar,
        collapsed = false,
        collapsible = false,
        toggleCollapsed,
        collapsedWidth = '3.5rem',
        width
    } = props;

    const isStatic = mode === 'static';

    let sidebarClassName = 'sidebar';
    let sidebarFgClassName = "sidebar-fg";
    if (className) sidebarClassName = `${sidebarClassName} ${className}`;
    if (collapsed) sidebarClassName = `${sidebarClassName} is-collapsed`;
    if (isStatic) sidebarClassName = `${sidebarClassName} is-static visible`;
    let sidebarBgClassName = 'sidebar-bg';

    const style_ = {
        ...style,
        '--sidebar-collapsed-width': collapsedWidth,
        ...(width ? { '--sidebar-width': width } : {})
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

    const content = <SidebarContext.Provider value={context}>
        {toggle}
        {children}
    </SidebarContext.Provider>;

    // Static mode bypasses Modal entirely: no portal, no backdrop, no
    // visibility transition and no close button -- the panel is just a Card in
    // the layout. It keeps the same class names so both forms share styling.
    if (isStatic) {
        return <div data-id={dataId} className={sidebarClassName} style={style_}>
            <Card className={sidebarFgClassName} header={header} footer={footer}>
                <div className="sidebar-content">
                    {content}
                </div>
            </Card>
        </div>
    }

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
        {content}
    </Modal>
}

export default Sidebar;
