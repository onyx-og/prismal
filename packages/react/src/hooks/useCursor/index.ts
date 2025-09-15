import {RefObject, useEffect, useRef}  from 'react';

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