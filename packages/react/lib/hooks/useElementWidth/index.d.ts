import { RefObject } from 'react';
/**
 * @function useElementWidth
 * @description A custom hook that tracks the width of a DOM element, updating on resize and content changes.
 * @param {RefObject<HTMLElement | undefined | null>} ref A ref to the element to measure.
 * @returns {number} The current width of the element.
 * @example
 * const myRef = useRef(null);
 * const width = useElementWidth(myRef);
 * <div ref={myRef}>Width is {width}px</div>
 */
declare const useElementWidth: (ref: RefObject<HTMLElement | undefined | null>) => number;
export default useElementWidth;
