import { ReactNode } from 'react';
import './index.scss';
import { Accepted, InputProps, InputRefType, InputType } from '../types';
export interface TextInputProps<T extends InputType> extends InputProps {
    htmlType?: T;
    accept?: Accepted<T>;
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string | string[]) => void;
    size?: 's' | 'm' | 'l';
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
}
declare const TextInput: import("react").ForwardRefExoticComponent<TextInputProps<InputType> & import("react").RefAttributes<InputRefType>>;
export default TextInput;
