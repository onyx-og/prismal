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

export default useScrollPosition;