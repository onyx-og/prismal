import React from 'react';
import ComponentProps from '../../Component';
import './index.scss';
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
export interface SelectProps extends ComponentProps {
    options: SelectOption[];
    name: string;
    label?: string;
    placeholder?: string | JSX.Element;
    onChange?: (arg: SelectOption) => void;
}
declare const Select: React.FC<SelectProps>;
export default Select;
