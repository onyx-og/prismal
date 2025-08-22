/// <reference types="react" />
import { AccentConfig } from 'utils/colors';
import { BorderRadius, Elevation } from "../../utils";
interface ComponentProps extends AccentConfig {
    className?: string;
    elevation?: Elevation;
    borderRadius?: BorderRadius;
    style?: React.CSSProperties;
    "data-id"?: string | number;
}
export default ComponentProps;
