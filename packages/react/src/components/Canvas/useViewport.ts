import {
    PointerEvent as ReactPointerEvent,
    RefObject,
    WheelEvent as ReactWheelEvent,
    useCallback,
    useRef,
    useState,
} from "react";

export interface Viewport {
    /** Pan offset, in screen px, applied before scale (`screen = pan + content * scale`). */
    x: number;
    y: number;
    scale: number;
}

export const DEFAULT_VIEWPORT: Viewport = { x: 0, y: 0, scale: 1 };

export interface UseViewportOptions {
    /** Controlled viewport. Omit to let the hook manage pan/zoom internally. */
    viewport?: Viewport;
    onViewportChange?: (viewport: Viewport) => void;
    minZoom?: number;
    maxZoom?: number;
    /** Multiplier applied per zoom-in step (button or ctrl/pinch-wheel notch). Defaults to 1.2. */
    zoomStep?: number;
    panEnabled?: boolean;
    zoomEnabled?: boolean;
}

interface PanState {
    pointerId: number;
    startClient: { x: number; y: number };
    startViewport: Viewport;
    moved: boolean;
}

const PAN_THRESHOLD_PX = 4;
// Converts a wheel-zoom's deltaY into a smooth multiplicative scale factor.
const ZOOM_WHEEL_SENSITIVITY = 0.0015;

/**
 * @function useViewport
 * @description Drives Canvas's pan (drag-the-background, or wheel/trackpad scroll) and zoom
 * (ctrl/cmd+wheel — how browsers report trackpad pinch — or the zoom buttons), zooming toward the
 * cursor so the point under it stays put. Controlled/uncontrolled like `Tabs`: pass `viewport` +
 * `onViewportChange` to own the value, or omit both to let the hook manage it internally.
 */
export const useViewport = (
    containerRef: RefObject<SVGSVGElement | null>,
    options: UseViewportOptions = {},
) => {
    const {
        viewport: viewportProp, onViewportChange,
        minZoom = 0.25, maxZoom = 2.5, zoomStep = 1.2,
        panEnabled = true, zoomEnabled = true,
    } = options;

    const isControlled = viewportProp !== undefined;
    const [internalViewport, setInternalViewport] = useState<Viewport>(DEFAULT_VIEWPORT);
    const viewport = isControlled ? viewportProp : internalViewport;

    const setViewport = useCallback((next: Viewport) => {
        if (isControlled) onViewportChange?.(next);
        else setInternalViewport(next);
    }, [isControlled, onViewportChange]);

    const panState = useRef<PanState | null>(null);
    // Read by Canvas's background-click handler so a pan gesture's trailing click doesn't also
    // clear selection — the same trick `useCanvas` uses for node drag vs. click-to-select.
    const lastPanMoved = useRef(false);

    const handleBackgroundPointerDown = useCallback((event: ReactPointerEvent<SVGSVGElement>) => {
        if (!panEnabled || event.target !== event.currentTarget) return;
        (event.target as Element).setPointerCapture?.(event.pointerId);
        panState.current = {
            pointerId: event.pointerId,
            startClient: { x: event.clientX, y: event.clientY },
            startViewport: viewport,
            moved: false,
        };
    }, [panEnabled, viewport]);

    const handlePointerMove = useCallback((event: ReactPointerEvent) => {
        const pan = panState.current;
        if (!pan || pan.pointerId !== event.pointerId) return;
        const dx = event.clientX - pan.startClient.x;
        const dy = event.clientY - pan.startClient.y;
        if (Math.hypot(dx, dy) > PAN_THRESHOLD_PX) pan.moved = true;
        setViewport({ ...pan.startViewport, x: pan.startViewport.x + dx, y: pan.startViewport.y + dy });
    }, [setViewport]);

    const handlePointerUp = useCallback((event: ReactPointerEvent) => {
        const pan = panState.current;
        if (!pan || pan.pointerId !== event.pointerId) return;
        panState.current = null;
        lastPanMoved.current = pan.moved;
    }, []);

    /** Rescales around a client-space point, keeping the content under it fixed on screen. */
    const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
        if (!zoomEnabled) return;
        const rect = containerRef.current?.getBoundingClientRect();
        const localX = rect ? clientX - rect.left : clientX;
        const localY = rect ? clientY - rect.top : clientY;
        const nextScale = Math.min(maxZoom, Math.max(minZoom, viewport.scale * factor));
        const appliedFactor = nextScale / viewport.scale;
        setViewport({
            scale: nextScale,
            x: localX - (localX - viewport.x) * appliedFactor,
            y: localY - (localY - viewport.y) * appliedFactor,
        });
    }, [containerRef, viewport, minZoom, maxZoom, zoomEnabled, setViewport]);

    const handleWheel = useCallback((event: ReactWheelEvent<SVGSVGElement>) => {
        if (event.ctrlKey || event.metaKey) {
            if (!zoomEnabled) return;
            event.preventDefault();
            zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * ZOOM_WHEEL_SENSITIVITY));
        } else if (panEnabled) {
            event.preventDefault();
            setViewport({ ...viewport, x: viewport.x - event.deltaX, y: viewport.y - event.deltaY });
        }
    }, [zoomEnabled, panEnabled, zoomAt, viewport, setViewport]);

    const zoomTowardCenter = useCallback((factor: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    }, [containerRef, zoomAt]);

    const zoomIn = useCallback(() => zoomTowardCenter(zoomStep), [zoomTowardCenter, zoomStep]);
    const zoomOut = useCallback(() => zoomTowardCenter(1 / zoomStep), [zoomTowardCenter, zoomStep]);
    const resetView = useCallback(() => setViewport(DEFAULT_VIEWPORT), [setViewport]);

    return {
        viewport,
        lastPanMoved,
        handleBackgroundPointerDown,
        handlePointerMove,
        handlePointerUp,
        handleWheel,
        zoomIn,
        zoomOut,
        resetView,
    };
};
