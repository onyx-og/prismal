import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the user has scrolled past a specific position.
 * @param {number} threshold - The vertical scroll position in pixels to trigger the state update.
 * @returns {boolean} - True if the scroll position is at or past the threshold, false otherwise.
 */
export const useScrollThreshold = (threshold: number) => {
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
 * Tracks the (dynamic) position from the top of the viewport of a (ref) element
 * @param elementRef 
 * @param refTrigger required to manage the reference presence and its mutation
 * @returns boolean
 */
export const useElScrollThreshold = (
    elementRef: React.MutableRefObject<HTMLElement | undefined>,
    refTrigger: boolean | string | number,
    offset: number = 0,
    threshold: number = 0, // top of the viewport
    scrollEl: HTMLElement | Document = document,
) => {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (refTrigger && elementRef.current) {
                // let threshold = elementRef.current.getBoundingClientRect().top
                //     + elementRef.current.clientHeight/2;
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
    }, [refTrigger]); // Re-run when trigger changes

    return isScrolledPast;
}

export const useElScrollPosition = (
    elementRef: React.MutableRefObject<HTMLElement | undefined>,
    refTrigger: boolean | string | number,
    scrollEl: HTMLElement | Document = document,
) => {
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
    }, [refTrigger]);

    return scrollPosition;
}