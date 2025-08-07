/// <reference types="react" />
import { AccentConfig } from 'utils/colors';
import { BorderRadius, Elevation } from "../../utils";
interface ComponentProps extends AccentConfig {
    className?: string;
    elevation?: Elevation;
    borderRadius?: BorderRadius;
    style?: React.CSSProperties;
}
export default ComponentProps;
