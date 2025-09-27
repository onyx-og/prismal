export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4;
export declare const setElevation: (className: string, elevation?: Elevation) => string;
export declare const setPadding: (style: {
    [key: string]: any;
}, padding: "none" | "xs" | "s" | "m" | "l" | "xl") => {
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
export type BorderRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
export declare const setBorderRadius: (style: {
    [key: string]: any;
}, borderRadius?: BorderRadius) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
export declare const getRandId: () => string;
/**
 * Recursively traverses a component's children, finds elements of a specific type,
 * and clones them with new props.
 * @param {React.ReactNode} children The children to traverse.
 * @param {React.ElementType} targetType The component type to target.
 * @param {object} newProps The props to apply to the target components.
 * @returns {React.ReactNode} The updated children tree.
 */
export declare const reCloneChildren: (children: React.ReactNode, targetType: React.ElementType, newProps: {
    [key: string]: any;
}) => React.ReactNode;
