export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4;
export declare const setElevation: (className: string, elevation?: Elevation) => string;
export declare const getBoxElevation: (elevation?: Elevation) => string[];
export declare const getPadding: (padding?: 'xs' | "s" | 'm' | 'l') => number;
export type BorderRadius = "none" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "full";
export declare const getBorderRadius: (borderRadius?: BorderRadius) => string;
