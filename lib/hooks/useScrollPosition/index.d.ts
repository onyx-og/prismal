import { RefObject } from 'react';
/**
 * @function useScrollThreshold
 * @description Custom hook to check if the user has scrolled past a specific position.
 * @param {number} threshold The vertical scroll position in pixels to trigger the state update.
 * @returns {boolean} True if the scroll position is at or past the threshold, false otherwise.
 * @example
 * const isScrolled = useScrollThreshold(100);
 */
export declare const useScrollThreshold: (threshold: number) => boolean;
/**
 * @function useElScrollThreshold
 * @description Tracks if an element has scrolled past a certain threshold in the viewport.
 * @param {RefObject<HTMLElement | null>} elementRef Ref to the element to track.
 * @param {boolean | string | number} refTrigger A trigger to re-run the effect when the ref is set.
 * @param {number} [offset=0] An offset to apply to the element's position.
 * @param {number} [threshold=0] The scroll threshold from the top of the viewport.
 * @param {HTMLElement | Document} [scrollEl=document] The element to attach the scroll listener to.
 * @returns {boolean} True if the element has scrolled past the threshold.
 * @example
 * const myRef = useRef(null);
 * const [refSet, setRefSet] = useState(false);
 * const isPast = useElScrollThreshold(myRef, refSet, 50);
 */
export declare const useElScrollThreshold: (elementRef: RefObject<HTMLElement | null>, refTrigger: boolean | string | number, offset?: number, threshold?: number, scrollEl?: HTMLElement | Document) => boolean;
/**
 * @function useElScrollPosition
 * @description Tracks the vertical scroll position of an element relative to the viewport.
 * @param {RefObject<HTMLElement | null>} elementRef Ref to the element to track.
 * @param {boolean | string | number} refTrigger A trigger to re-run the effect when the ref is set.
 * @param {HTMLElement | Document} [scrollEl=document] The element to attach the scroll listener to.
 * @returns {number | undefined} The vertical scroll position of the element.
 * @example
 * const myRef = useRef(null);
 * const [refSet, setRefSet] = useState(false);
 * const position = useElScrollPosition(myRef, refSet);
 */
export declare const useElScrollPosition: (elementRef: RefObject<HTMLElement | null>, refTrigger: boolean | string | number, scrollEl?: HTMLElement | Document) => number | undefined;
