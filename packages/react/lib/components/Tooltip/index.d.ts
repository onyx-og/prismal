import "./index.scss";
import ComponentProps from "../Component";
import { ReactNode, FC } from "react";
export interface TooltipProps extends ComponentProps {
    children?: ReactNode;
    text: string;
}
declare const Tooltip: FC<TooltipProps>;
export default Tooltip;
