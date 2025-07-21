import React from 'react';
import './index.scss';
import { InputProps, InputRefType } from '../types';
export interface TextInputProps extends InputProps {
    type: 'text' | 'email' | 'password';
    onPressEnter?: (arg?: string | null) => void;
    onChange?: (arg?: string) => void;
    size?: 's' | 'm' | 'l';
}
declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<InputRefType>>;
export default TextInput;
