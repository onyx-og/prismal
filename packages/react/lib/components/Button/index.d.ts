import { MouseEvent, ReactNode, FC } from 'react';
import ComponentProps from '../Component';
import './index.scss';
/**
 * @typedef {object} ButtonProps
 * @description Props for the Button component.
 */
export interface ButtonProps extends ComponentProps {
    /** The name attribute for the button element. */
    name?: string;
    /** The name of the icon to display. */
    iconName?: string;
    /** The title attribute for the button, used for tooltips. */
    title?: string;
    /** Click event handler. */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** If true, the button will be disabled. */
    disabled?: boolean;
    /** The visual style of the button. */
    type?: 'default' | 'primary' | 'text';
    /** The content of the button. */
    children?: ReactNode;
    /** The shape of the button. */
    shape?: 'default-shape' | 'circle';
    /** The type attribute for the button element. */
    htmlType?: 'submit' | 'button';
    /** If true, the button will be in a read-only state. */
    readOnly?: boolean;
}
/**
 * @component Button
 * @description A customizable button component with different styles, shapes, and an optional icon.
 * @param {ButtonProps} props The component props.
 * @returns {React.ReactElement} The rendered Button component.
 * @example
 * <Button type="primary" iconName="check" onClick={() => alert('Clicked!')}>
 *   Confirm
 * </Button>
 */
declare const Button: FC<ButtonProps>;
export default Button;
