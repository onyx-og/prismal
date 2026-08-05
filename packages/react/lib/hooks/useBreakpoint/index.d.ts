import { ReactNode } from "react";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export interface UseBreakpointOptions {
    /** Called whenever the active breakpoint changes; may return a cleanup function, like useEffect. */
    effect?: (breakpoint: Breakpoint) => void | (() => void);
    /** Extra dependencies that re-trigger `effect` even when the breakpoint itself hasn't changed. */
    deps?: unknown[];
    /** A node to render for the current breakpoint, either static or resolved per-breakpoint. */
    node?: ReactNode | ((breakpoint: Breakpoint) => ReactNode);
}
export interface UseBreakpointResult {
    breakpoint: Breakpoint;
    node: ReactNode | null;
}
/**
 * @function useBreakpoint
 * @description Tracks the current responsive breakpoint (the same xs/sm/md/lg/xl bands defined in
 * styles/utils.scss), optionally running an effect and/or resolving a node whenever it changes.
 * @param {UseBreakpointOptions} [options] Optional effect/deps/node configuration.
 * @returns {UseBreakpointResult} The current breakpoint and resolved node (null if `node` wasn't provided).
 * @example
 * const { breakpoint } = useBreakpoint();
 * @example
 * const { node } = useBreakpoint({ node: (bp) => bp === "xs" ? <MobileNav /> : <DesktopNav /> });
 * @example
 * useBreakpoint({ effect: (bp) => console.log("now at", bp), deps: [someValue] });
 */
declare const useBreakpoint: (options?: UseBreakpointOptions) => UseBreakpointResult;
export default useBreakpoint;
