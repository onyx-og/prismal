import { FC, ReactNode } from "react";
import ComponentProps from "../Component";
/**
 * @typedef {object} ParallaxItemProps
 * @description Props for the ParallaxItem component.
 * @property {ReactNode} [children] The content to be affected by the parallax effect.
 * @property {number} [factor=0.1] The parallax scroll factor. A value between -1 and 1.
 */
export interface ParallaxItemProps extends ComponentProps {
    children?: ReactNode;
    factor?: number;
}
/**
 * @component ParallaxItem
 * @description A component that creates a parallax scrolling effect on its children.
 * @param {ParallaxItemProps} props The component props.
 * @returns {React.ReactElement} The rendered ParallaxItem component.
 * @example
 * <ParallaxItem factor={0.2}>
 *   <img src="image.jpg" alt="Parallax" />
 * </ParallaxItem>
 */
declare const ParallaxItem: FC<ParallaxItemProps>;
export default ParallaxItem;
