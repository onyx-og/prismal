import { FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import './index.scss';
/**
 * @typedef {object} SelectOption
 * @description Represents an option in a select-like component.
 */
export type SelectOption = {
    /** The display label for the option. */
    label: string;
    /** The value of the option. */
    value: string;
    /** Whether the option is selected. */
    selected?: boolean;
};
/**
 * @typedef {object} DropdownProps
 * @description Props for the Dropdown component.
 */
export interface DropdownProps extends ComponentProps {
    /** The content to display within the dropdown. */
    children: ReactNode;
    /** The element that toggles the dropdown's visibility. */
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
