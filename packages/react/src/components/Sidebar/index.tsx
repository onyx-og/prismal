import { JSX, FC, ReactNode, useMemo, useCallback, useEffect, useRef, CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import './index.scss';
import Modal from 'components/Modal';
import Card from 'components/Card';
import Button from 'components/Button';
import ComponentProps from '../Component';
import { SidebarContext, SidebarContextValue } from './context';

// Horizontal travel, in px, before an edge drag counts as a deliberate
// collapse/expand rather than a stray click or a tremor on the edge. Small on
// purpose: the drag commits as soon as this is crossed, so this is only the
// point at which the gesture is recognised, not a distance the user has to
// cover before anything happens.
const DRAG_THRESHOLD = 12;

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
    /**
     * Lets the collapsed state be driven by dragging the panel's outer edge:
     * dragging past the midpoint between the collapsed and expanded widths
     * commits to the other state, otherwise it snaps back.
     */
    dragEdge?: boolean;
    /**
     * Horizontal travel, in px, at which an edge drag is recognised and
     * committed. Defaults to 12 -- enough to tell a drag from a click, and no
     * more, since the panel responds the moment it is crossed.
     */
    dragThreshold?: number;
    /**
     * The handle on the panel's outer edge, vertically centred. Clicking it
     * toggles the collapsed state. Independent of `dragEdge` -- either can be
     * used on its own.
     *
     * - `false` / omitted: no handle.
     * - `true`: the default handle, a `<Button size="xs" iconName="chevron-right" />`
     *   that points the way it will move the panel.
     * - an element: used as the handle as-is.
     */
    handle?: boolean | JSX.Element;
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
        width,
        dragEdge = false,
        dragThreshold = DRAG_THRESHOLD,
        handle = false
    } = props;

    const isStatic = mode === 'static';

    // Drag state is kept in a ref: the gesture produces exactly one
    // collapsed/expanded commit, so re-rendering per pointer move would buy
    // nothing.
    const dragRef = useRef<{ startX: number, wasCollapsed: boolean } | null>(null);

    // Set once a drag actually commits, and cleared on the next press. It
    // suppresses the click that the browser fires at the end of a drag, which
    // would otherwise toggle the panel straight back.
    const draggedRef = useRef(false);
    // Teardown for the in-flight gesture's window listeners.
    const dragCleanupRef = useRef<(() => void) | null>(null);

    const endDrag = useCallback(() => {
        dragRef.current = null;
        dragCleanupRef.current?.();
        dragCleanupRef.current = null;
    }, []);

    /**
     * Starts an edge drag, tracking it on the window rather than on the edge
     * element.
     *
     * The edge is only ~1.5rem wide and sits on the panel's outer border, so
     * any real drag leaves it within a few pixels -- element-level pointermove
     * simply stopped firing before the threshold was ever reached, which is why
     * dragging out to expand did nothing. Pointer capture would also solve that,
     * but capturing on press retargets the gesture and destroys the handle's
     * click (see the handle below), so the listeners go on the window instead.
     */
    const onEdgePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragEdge) return;
        endDrag();
        draggedRef.current = false;
        dragRef.current = { startX: e.clientX, wasCollapsed: collapsed };

        const onMove = (ev: PointerEvent) => {
            const drag = dragRef.current;
            if (!drag) return;
            // Committing on distance rather than on the resulting width keeps
            // this independent of how the panel is actually sized (a `width`
            // prop, a vw-based default, or a CSS override).
            const dx = ev.clientX - drag.startX;
            if (Math.abs(dx) < dragThreshold) return;
            // One commit per gesture: dropping the state here stops a drag that
            // wanders back and forth from flapping the panel open and shut.
            dragRef.current = null;
            draggedRef.current = true;
            const shouldCollapse = dx < 0;
            if (shouldCollapse !== drag.wasCollapsed) toggleCollapsed?.();
        };
        const onUp = () => endDrag();

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        dragCleanupRef.current = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, [dragEdge, collapsed, dragThreshold, toggleCollapsed, endDrag]);

    // A pointer released outside the window, or an unmount mid-gesture, would
    // otherwise leave the move listener attached.
    useEffect(() => endDrag, [endDrag]);

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

    /**
     * Puts a slot inside the sidebar context.
     *
     * `header` and `footer` are handed to Modal/Card as props, so they are
     * rendered as siblings of the content rather than within it -- which left
     * them outside the provider, unable to see the collapsed state and morph
     * with the rest of the panel. Each slot is wrapped on its own so all three
     * sit under the same context regardless of where Card places them.
     */
    const inContext = useCallback((node: ReactNode) => node == null
        ? node
        : <SidebarContext.Provider value={context}>{node}</SidebarContext.Provider>,
    [context]);

    const content = inContext(<>
        {toggle}
        {children}
    </>);

    const header_ = header
        ? <div className="sidebar-header">{inContext(header)}</div>
        : undefined;
    const footer_ = footer
        ? <div className="sidebar-footer">{inContext(footer)}</div>
        : undefined;

    /**
     * Toggles the panel, unless this click is the tail of a drag that has
     * already committed -- a drag started on the handle would otherwise toggle
     * twice and end up back where it began.
     */
    const onHandleClick = useCallback(() => {
        if (draggedRef.current) {
            draggedRef.current = false;
            return;
        }
        toggleCollapsed?.();
    }, [toggleCollapsed]);

    // `handle` carries both "is there one" and "which one": anything truthy
    // shows a handle, and `true` specifically means the default one.
    const showHandle = !!handle;

    // The edge sits on the panel's outer border and carries both affordances.
    // It is rendered whenever either is asked for, so `handle` works without
    // `dragEdge` and vice versa.
    const edge = (dragEdge || showHandle)
        ? <div
            className={`sidebar-edge${dragEdge ? ' is-draggable' : ''}`}
            onPointerDown={onEdgePointerDown}
        >
            {showHandle && <div
                className="sidebar-edge-handle"
                title={collapsed ? 'Expand' : 'Collapse'}
                onClick={onHandleClick}
            >
                {/* The default handle points the way it will move the panel;
                    a caller-supplied element is rendered untouched. */}
                {handle === true
                    ? <Button
                        type="primary"
                        size="xs"
                        shape="circle"
                        iconName={collapsed ? 'chevron-right' : 'chevron-left'}
                    />
                    : handle}
            </div>}
        </div>
        : null;

    // Static mode bypasses Modal entirely: no portal, no backdrop, no
    // visibility transition and no close button -- the panel is just a Card in
    // the layout. It keeps the same class names so both forms share styling.
    if (isStatic) {
        return <div data-id={dataId} className={sidebarClassName} style={style_}>
            <Card className={sidebarFgClassName} header={header_} footer={footer_}>
                <div className="sidebar-content">
                    {content}
                    {edge}
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
        header={header_}
        footer={footer_}
        closeModal={closeSidebar}
    >
        {content}
        {edge}
    </Modal>
}

export default Sidebar;
