import { AccentConfig } from '../../utils/colors';
import { CSSProperties } from 'react';
// FIX: Import missing `BorderRadius` type.
import { BorderRadius, Elevation } from "../../utils";

/**
 * @typedef {object} ComponentProps
 * @description Base props for all components, including styling and accessibility attributes.
 * @property {string} [className] Additional CSS class for the component.
 * @property {Elevation} [elevation] The elevation level for box-shadow effects.
 * @property {BorderRadius} [borderRadius] The border radius of the component.
 * @property {CSSProperties} [style] Custom inline CSS styles.
 * @property {string | number} [data-id] A data-id attribute for testing or identification.
 */
interface ComponentProps extends AccentConfig {
    className?: string;
    elevation?: Elevation;
    borderRadius?: BorderRadius;
    style?: CSSProperties;
    "data-id"?: string | number;
};

export default ComponentProps;