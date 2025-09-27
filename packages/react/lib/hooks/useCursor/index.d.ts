import { RefObject } from 'react';
export declare const useCursorPosition: (containerRef: RefObject<HTMLElement | null>) => RefObject<{
    x: number;
    y: number;
}>;
