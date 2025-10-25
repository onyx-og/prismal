import {RefObject, useEffect, useRef}  from 'react';

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
export const useCursorPosition = (containerRef: RefObject<HTMLElement | null>) => {
    // Use a ref to store the position, avoiding state updates and re-renders
    const cursorPositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (event: MouseEventInit) => {
            const containerRect = container.getBoundingClientRect();
            const x = (event.clientX || 0) - containerRect.left;
            const y = (event.clientY || 0) - containerRect.top;

            // Mutate the ref directly without triggering a re-render
            cursorPositionRef.current = { x, y };
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, [containerRef]);

    return cursorPositionRef;
}