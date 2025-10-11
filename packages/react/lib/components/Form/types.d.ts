import { JSX } from 'react/jsx-runtime';
import ComponentProps from '../Component';
import { InputHTMLAttributes } from 'react';
export interface InputProps extends ComponentProps {
    id?: string;
    name?: string;
    label?: string;
    labelClass?: string;
    labelSeparator?: string | null;
    labelPosition?: "after" | "before";
    placeholder?: string | JSX.Element;
    title?: string;
    inline?: boolean;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    value?: string | number;
    onChange?: (arg?: any) => void;
    validator?: (arg?: string | number | boolean) => boolean | string;
    gridPlacement?: {
        column?: React.CSSProperties["gridColumn"];
        row?: React.CSSProperties["gridRow"];
    } | React.CSSProperties["gridArea"];
}
export type InputType = "text" | "email" | "password" | "file";
export type Accepted<T> = T extends "file" ? InputHTMLAttributes<HTMLInputElement>["accept"] : never;
export type InputRefType = {
    isInputRefType: boolean;
    name?: string;
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
    getValue: (args?: any) => any;
};
