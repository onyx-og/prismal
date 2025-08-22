import React from 'react';
import ComponentProps from '../Component';
import './index.scss';
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
export interface DropdownProps extends ComponentProps {
    children: React.ReactNode;
    toggleElement?: React.ReactNode;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
