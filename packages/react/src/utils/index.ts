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
export type BorderRadius = "none" | "extra-small" | "small" | "medium" 
    | "large" | "extra-large" | "full";

export const setBorderRadius = (
    style: {[key: string]: any},
    borderRadius: BorderRadius = "extra-small"
) => {
    let _style: {[key: string]: any} = {},
        _borderRadius;

    switch(borderRadius) {
        case "none":
            _borderRadius = "0"
        break;
        case "extra-small":
            _borderRadius = ".25rem"
        break;
        case "small":
            _borderRadius = ".5rem"
        break;
        case "medium":
            _borderRadius = ".5rem"
        break;
        case "large":
            _borderRadius = ".75rem"
        break;
        case "extra-large":
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