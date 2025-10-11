import { ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
type MarqueeRef = {
    pause: () => void;
    play: () => void;
};
export interface MarqueeProps extends ComponentProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    /** Decimal from 0 to 1 */
    speed?: number;
    onClick?: () => void;
}
declare const Marquee: import("react").ForwardRefExoticComponent<MarqueeProps & import("react").RefAttributes<MarqueeRef>>;
export default Marquee;
