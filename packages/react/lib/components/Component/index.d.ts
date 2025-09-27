import { AccentConfig } from '../../utils/colors';
import { CSSProperties } from 'react';
import { BorderRadius, Elevation } from "../../utils";
interface ComponentProps extends AccentConfig {
    className?: string;
    elevation?: Elevation;
    borderRadius?: BorderRadius;
    style?: CSSProperties;
    "data-id"?: string | number;
}
export default ComponentProps;
