/// <reference types="react" />
import { InputProps, InputRefType } from "../types";
import "./index.scss";
/**
 * @typedef {object} RangeProps
 * @description Props for the Range component.
 */
export interface RangeProps extends InputProps {
    /** The orientation of the range slider. */
    type?: "horizontal" | "vertical";
    /** The minimum value of the range. */
    min?: number;
    /** The maximum value of the range. */
    max?: number;
    /** The step increment of the range. */
    step?: number;
    /** The initial value of the range. */
    value?: number;
    /** Callback for when the range value changes. */
    onChange?: (arg?: number) => void;
    /** If true, displays the current value indicator. */
    showIndicator?: boolean;
    /** If true, renders a dot marker at the current value's position on the track. */
    dot?: boolean;
    /** If true, displays the max value indicator. */
    showMaxIndicator?: boolean;
    /** A suffix appended to the displayed value, or a function that returns one. */
    suffix?: string | ((value: number) => string);
    /** A function to format the displayed value. */
    indicatorFn?: (value: number) => string;
}
/**
 * @component Range
 * @description A range slider input component for forms.
 * @param {RangeProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered Range component.
 * @example
 * <Range label="Volume" name="volume" min={0} max={100} showIndicator suffix="%" />
 */
declare const Range: import("react").ForwardRefExoticComponent<RangeProps & import("react").RefAttributes<InputRefType>>;
export default Range;
