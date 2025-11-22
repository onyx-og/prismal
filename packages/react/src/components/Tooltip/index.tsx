import Dropdown from "components/Dropdown";
import "./index.scss";
import ComponentProps from "../Component";
import { setBorderRadius } from 'utils/';
import { ReactNode, FC } from "react";

/**
 * @typedef {object} TooltipProps
 * @description Props for the Tooltip component.
 */
export interface TooltipProps extends ComponentProps {
    /** The element that the tooltip is attached to. */
    children?: ReactNode; // content
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
const Tooltip: FC<TooltipProps> = (props) => {
    const {
        children, text,
        className, style,
        borderRadius
    } = props;

    let style_: { [key: string]: any } = {};
    if (borderRadius) setBorderRadius(style_, borderRadius);

    if (style) style_ = { ...style_, ...style };

    let className_ = 'prismal-tooltip';
    if (className) className_ = `${className_} ${className}`;

    return <Dropdown style={style_} className={className_} toggleElement={children}>
        {text}
    </Dropdown>
}

export default Tooltip;