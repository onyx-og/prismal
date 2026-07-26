import { RefObject } from 'react';
/**
 * @function useCursorPosition
 * @description A custom hook that tracks the mouse cursor's position relative to a container element.
 * @param {RefObject<HTMLElement | null>} containerRef A ref to the container element.
 * @returns {RefObject<{ x: number, y: number }>} A ref object containing the cursor's x and y coordinates.
 * @example
 * const containerRef = useRef(null);
 * const cursorPosition = useCursorPosition(containerRef);
 * // Use cursorPosition.current.x and cursorPosition.current.y
 */
export declare const useCursorPosition: (containerRef: RefObject<HTMLElement | null>) => RefObject<{
    x: number;
    y: number;
}>;
