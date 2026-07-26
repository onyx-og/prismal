import "./index.scss";
import ComponentProps from "../Component";
import { ReactNode, FC } from "react";
/**
 * @typedef {object} TooltipProps
 * @description Props for the Tooltip component.
 */
export interface TooltipProps extends ComponentProps {
    /** The element that the tooltip is attached to. */
    children?: ReactNode;
    /** The text to display in the tooltip. */
    text: string;
}
/**
 * @component Tooltip
 * @description A component that displays a tooltip on hover, built on top of the Dropdown component.
 * @param {TooltipProps} props The component props.
 * @returns {React.ReactElement} The rendered Tooltip component.
 * @example
 * <Tooltip text="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
declare const Tooltip: FC<TooltipProps>;
export default Tooltip;
