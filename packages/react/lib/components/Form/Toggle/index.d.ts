/// <reference types="react" />
import { InputProps, InputRefType } from '../types';
import "./index.scss";
/**
 * @typedef {object} ToggleProps
 * @description Props for the Toggle component.
 */
export interface ToggleProps extends InputProps {
    /** The type of toggle to render. */
    type?: "checkbox" | "switch";
    /** The initial checked state of the toggle. */
    checked?: boolean;
    /** Not used. */
    placeholder?: never;
    /** Not used. */
    value?: never;
    /** Not used. */
    inline?: never;
    /** Callback for when the toggle state changes. */
    onChange?: (value: boolean) => any;
}
/**
 * @component Toggle
 * @description A checkbox or switch input component for forms.
 * @credits Inspired by Aaron Iker switch/checkbox.
 * @param {ToggleProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {ReactElement} The rendered Toggle component.
 * @example
 * <Toggle type="switch" label="Enable feature" name="feature-toggle" />
 */
declare const Toggle: import("react").ForwardRefExoticComponent<ToggleProps & import("react").RefAttributes<InputRefType>>;
export default Toggle;
