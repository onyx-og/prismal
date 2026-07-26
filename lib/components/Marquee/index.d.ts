import { ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} MarqueeRef
 * @description The ref object exposed by the Marquee component.
 * @property {() => void} pause A function to pause the marquee animation.
 * @property {() => void} play A function to play the marquee animation.
 */
type MarqueeRef = {
    pause: () => void;
    play: () => void;
};
/**
 * @typedef {object} MarqueeProps
 * @description Props for the Marquee component.
 */
export interface MarqueeProps extends ComponentProps {
    /** The content to be scrolled. */
    children: ReactNode;
    /** If true, the animation pauses on mouse hover. */
    pauseOnHover?: boolean;
    /** A decimal from 0 to 1 representing the scroll speed. */
    speed?: number;
    /** Click event handler for the marquee. */
    onClick?: () => void;
}
/**
 * @component Marquee
 * @description A component that creates a scrolling marquee effect for its children.
 * @param {MarqueeProps} props The component props.
 * @param {ForwardedRef<MarqueeRef>} ref The forwarded ref to control the marquee.
 * @returns {React.ReactElement} The rendered Marquee component.
 * @example
 * <Marquee speed={5}>
 *   <p>This is scrolling text.</p>
 * </Marquee>
 */
declare const Marquee: import("react").ForwardRefExoticComponent<MarqueeProps & import("react").RefAttributes<MarqueeRef>>;
export default Marquee;
