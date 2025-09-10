import { AccentConfig } from '../../utils/colors';
import { StyleProp } from "react-native";

import { BorderRadius, Elevation } from "../../utils";
interface ComponentProps<T> extends AccentConfig {
    // className?: string;
    style?: StyleProp<T>;
    elevation?: Elevation;
    borderRadius?: BorderRadius;
};

export default ComponentProps;