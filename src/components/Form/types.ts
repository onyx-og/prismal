import ComponentProps from '../Component';

export interface InputProps extends ComponentProps {
    name: string;
    label?: string;
    placeholder?: string;
    inline?: boolean;
    disabled?: boolean;
    labelSeparator?: string;
    required?: boolean;
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
    validator?: ( arg?: string | number ) => boolean | string;
}

// TODO: Change name into InputRef
export type InputRefType = {
    isInputRefType: boolean;
    // TODO: change name to element
    current: HTMLInputElement | HTMLTextAreaElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
}