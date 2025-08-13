import ComponentProps from '../Component';
export interface InputProps extends ComponentProps {
    id?: string;
    name?: string;
    label?: string;
    labelClass?: string;
    labelSeparator?: string;
    labelPosition?: "after" | "before";
    placeholder?: string;
    inline?: boolean;
    disabled?: boolean;
    required?: boolean;
    value?: string | number;
    onChange?: (arg?: any) => void;
    validator?: (arg?: string | number) => boolean | string;
}
export type InputRefType = {
    isInputRefType: boolean;
    current: HTMLInputElement | HTMLTextAreaElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
};
