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
const useIntersectionObserver = (
    elementRef: React.RefObject<HTMLElement | null>,
    refTrigger: boolean | string | number,
    observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }
) => {
    const [isIntersecting, setIsIntersecting] = React.useState(false);

    const intersectionCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            } else {
                setIsIntersecting(false);
            }
        });
    }

    React.useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        }
    },[refTrigger, elementRef, observerOptions]); // eslint-disable-line react-hooks/exhaustive-deps

    return isIntersecting;
    
}
export default useIntersectionObserver;