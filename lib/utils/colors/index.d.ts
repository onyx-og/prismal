export interface AccentConfig {
    accent?: string;
    accentLight?: string;
    accentDark?: string;
}
declare const setAccentStyle: (style: {
    [key: string]: any;
}, conf: AccentConfig) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
declare const accentStyle: (conf: AccentConfig) => {
    [key: string]: any;
};
/**
 * Takes a 3 or 6-digit hex color code,
 * and an optional loating-point number representing the alpha value (0-1)
*/
export declare const hex2rgba: (hex: string, alpha: number) => string | undefined;
export { accentStyle, setAccentStyle };
