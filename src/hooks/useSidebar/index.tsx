import React from 'react';
import Sidebar, { SidebarProps } from 'components/Sidebar';

/**
 * Custom hook meant to export a Sidebar component and the methods to manage its state
 * This allows to provide the Sidebar component with headers, footers or content that can already alter that state
 * Also to ease the management of the state from other components outside the Sidebar.
 */
const useSidebar = () => {
    const [ state, setState ] = React.useState(false);
    
    /**
     * Closes the sidebar
     */
    const close = React.useCallback( () => {
        setState(false)
    }, []);

    /**
     * Opens the sidebar
     */
    const open = React.useCallback( () => {
        setState(true)
    }, []);

    // NOTE: the 'state' boolean may not be needed to exported since it is already
    // used internally in Sidebar component 

    // Alter the component to keep the props that will be passed
    // but the visibility will be managed from open, state and close
    const _Sidebar: React.FC<SidebarProps> = ( props ) => <Sidebar {...props} visible={state} closeSidebar={close}/>

    return { Sidebar: _Sidebar, state, open, close }
}

export default useSidebar;