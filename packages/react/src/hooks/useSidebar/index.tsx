import { useState, useCallback, FC, ReactElement } from 'react';
import Sidebar, { SidebarProps } from 'components/Sidebar';

/**
 * @typedef {object} UseSidebarReturn
 * @description The return object of the useSidebar hook.
 * @property {FC<SidebarProps>} Sidebar The Sidebar component, pre-configured with state management.
 * @property {boolean} state The current visibility state of the sidebar.
 * @property {() => void} open A function to open the sidebar.
 * @property {() => void} close A function to close the sidebar.
 */
type UseSidebarReturn = {
    Sidebar: FC<SidebarProps>;
    state: boolean;
    open: () => void;
    close: () => void;
}

/**
 * @function useSidebar
 * @description A custom hook to manage the state of a Sidebar component.
 * @param {object} [config] Configuration for the sidebar.
 * @param {string} [config.areaId] The ID of the DOM element to render the sidebar into.
 * @returns {UseSidebarReturn} An object containing the Sidebar component and state management functions.
 * @example
 * const { Sidebar, open } = useSidebar();
 * <Button onClick={open}>Open Sidebar</Button>
 * <Sidebar>Content</Sidebar>
 */
const useSidebar = (
    config?: {areaId?: string}
) : UseSidebarReturn => {
    const [ state, setState ] = useState(false);
    
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
    
    const _Sidebar: FC<SidebarProps> = ( props ): ReactElement => <Sidebar areaId={config?.areaId} {...props} visible={state} closeSidebar={close}/>

    return { Sidebar: _Sidebar, state, open, close }
}

export default useSidebar;