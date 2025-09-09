import React from "react";

export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4 // | 5
export const setElevation = (className: string, elevation: Elevation = 0 ) => {
    let _className = `${className}  elevation-${
        elevation < 6 ? elevation : 5
    }`
    return _className;
}
export const setPadding = (
    style: {[key: string]: any},
    padding: "none" | "xs" | "s" | "m" | "l" | "xl"
) => {
    let style_ : {[key: string]: any} = {},
        padding_: string;
    
    switch(padding) {
        case "none":
            padding_ = "0";
            break;
        case "xs":
            padding_ = "0.25rem";
            break;
        case "s":
            padding_ = "0.5rem";
            break;
        case "m":
            padding_ = "0.75rem";
            break;
        case "l":
            padding_ = "1rem";
            break;
        default:
            padding_ = "0.25rem";
    }
    style_['--box-padding'] = padding_;

    return Object.assign(style, style_);
}
export const setBoxElevation = (
    style: {[key: string]: any},
    elevation: Elevation = 0
) => {
    let _style: {[key: string]: any} = {},
        boxElevation: string = "0",
        boxElevationSecondary: string = "0";
    switch(elevation) {
        case 0:
           boxElevation = "0"
           boxElevationSecondary = "0"
            break;
        case 1:
           boxElevation = "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px";
           boxElevationSecondary = "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
           break;
        case 2:
           boxElevation = "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
           boxElevationSecondary = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
           break;
        case 3:
           boxElevation = "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
           boxElevationSecondary = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
           break;
        case 4:
           boxElevation = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
           boxElevationSecondary = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
           break;
        // case 5:
        //    boxElevation = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
        //    break;
        default:
            boxElevation = "0";
    }

    _style['--box-elevation-primary'] = boxElevation;
    _style['--box-elevation-secondary'] = boxElevationSecondary;

    return Object.assign(style, _style);
}
export type BorderRadius = "none" | "xs" | "sm" | "md" 
    | "lg" | "xl" | "full";

export const setBorderRadius = (
    style: {[key: string]: any},
    borderRadius: BorderRadius = "xs"
) => {
    let _style: {[key: string]: any} = {},
        _borderRadius;

    switch(borderRadius) {
        case "none":
            _borderRadius = "0"
        break;
        case "xs":
            _borderRadius = ".25rem"
        break;
        case "sm":
            _borderRadius = ".5rem"
        break;
        case "md":
            _borderRadius = ".5rem"
        break;
        case "lg":
            _borderRadius = ".75rem"
        break;
        case "xl":
            _borderRadius = "1rem"
        break;
        case "full":
            _borderRadius = "2.5rem"
        break;
    }
    _style['--border-radius'] = _borderRadius;

    return Object.assign(style, _style);
}

export const getRandId = () => {
    return Math.random().toString(36).substring(2);
}

/**
 * Recursively traverses a component's children, finds elements of a specific type,
 * and clones them with new props.
 * @param {React.ReactNode} children The children to traverse.
 * @param {React.ElementType} targetType The component type to target.
 * @param {object} newProps The props to apply to the target components.
 * @returns {React.ReactNode} The updated children tree.
 */
export const reCloneChildren = (
    children: React.ReactNode, targetType: React.ElementType,
    newProps: {[key: string]: any}
): React.ReactNode => {
  // Normalize children into an array to handle different input types (single, array, etc.)
  return React.Children.map(children, (child) => {
    // Check if the child is a valid React element and not a string, number, etc.
    if (!React.isValidElement(child)) {
      return child; // Return non-elements as they are
    }

    // Is this the component we're looking for?
    if (child.type === targetType) {
      return React.cloneElement(child, newProps);
    }

    // Does this child have its own nested children?
    if (child.props.children) {
      // Recursively call the function on the nested children
      const newNestedChildren = reCloneChildren(
        child.props.children,
        targetType,
        newProps
      );

      // Clone the current element, passing the newly processed children
      return React.cloneElement(child, {}, newNestedChildren);
    }

    // If no match and no nested children to process, return the child as is
    return child;
  });
}