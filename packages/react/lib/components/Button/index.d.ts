import { MouseEvent, ReactNode, FC } from 'react';
import ComponentProps from '../Component';
import './index.scss';
/**
 * @typedef {object} ButtonProps
 * @description Props for the Button component.
 * @property {string} [name] The name attribute for the button element.
 * @property {string} [iconName] The name of the icon to display.
 * @property {string} [title] The title attribute for the button, used for tooltips.
 * @property {(e: MouseEvent<HTMLButtonElement>) => void} [onClick] Click event handler.
 * @property {boolean} [disabled=false] If true, the button will be disabled.
 * @property {'default' | 'primary' | 'text'} [type='default'] The visual style of the button.
 * @property {ReactNode} [children] The content of the button.
 * @property {'default-shape' | 'circle'} [shape='default-shape'] The shape of the button.
 * @property {'submit' | 'button'} [htmlType='button'] The type attribute for the button element.
 * @property {boolean} [readOnly=false] If true, the button will be in a read-only state.
 */
export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: ReactNode;
    shape?: 'default-shape' | 'circle';
    htmlType?: 'submit' | 'button';
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
