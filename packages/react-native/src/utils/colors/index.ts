// import { lighten, darken } from 'color2k';
export interface AccentConfig {
    accent?: string;
    accentLight?: string;
    accentDark?: string;
}

const setAccentStyle = (style: {[key: string]: any}, conf: AccentConfig ) => {
    return Object.assign(style, accentStyle(conf));
}

const accentStyle = (conf: AccentConfig) => {
    const { accent, accentLight, accentDark } = conf;
    let style: {[key: string]: any} = {};

    if (accent) {
        style['--color-primary'] = accent;
        // style['--color-primary-light'] = lighten(accent, 0.15);
        // style['--color-primary-dark'] = darken(accent, 0.15)
    }

    if (accentLight) {
        style['--color-primary-light'] = accentLight
    }

    if (accentDark) {
        style['--color-primary-dark'] = accentDark;
    }

    return style;
}

/** 
 * Takes a 3 or 6-digit hex color code, 
 * and an optional loating-point number representing the alpha value (0-1)
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

export {accentStyle, setAccentStyle};