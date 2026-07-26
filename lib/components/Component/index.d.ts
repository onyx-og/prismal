import { AccentConfig } from '../../utils/colors';
import { CSSProperties } from 'react';
import { BorderRadius, Elevation } from "../../utils";
/**
 * @typedef {object} ComponentProps
 * @description Base props for all components, including styling and accessibility attributes.
 */
interface ComponentProps extends AccentConfig {
    /** Additional CSS class for the component. */
    className?: string;
    /** The elevation level for box-shadow effects. */
    elevation?: Elevation;
    /** The border radius of the component. */
    borderRadius?: BorderRadius;
    /** Custom inline CSS styles. */
    style?: CSSProperties;
    /** A data-id attribute for testing or identification. */
    "data-id"?: string | number;
}
export default ComponentProps;
