/// <reference types="react" />
import "./index.scss";
import ComponentProps from "../Component";
export interface TooltipProps extends ComponentProps {
    children?: React.ReactNode;
    text: string;
    accent?: never;
    accentDark?: never;
    accentLight?: never;
}
declare const Tooltip: (props: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export default Tooltip;
