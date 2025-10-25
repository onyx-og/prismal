import { FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import './index.scss';
/**
 * @typedef {object} SelectOption
 * @description Represents an option in a select-like component.
 * @property {string} label The display label for the option.
 * @property {string} value The value of the option.
 * @property {boolean} [selected] Whether the option is selected.
 */
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
};
/**
 * @typedef {object} DropdownProps
 * @description Props for the Dropdown component.
 * @property {ReactNode} children The content to display within the dropdown.
 * @property {ReactNode} [toggleElement] The element that toggles the dropdown's visibility.
 */
export interface DropdownProps extends ComponentProps {
    children: ReactNode;
    toggleElement?: ReactNode;
}
/**
 * @component Dropdown
 * @description A component that displays content in a dropdown, toggleable by a specified element.
 * @param {DropdownProps} props The component props.
 * @returns {React.ReactElement} The rendered Dropdown component.
 * @example
 * <Dropdown toggleElement={<Button>Open</Button>}>
 *   <p>Dropdown content.</p>
 * </Dropdown>
 */
declare const Dropdown: FC<DropdownProps>;
export default Dropdown;
