import { FC, ReactNode } from "react";
import ComponentProps from "../Component";
export interface ParallaxItemProps extends ComponentProps {
    children?: ReactNode;
    factor?: number;
}
declare const ParallaxItem: FC<ParallaxItemProps>;
export default ParallaxItem;
