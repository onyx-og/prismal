import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the user has scrolled past a specific position.
 * @param {number} threshold - The vertical scroll position in pixels to trigger the state update.
 * @returns {boolean} - True if the scroll position is at or past the threshold, false otherwise.
 */
const useScrollPosition = (threshold: number) => {
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
export const useElScrollPosition = (
    elementRef: React.MutableRefObject<HTMLElement | undefined>,
    refTrigger: boolean | string | number
) => {
    const [isScrolledAbove, setIsScrolledAbove] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (refTrigger && elementRef.current) {
                let threshold = elementRef.current.getBoundingClientRect().top
                    + elementRef.current.clientHeight/2;
                // Check if the current scroll position is at or past the threshold
                if (scrollY < threshold) {
                    setIsScrolledAbove(true);
                } else {
                    setIsScrolledAbove(false);
                }
            } else {
                setIsScrolledAbove(false);
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [refTrigger]); // Re-run effect if the threshold changes

    return isScrolledAbove;
}

export default useScrollPosition;