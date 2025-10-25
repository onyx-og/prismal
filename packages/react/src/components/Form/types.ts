import ComponentProps from '../Component';
// FIX: Import `ReactNode` to resolve type error for `placeholder`.
import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * @typedef {object} InputProps
 * @description Base props for form input components.
 * @property {string} [id] The ID of the input element.
 * @property {string} [name] The name of the input element.
 * @property {string} [label] The label text for the input.
 * @property {string} [labelClass] Additional CSS class for the label.
 * @property {string | null} [labelSeparator] Separator character to display after the label.
 * @property {"after" | "before"} [labelPosition] The position of the label relative to the input.
 * @property {string | ReactNode} [placeholder] Placeholder text or element.
 * @property {string} [title] The title attribute for the input.
 * @property {boolean} [inline] If true, the input is displayed inline.
 * @property {boolean} [disabled] If true, the input is disabled.
 * @property {boolean} [required] If true, the input is required.
 * @property {boolean} [readOnly] If true, the input is read-only.
 * @property {string | number} [value] The value of the input.
 * @property {(arg?: any) => void} [onChange] Callback for when the input value changes.
 * @property {(arg?: string | number | boolean) => boolean | string} [validator] A function to validate the input's value.
 * @property {object | React.CSSProperties["gridArea"]} [gridPlacement] Defines the grid placement for the input.
 */
export interface InputProps extends ComponentProps {
    id?: string;
    name?: string;
    label?: string;
    labelClass?: string;
    labelSeparator?: string | null;
    labelPosition?: "after" | "before";
    // FIX: Changed `JSX.Element` to `ReactNode` to resolve type error and be more idiomatic.
    placeholder?: string | ReactNode;
    title?: string;
    inline?: boolean;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    value?: string | number;
    onChange?: ( arg?: any) => void;
    validator?: ( arg?: string | number | boolean ) => boolean | string;
    gridPlacement?: {
        column?: React.CSSProperties["gridColumn"];
        row?: React.CSSProperties["gridRow"]
    } | React.CSSProperties["gridArea"];
}

/**
 * @typedef {string} InputType
 * @description The allowed types for a text-based input.
 */
export type InputType = "text" | "email" | "password" | "file";

/**
 * @typedef {string} Accepted
 * @description The 'accept' attribute type for a file input.
 */
export type Accepted<T> = T extends "file" ? InputHTMLAttributes<HTMLInputElement>["accept"] : never;

/**
 * @typedef {object} InputRefType
 * @description The ref object exposed by form input components.
 * @property {boolean} isInputRefType A flag to identify this as an input ref.
 * @property {string} [name] The name of the input.
 * @property {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null} element The DOM element of the input.
 * @property {() => (string | boolean)[]} checkValidity A function to trigger validation.
 * @property {() => (string | boolean)[]} getValidity A function to get the current validation errors.
 * @property {(args?: any) => any} getValue A function to get the current value of the input.
 */
export type InputRefType = {
    isInputRefType: boolean;
    name?: string;
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
    getValue: (args?: any) => any;
}