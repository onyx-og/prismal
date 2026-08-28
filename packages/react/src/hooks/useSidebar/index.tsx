import { useState, useCallback, FC, ReactElement } from 'react';
import Sidebar, { SidebarProps } from 'components/Sidebar';

/**
 * @typedef {object} UseSidebarReturn
 * @description The return object of the useSidebar hook.
 * @property {FC<SidebarProps>} Sidebar The Sidebar component, pre-configured with state management.
 * @property {boolean} state The current visibility state of the sidebar.
 * @property {() => void} open A function to open the sidebar.
 * @property {() => void} close A function to close the sidebar.
 * @property {boolean} collapsed Whether the sidebar is in its collapsed (icon rail) form.
 * @property {() => void} collapse A function to collapse the sidebar to its icon rail.
 * @property {() => void} expand A function to expand the sidebar back to full width.
 * @property {() => void} toggleCollapsed A function to flip the collapsed state.
 */
type UseSidebarReturn = {
    Sidebar: FC<SidebarProps>;
    state: boolean;
    open: () => void;
    close: () => void;
    collapsed: boolean;
    collapse: () => void;
    expand: () => void;
    toggleCollapsed: () => void;
}

/**
 * @function useSidebar
 * @description A custom hook to manage the state of a Sidebar component.
 * @param {object} [config] Configuration for the sidebar.
 * @param {string} [config.areaId] The ID of the DOM element to render the sidebar into.
 * @param {boolean} [config.collapsible] Shows the built-in collapse/expand toggle.
 * @param {boolean} [config.defaultCollapsed] Whether the sidebar starts collapsed.
 * @returns {UseSidebarReturn} An object containing the Sidebar component and state management functions.
 * @example
 * const { Sidebar, open } = useSidebar();
 * <Button onClick={open}>Open Sidebar</Button>
 * <Sidebar>Content</Sidebar>
 * @example
 * // Collapsible sidebar: items inside it fall back to icons when collapsed
 * const { Sidebar, open } = useSidebar({ collapsible: true });
 * <Sidebar><Menu data={items} /></Sidebar>
 */
const useSidebar = (
    config?: {areaId?: string, collapsible?: boolean, defaultCollapsed?: boolean}
) : UseSidebarReturn => {
    const [ state, setState ] = useState(false);
    const [ collapsed, setCollapsed ] = useState(config?.defaultCollapsed ?? false);
    
    /**
     * @function close
     * @description Closes the sidebar.
     */
    const close = useCallback( () => {
        setState(false)
    }, []);

    /**
     * @function open
     * @description Opens the sidebar.
     */
    const open = useCallback( () => {
        setState(true)
    }, []);

    /**
     * @function collapse
     * @description Collapses the sidebar to its icon rail.
     */
    const collapse = useCallback( () => {
        setCollapsed(true)
    }, []);

    /**
     * @function expand
     * @description Expands the sidebar back to its full width.
     */
    const expand = useCallback( () => {
        setCollapsed(false)
    }, []);

    /**
     * @function toggleCollapsed
     * @description Flips the sidebar between its expanded and collapsed forms.
     */
    const toggleCollapsed = useCallback( () => {
        setCollapsed(c => !c)
    }, []);

    // `collapsed`/`collapsible`/`toggleCollapsed` are defaults: a caller can
    // still drive the collapsed form itself by passing them explicitly.
    const _Sidebar: FC<SidebarProps> = ( props ): ReactElement => <Sidebar
        areaId={config?.areaId}
        collapsed={collapsed}
        collapsible={config?.collapsible}
        toggleCollapsed={toggleCollapsed}
        {...props}
        visible={state}
        closeSidebar={close}
    />

    return { Sidebar: _Sidebar, state, open, close, collapsed, collapse, expand, toggleCollapsed }
}

export default useSidebar;