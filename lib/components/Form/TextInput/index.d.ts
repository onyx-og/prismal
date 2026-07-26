import { ReactNode } from 'react';
import './index.scss';
import { Accepted, InputProps, InputRefType, InputType } from '../types';
/**
 * @typedef {object} TextInputProps
 * @description Props for the TextInput component.
 */
export interface TextInputProps<T extends InputType> extends InputProps {
    /** The type of the input element. */
    htmlType?: T;
    /** The accept attribute for file inputs. */
    accept?: Accepted<T>;
    /** Callback for when the Enter key is pressed. */
    onPressEnter?: (arg?: string | null) => void;
    /** Callback for when the input value changes. */
    onChange?: (arg?: string | string[] | File | File[] | undefined) => void;
    /** The size of the input. */
    size?: 's' | 'm' | 'l';
    /** Element to display after the input. */
    after?: ReactNode;
    /** Element to display before the input. */
    before?: ReactNode;
    /** The visual style of the input. */
    type?: 'default' | 'primary';
    /** Placeholder text for the input. */
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
