import { JSX, FC, ReactNode } from 'react';
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} AlertBaseProps
 * @description Base props for the Alert component.
 */
interface AlertBaseProps extends ComponentProps {
    /** Callback fired when the alert is closed and unmounted. */
    onClose?: () => void;
    /** An element to display as a cover or icon for the alert. */
    cover?: JSX.Element;
    /** Controls the visibility of the alert. */
    visible?: boolean;
    /** Callback to trigger closing the alert. */
    closeAlert?: () => void;
    /** Whether to show the close button. */
    showClose?: boolean;
    /** The corner radius of the alert. */
    cornerRadius?: false | 's' | 'm' | 'l';
    /** Whether to apply a transition effect. */
    transition?: boolean;
}
/**
 * @typedef {object} AlertCustomProps
 * @description Props for a custom alert with children.
 */
interface AlertCustomProps extends AlertBaseProps {
    /** Custom content for the alert. */
    children?: ReactNode;
    /** Not used in custom alerts. */
    message?: never;
    /** Not used in custom alerts. */
    action?: never;
}
/**
 * @typedef {object} AlertSimpleProps
 * @description Props for a simple alert with a message and actions.
 */
interface AlertSimpleProps extends AlertBaseProps {
    /** Not used in simple alerts. */
    children?: never;
    /** The message to display. */
    message: string;
    /** Action elements to display. */
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
