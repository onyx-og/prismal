import { ReactNode } from 'react';
import './index.scss';
import { Accepted, InputProps, InputRefType, InputType } from '../types';
/**
 * @typedef {object} TextInputProps
 * @description Props for the TextInput component.
 * @property {T} [htmlType='text'] The type of the input element.
 * @property {Accepted<T>} [accept] The accept attribute for file inputs.
 * @property {(arg?: string | null) => void} [onPressEnter] Callback for when the Enter key is pressed.
 * @property {(arg?: string | string[]) => void} [onChange] Callback for when the input value changes.
 * @property {'s' | 'm' | 'l'} [size='m'] The size of the input.
 * @property {ReactNode} [after] Element to display after the input.
 * @property {ReactNode} [before] Element to display before the input.
 * @property {'default' | 'primary'} [type='default'] The visual style of the input.
 * @property {string} [placeholder] Placeholder text for the input.
 */
export interface TextInputProps<T extends InputType> extends InputProps {
    htmlType?: T;
    accept?: Accepted<T>;
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string | string[] | File | File[] | undefined) => void;
    size?: 's' | 'm' | 'l';
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
    multiple?: boolean;
}
/**
 * @component TextInput
 * @description A versatile text input component with validation, custom styling, and support for various input types.
 * @param {TextInputProps<InputType>} props The component props.
 * @param {ForwardedRef<InputRefType>} ref The forwarded ref to the input element.
 * @returns {React.ReactElement} The rendered TextInput component.
 * @example
 * <TextInput label="Name" name="name" placeholder="Enter your name" />
 */
declare const TextInput: import("react").ForwardRefExoticComponent<TextInputProps<InputType> & import("react").RefAttributes<InputRefType>>;
export default TextInput;
