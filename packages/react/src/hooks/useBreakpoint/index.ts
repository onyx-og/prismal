import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

// Mirrors the $breakpoints map in styles/utils.scss — keep these two in sync.
const BREAKPOINTS: Record<Breakpoint, number> = {
    xs: 408,
    sm: 600,
    md: 840,
    lg: 960,
    xl: 1280,
};

const ORDERED_BREAKPOINTS: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

const getBreakpoint = (width: number): Breakpoint => {
    for (const bp of ORDERED_BREAKPOINTS) {
        if (width < BREAKPOINTS[bp]) return bp;
    }
    return "xl";
};

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
const useBreakpoint = (options: UseBreakpointOptions = {}): UseBreakpointResult => {
    const { effect, deps = [], node } = options;

    const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
        typeof window === "undefined" ? "xl" : getBreakpoint(window.innerWidth)
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const queries = ORDERED_BREAKPOINTS.map((bp) =>
            window.matchMedia(`(max-width: ${BREAKPOINTS[bp] - 1}px)`)
        );
        const handleChange = () => setBreakpoint(getBreakpoint(window.innerWidth));

        queries.forEach((query) => query.addEventListener("change", handleChange));
        handleChange();

        return () => {
            queries.forEach((query) => query.removeEventListener("change", handleChange));
        };
    }, []);

    // Kept in a ref so identity changes on `effect` don't force a re-run on their own.
    const effectRef = useRef(effect);
    effectRef.current = effect;

    useEffect(() => {
        return effectRef.current?.(breakpoint);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breakpoint, ...deps]);

    const resolvedNode = useMemo(() => {
        if (node === undefined) return null;
        return typeof node === "function" ? (node as (breakpoint: Breakpoint) => ReactNode)(breakpoint) : node;
    }, [node, breakpoint]);

    return { breakpoint, node: resolvedNode };
};

export default useBreakpoint;
