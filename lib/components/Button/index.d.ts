import React from 'react';
import ComponentProps from '../Component';
import './index.scss';
export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: React.ReactNode;
    shape?: 'default-shape' | 'circle';
}
declare const Button: React.FC<ButtonProps>;
export default Button;
