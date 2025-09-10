import React from 'react';
import { ViewStyle } from 'react-native';
import ComponentProps from '../Component';
export interface ButtonProps extends ComponentProps<ViewStyle> {
    name?: string;
    iconName?: string;
    title?: string;
    onPress?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: React.ReactNode;
    shape?: 'default-shape' | 'circle';
}
declare const Button: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
