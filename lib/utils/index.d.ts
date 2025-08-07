export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4;
export declare const setElevation: (className: string, elevation?: Elevation) => string;
export declare const setPadding: (style: {
    [key: string]: any;
}, padding: "xs" | "s" | "m" | "l" | "xl") => {
    [key: string]: any;
} & {
    [key: string]: any;
};
export declare const setBoxElevation: (style: {
    [key: string]: any;
}, elevation?: Elevation) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
export type BorderRadius = "none" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "full";
export declare const setBorderRadius: (style: {
    [key: string]: any;
}, borderRadius?: BorderRadius) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
