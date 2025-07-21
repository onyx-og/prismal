export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;
export declare const setElevation: (className: string, elevation?: Elevation) => string;
export type BorderRadius = "none" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "full";
export declare const setBorderRadius: (style: {
    [key: string]: any;
}, borderRadius?: BorderRadius) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
