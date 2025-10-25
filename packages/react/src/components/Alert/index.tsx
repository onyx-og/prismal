import {
    JSX, FC, ReactNode, useState, useLayoutEffect, useEffect
} from 'react';
import './index.scss';
import Button from 'components/Button';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';

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
const Alert: FC<AlertProps> = (props) => {
    const {
        cover,
        visible = true,
        closeAlert,
        showClose = true,
        cornerRadius = false,
        onClose,
        children,
        message,
        action,
        className,
        accent, accentDark, accentLight
    } = props;

    const [mounted, mount] = useState(false);
    const [visibility, setVisibility] = useState(false);

    let alertClass = 'prismal-alert';
    if (cornerRadius) alertClass = `${alertClass} corner-radius-${cornerRadius}`;

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});

    if (className) alertClass = `${alertClass} ${className}`;

    useLayoutEffect(() => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if (visible) {
            mount(visible);
            visiblityTimeoutId = window.setTimeout(() => setVisibility(true), 150)
        } else {
            unmountTimeoutId = window.setTimeout(() => mount(visible), 1000);
            setVisibility(visible);
        }

        return () => {
            if (unmountTimeoutId) window.clearTimeout(unmountTimeoutId);
            if (visiblityTimeoutId) window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);

    if (visibility) {
        alertClass = `${alertClass} visible`;
    }

    /* Trace unmount of component to trigger, if provided,
     * fire onClose callback
     */
    useEffect(() => {
        if (!mounted && !visible) {
            onClose && onClose();
        }
    }, [mounted, visible, onClose]);

    // Display the content as provided children or format message and action
    const content = children ? 
        <>
            {children}
            {showClose && <div className='action'><Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle'
            /></div>}
        </> : <>
        <div className='message'>
            {message}
        </div>
        { (action || showClose) ? <div className='action'>
            {action}
            {showClose && <Button onClick={closeAlert} className='alert-close'
                iconName='close' shape='circle'
            />}
        </div> : null }
    </>

    return (mounted ? <>
        <div
            className={alertClass}
            style={style}
        >
            <div className='alert-wrapper'>
                {cover && <div className='alert-cover'>
                    {cover}
                </div>}
                <div className='alert-content'>
                    {content}
                </div>
            </div>
        </div>
    </> : null);
}

export default Alert;