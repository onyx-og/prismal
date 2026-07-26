/**
 * @typedef {object} AccentConfig
 * @description Configuration for accent colors.
 * @property {string} [accent] The primary accent color.
 * @property {string} [accentLight] The light variant of the accent color.
 * @property {string} [accentDark] The dark variant of the accent color.
 */
export interface AccentConfig {
    accent?: string;
    accentLight?: string;
    accentDark?: string;
}
/**
 * @function setAccentStyle
 * @description Applies accent color CSS variables to a style object.
 * @param {{[key: string]: any}} style The style object to modify.
 * @param {AccentConfig} conf The accent color configuration.
 * @returns {{[key: string]: any}} The modified style object.
 */
declare const setAccentStyle: (style: {
    [key: string]: any;
}, conf: AccentConfig) => {
    [key: string]: any;
} & {
    [key: string]: any;
};
/**
 * @function hex2rgba
 * @description Converts a 3 or 6-digit hex color code to an rgba or rgb string.
 * @param {string} hex The hex color code (e.g., '#fff' or '#ffffff').
 * @param {number} [alpha] An optional alpha value (0-1).
 * @returns {string | undefined} The rgba or rgb string, or undefined if the hex is invalid.
 * @example
 * hex2rgba('#fff', 0.5) // 'rgba(255, 255, 255, 0.5)'
*/
export declare const hex2rgba: (hex: string, alpha: number) => string | undefined;
export { setAccentStyle };
