import React from "react";
/**
 * @function useIntersectionObserver
 * @description A custom hook that uses the Intersection Observer API to detect when an element is in the viewport.
 * @param {React.RefObject<HTMLElement | null>} elementRef A ref to the element to observe.
 * @param {boolean | string | number} refTrigger A trigger to re-run the effect when the ref is set.
 * @param {IntersectionObserverInit} [observerOptions] Options for the Intersection Observer.
 * @returns {boolean} True if the element is intersecting, false otherwise.
 * @example
 * const myRef = useRef(null);
 * const [refSet, setRefSet] = useState(false);
 * const isVisible = useIntersectionObserver(myRef, refSet);
 * <div ref={(node) => { myRef.current = node; setRefSet(true); }}>...</div>
 */
declare const useIntersectionObserver: (elementRef: React.RefObject<HTMLElement | null>, refTrigger: boolean | string | number, observerOptions?: IntersectionObserverInit) => boolean;
export default useIntersectionObserver;
