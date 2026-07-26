import ComponentProps from '../Component';
import { InputHTMLAttributes, ReactNode } from 'react';
/**
 * @typedef {object} InputProps
 * @description Base props for form input components.
 */
export interface InputProps extends ComponentProps {
    /** The ID of the input element. */
    id?: string;
    /** The name of the input element. */
    name?: string;
    /** The label text for the input. */
    label?: string;
    /** Additional CSS class for the label. */
    labelClass?: string;
    /** Separator character to display after the label. */
    labelSeparator?: string | null;
    /** The position of the label relative to the input. */
    labelPosition?: "after" | "before";
    /** Placeholder text or element. */
    placeholder?: string | ReactNode;
    /** The title attribute for the input. */
    title?: string;
    /** If true, the input is displayed inline. */
    inline?: boolean;
    /** If true, the input is disabled. */
    disabled?: boolean;
    /** If true, the input is required. */
    required?: boolean;
    /** If true, the input is read-only. */
    readOnly?: boolean;
    /** The value of the input. */
    value?: string | number;
    /** Callback for when the input value changes. */
    onChange?: (arg?: any) => void;
    /** A function to validate the input's value. */
    validator?: (arg?: string | number | boolean) => boolean | string;
    /** Defines the grid placement for the input. */
    gridPlacement?: {
        column?: React.CSSProperties["gridColumn"];
        row?: React.CSSProperties["gridRow"];
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
 */
export type InputRefType = {
    /** A flag to identify this as an input ref. */
    isInputRefType: boolean;
    /** The name of the input. */
    name?: string;
    /** The DOM element of the input. */
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    /** A function to trigger validation. */
    checkValidity: () => (string | boolean)[];
    /** A function to get the current validation errors. */
    getValidity: () => (string | boolean)[];
    /** A function to get the current value of the input. */
    getValue: (args?: any) => any;
};
