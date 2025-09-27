import { ReactNode } from 'react';
import './index.scss';
import { InputProps, InputRefType } from '../types';
export interface TextInputProps extends InputProps {
    htmlType?: 'text' | 'email' | 'password';
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string) => void;
    size?: 's' | 'm' | 'l';
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
}
declare const TextInput: import("react").ForwardRefExoticComponent<TextInputProps & import("react").RefAttributes<InputRefType>>;
export default TextInput;
