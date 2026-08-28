import { createContext, useContext } from 'react';

/**
 * @typedef {object} SidebarContextValue
 * @description Layout constraints published by a Sidebar to everything rendered
 * inside it, so descendants (notably Menu items) can adapt their own rendering.
 */
export interface SidebarContextValue {
    /** True when the subtree is rendered inside a Sidebar. */
    inSidebar: boolean;
    /** True when the Sidebar is in its collapsed (icon rail) form. */
    collapsed: boolean;
}

export const SidebarContext = createContext<SidebarContextValue>({
    inSidebar: false,
    collapsed: false
});

/**
 * @function useSidebarContext
 * @description Reads the constraints of the nearest enclosing Sidebar.
 * Returns `{ inSidebar: false, collapsed: false }` outside of one.
 * @returns {SidebarContextValue} The current sidebar layout constraints.
 */
export const useSidebarContext = (): SidebarContextValue => useContext(SidebarContext);
