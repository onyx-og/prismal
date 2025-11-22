import { ReactNode, JSX } from "react";
import { InputProps, InputRefType } from "../types";
import "./index.scss";
/**
 * @typedef {object} SelectOption
 * @description Represents an option in the Select component.
 */
export interface SelectOption {
    /** The value of the option. */
    value: string;
    /** The renderable content of the option. */
    element: ReactNode;
    /** If true, the option is selected by default. */
    selected?: boolean;
}
/**
 * @typedef {object} SelectProps
 * @description Props for the Select component.
 */
export interface SelectProps extends InputProps {
    /** If true, allows multiple options to be selected. */
    multiple?: boolean;
    /** The array of options to display. */
    options: SelectOption[];
    /** The placeholder text or element. */
    placeholder?: string | JSX.Element;
    /** Callback for when the selection changes. */
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
    isFiltered?: boolean;
    /** Function to fetch options asynchronously based on filter */
    fetchOptions?: (filter?: string) => Promise<SelectOption[]>;
    /** Compare function for sorting options */
    orderOptions?: (a: SelectOption, b: SelectOption) => number;
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
