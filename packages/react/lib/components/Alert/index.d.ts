import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} AlertBaseProps
 * @description Base props for the Alert component.
 * @property {() => void} [onClose] Callback fired when the alert is closed and unmounted.
 * @property {JSX.Element} [cover] An element to display as a cover or icon for the alert.
 * @property {boolean} [visible=true] Controls the visibility of the alert.
 * @property {() => void} [closeAlert] Callback to trigger closing the alert.
 * @property {boolean} [showClose=true] Whether to show the close button.
 * @property {false | 's' | 'm' | 'l'} [cornerRadius=false] The corner radius of the alert.
 * @property {boolean} [transition] Whether to apply a transition effect.
 */
interface AlertBaseProps extends ComponentProps {
    onClose?: () => void;
    cover?: JSX.Element;
    visible?: boolean;
    closeAlert?: () => void;
    showClose?: boolean;
    cornerRadius?: false | 's' | 'm' | 'l';
    transition?: boolean;
}
/**
 * @typedef {object} AlertCustomProps
 * @description Props for a custom alert with children.
 * @property {ReactNode} [children] Custom content for the alert.
 * @property {never} [message] Not used in custom alerts.
 * @property {never} [action] Not used in custom alerts.
 */
interface AlertCustomProps extends AlertBaseProps {
    children?: ReactNode;
    message?: never;
    action?: never;
}
/**
 * @typedef {object} AlertSimpleProps
 * @description Props for a simple alert with a message and actions.
 * @property {never} [children] Not used in simple alerts.
 * @property {string} message The message to display.
 * @property {JSX.Element[]} [action] Action elements to display.
 */
interface AlertSimpleProps extends AlertBaseProps {
    children?: never;
    message: string;
    action?: JSX.Element[];
}
export type AlertProps = AlertSimpleProps | AlertCustomProps;
/**
 * @component Alert
 * @description A component to display alert messages.
 * @param {AlertProps} props The component props.
 * @returns {React.ReactElement | null} The rendered Alert component or null if not visible.
 * @example
 * <Alert message="This is a simple alert." />
 */
declare const Alert: FC<AlertProps>;
export default Alert;
