import { lighten, darken } from 'color2k';

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
const setAccentStyle = (style: {[key: string]: any}, conf: AccentConfig ) => {
    const { accent, accentLight, accentDark } = conf;
    let style_: {[key: string]: any} = {};

    if (accent) {
        style_['--color-primary'] = accent;
        style_['--color-primary-light'] = lighten(accent, 0.15);
        style_['--color-primary-dark'] = darken(accent, 0.15)
    }

    if (accentLight) {
        style_['--color-primary-light'] = accentLight
    }

    if (accentDark) {
        style_['--color-primary-dark'] = accentDark;
    }

    return Object.assign(style, style_);
}

/** 
 * @function hex2rgba
 * @description Converts a 3 or 6-digit hex color code to an rgba or rgb string.
 * @param {string} hex The hex color code (e.g., '#fff' or '#ffffff').
 * @param {number} [alpha] An optional alpha value (0-1).
 * @returns {string | undefined} The rgba or rgb string, or undefined if the hex is invalid.
 * @example
 * hex2rgba('#fff', 0.5) // 'rgba(255, 255, 255, 0.5)'
*/
export const hex2rgba = (hex: string, alpha: number) => {
    if (hex[0] !== '#') return undefined;
   
    const stringValues = (hex.length === 4)
          ? [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)].map(n => `${n}${n}`)
          : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
    const intValues = stringValues.map(n => parseInt(n, 16));
   
    return (typeof alpha === 'number' && alpha >= 0 && alpha <= 1)
      ? `rgba(${intValues.join(', ')}, ${alpha})`
      : `rgb(${intValues.join(', ')})`;
}

export {setAccentStyle};