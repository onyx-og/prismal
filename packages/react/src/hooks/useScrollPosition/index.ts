import { RefObject, useState, useEffect } from 'react';

/**
 * @function useScrollThreshold
 * @description Custom hook to check if the user has scrolled past a specific position.
 * @param {number} threshold The vertical scroll position in pixels to trigger the state update.
 * @returns {boolean} True if the scroll position is at or past the threshold, false otherwise.
 * @example
 * const isScrolled = useScrollThreshold(100);
 */
export const useScrollThreshold = (threshold: number): boolean => {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the current scroll position is at or past the threshold
            if (window.scrollY > threshold) {
                setIsScrolledPast(true);
            } else {
                setIsScrolledPast(false);
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]); // Re-run effect if the threshold changes

    return isScrolledPast;
}

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
export const useElScrollThreshold = (
    elementRef: RefObject<HTMLElement | null>,
    refTrigger: boolean | string | number,
    offset: number = 0,
    threshold: number = 0, // top of the viewport
    scrollEl: HTMLElement | Document = document,
): boolean => {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (refTrigger && elementRef.current) {
                let elPos = elementRef.current.getBoundingClientRect().top
                    + (offset);
                // Check if the current scroll position is at or past the threshold
                if (elPos <= threshold) {
                    setIsScrolledPast(true);
                } else {
                    setIsScrolledPast(false);
                }
            } else {
                setIsScrolledPast(false);
            }
        };

        // Add the event listener when the component mounts
        scrollEl.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            scrollEl.removeEventListener('scroll', handleScroll);
        };
    }, [refTrigger, elementRef, offset, threshold, scrollEl]); // Re-run when trigger changes

    return isScrolledPast;
}

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
export const useElScrollPosition = (
    elementRef: RefObject<HTMLElement | null>,
    refTrigger: boolean | string | number,
    scrollEl: HTMLElement | Document = document,
): number | undefined => {
    const [scrollPosition, setScrollPosition] = useState<number>();

    useEffect( () => {
        const handleScroll = () => {
            if (refTrigger && elementRef.current) {
                let elPos = elementRef.current.getBoundingClientRect().top;
                setScrollPosition(elPos);
            }
        }

        scrollEl.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            scrollEl.removeEventListener('scroll', handleScroll);
        };
    }, [refTrigger, elementRef, scrollEl]);

    return scrollPosition;
}