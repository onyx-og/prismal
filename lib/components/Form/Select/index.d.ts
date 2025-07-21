import React from 'react';
import './index.scss';
import { InputProps, InputRefType } from '../types';
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
export interface SelectProps extends InputProps {
    options: SelectOption[];
    name: string;
    label?: string;
    placeholder?: string;
    onChange?: (arg: SelectOption) => void;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<InputRefType>>;
export default Select;
