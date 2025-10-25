import { ReactNode, JSX } from "react";
import { InputProps, InputRefType } from "../types";
import "./index.scss";
/**
 * @typedef {object} SelectOption
 * @description Represents an option in the Select component.
 * @property {string} value The value of the option.
 * @property {ReactNode} element The renderable content of the option.
 * @property {boolean} [selected] If true, the option is selected by default.
 */
export interface SelectOption {
    value: string;
    element: ReactNode;
    selected?: boolean;
}
/**
 * @typedef {object} SelectProps
 * @description Props for the Select component.
 * @property {boolean} [multiple=false] If true, allows multiple options to be selected.
 * @property {SelectOption[]} options The array of options to display.
 * @property {string | JSX.Element} [placeholder="Select.."] The placeholder text or element.
 * @property {((arg: string) => void) & ((arg: string[]) => void)} [onChange] Callback for when the selection changes.
 */
export interface SelectProps extends InputProps {
    multiple?: boolean;
    options: SelectOption[];
    placeholder?: string | JSX.Element;
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
}
/**
 * @component Select
 * @description A select input component for forms with single or multiple selection.
 * @param {SelectProps} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the select element.
 * @returns {React.ReactElement} The rendered Select component.
 * @example
 * <Select name="colors" label="Colors" options={[{ value: 'red', element: 'Red' }]} />
 */
declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<InputRefType>>;
export default Select;
