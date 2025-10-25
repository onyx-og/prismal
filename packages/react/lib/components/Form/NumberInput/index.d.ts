import { InputProps, InputRefType } from "../types";
import { ReactNode } from "react";
import "./index.scss";
/**
 * @typedef {object} NumberInputProps
 * @description Props for the NumberInput component.
 * @property {(arg?: number) => void} [onChange] Callback for when the input value changes.
 * @property {string} [placeholder] Placeholder text for the input.
 * @property {ReactNode} [after] Element to display after the input.
 * @property {ReactNode} [before] Element to display before the input.
 * @property {'default' | 'primary'} [type] The visual style of the input.
 * @property {number} [step] The step value for the number input.
 * @property {number} [value] The initial value of the input.
 */
export interface NumberInputProps extends InputProps {
    onChange?: (arg?: number) => void;
    placeholder?: string;
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    step?: number;
    value?: number;
}
/**
 * @component NumberInput
 * @description A number input component for forms with validation and custom styling.
 * @param {NumberInputProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered NumberInput component.
 * @example
 * <NumberInput label="Quantity" name="quantity" min={0} step={1} />
 */
declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<InputRefType>>;
export default NumberInput;
