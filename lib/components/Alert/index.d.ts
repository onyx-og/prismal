import React from 'react';
import './index.scss';
import ComponentProps from '../Component';
interface AlertBaseProps extends ComponentProps {
    onClose?: () => void;
    cover?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    showClose?: boolean;
    cornerRadius?: false | 's' | 'm' | 'l';
    transition?: boolean;
}
interface AlertCustomProps extends AlertBaseProps {
    children?: React.ReactNode;
    message?: never;
    action?: never;
}
interface AlertSimpleProps extends AlertBaseProps {
    children?: never;
    message: string;
    action?: JSX.Element[];
}
export type AlertProps = AlertSimpleProps | AlertCustomProps;
declare const Alert: React.FC<AlertProps>;
export default Alert;
