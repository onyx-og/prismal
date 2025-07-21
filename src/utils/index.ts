export * from "./colors";
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5
export const setElevation = (className: string, elevation: Elevation = 0 ) => {
    let _className = `${className}  elevation-${
        elevation < 6 ? elevation : 5
    }`
    return _className;
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