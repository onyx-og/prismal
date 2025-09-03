/**
 * Custom hook to check if the user has scrolled past a specific position.
 * @param {number} threshold - The vertical scroll position in pixels to trigger the state update.
 * @returns {boolean} - True if the scroll position is at or past the threshold, false otherwise.
 */
export declare const useScrollThreshold: (threshold: number) => boolean;
/**
 * Tracks the (dynamic) position from the top of the viewport of a (ref) element
 * @param elementRef
 * @param refTrigger required to manage the reference presence and its mutation
 * @returns boolean
 */
export declare const useElScrollThreshold: (elementRef: React.MutableRefObject<HTMLElement | undefined>, refTrigger: boolean | string | number, offset?: number, threshold?: number, scrollEl?: HTMLElement | Document) => boolean;
export declare const useElScrollPosition: (elementRef: React.MutableRefObject<HTMLElement | undefined>, refTrigger: boolean | string | number, scrollEl?: HTMLElement | Document) => number | undefined;
