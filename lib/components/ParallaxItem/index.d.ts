import React from "react";
import ComponentProps from "components/Component";
export interface ParallaxItemProps extends ComponentProps {
    children?: React.ReactNode;
    factor?: number;
}
declare const ParallaxItem: React.FC<ParallaxItemProps>;
export default ParallaxItem;
