import { FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import './index.scss';
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
export interface DropdownProps extends ComponentProps {
    children: ReactNode;
    toggleElement?: ReactNode;
}
declare const Dropdown: FC<DropdownProps>;
export default Dropdown;
