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
    // TODO: check argument types
    // should be string | number | undefined
    // but different inputs may give different arguments
    // i.e.: input text/email => string | undefined
    // custom input => an array (for instance)
    onChange?: ( arg?: any) => void;
    /* Method used to perform validation:
     * returns true or an error message when invalid
     * false when the field is valid!
     */
    // TODO: check argument types
    // should be string | number | undefined
    validator?: ( arg?: string | number | boolean ) => boolean | string;
    gridPlacement?: {
        column?: React.CSSProperties["gridColumn"];
        row?: React.CSSProperties["gridRow"]
    } | React.CSSProperties["gridArea"];
}

// TODO: Change name into InputRef
export type InputRefType = {
    isInputRefType: boolean;
    name?: string;
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
    getValue: (args?: any) => any;
}