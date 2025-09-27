import { MouseEvent, ReactNode, FC } from 'react';
import ComponentProps from '../Component';
import './index.scss';
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
declare const Button: FC<ButtonProps>;
export default Button;
