/// <reference types="react" />
import { InputProps, InputRefType } from '../types';
import "./index.scss";
/**
 * @typedef {object} ToggleProps
 * @description Props for the Toggle component.
 * @property {"checkbox" | "switch"} [type="checkbox"] The type of toggle to render.
 * @property {boolean} [checked=false] The initial checked state of the toggle.
 * @property {never} [placeholder] Not used.
 * @property {never} [value] Not used.
 * @property {never} [inline] Not used.
 * @property {(value: boolean) => any} [onChange] Callback for when the toggle state changes.
 */
export interface ToggleProps extends InputProps {
    type?: "checkbox" | "switch";
    checked?: boolean;
    placeholder?: never;
    value?: never;
    inline?: never;
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
