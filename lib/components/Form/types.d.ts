/// <reference types="react" />
import ComponentProps from '../Component';
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
}
export type InputRefType = {
    isInputRefType: boolean;
    name?: string;
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
    getValue: (args?: any) => any;
};
