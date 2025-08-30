import React from 'react';
import './index.scss';
import { InputProps, InputRefType } from '../types';
export interface TextInputProps extends InputProps {
    htmlType?: 'text' | 'email' | 'password';
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string) => void;
    size?: 's' | 'm' | 'l';
    after?: React.ReactNode;
    before?: React.ReactNode;
    type?: 'default' | 'primary';
    placeholder?: string;
}
declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<InputRefType>>;
export default TextInput;
