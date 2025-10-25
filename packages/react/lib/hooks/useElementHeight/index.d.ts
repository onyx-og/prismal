import { RefObject } from 'react';
/**
 * @function useElementHeight
 * @description A custom hook that tracks the height of a DOM element, updating on resize and content changes.
 * @param {RefObject<HTMLElement>} ref A ref to the element to measure.
 * @returns {number} The current height of the element.
 * @example
 * const myRef = useRef(null);
 * const height = useElementHeight(myRef);
 * <div ref={myRef}>Height is {height}px</div>
 */
declare const useElementHeight: (ref: RefObject<HTMLElement>) => number;
export default useElementHeight;
