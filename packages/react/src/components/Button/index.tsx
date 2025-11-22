import {
    MouseEvent, ReactNode, FC, useCallback
} from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
// FIX: Import missing utility functions `setBorderRadius` and `setBoxElevation`.
import { setBorderRadius, setBoxElevation } from '../../utils';

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
const Button: FC<ButtonProps> = (props) => {
    const {
        "data-id": dataId,
        name,
        iconName,
        onClick,
        disabled = false,
        readOnly = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        className, style,
        accent, accentDark, accentLight,
        elevation = 0, borderRadius,
        htmlType = 'button'
    } = props;

    let btnClass = `prismal-btn btn-${type} btn-${shape}`;
    if (className) btnClass = `${btnClass} ${className}`;
    if (disabled) btnClass = `${btnClass} btn-disabled`;
    if (readOnly) btnClass = `${btnClass} btn-readonly`;
    else if (elevation) btnClass = `${btnClass} btn-elevated`;
    else btnClass = `${btnClass} btn-anim`;

    let style_: { [key: string]: any } = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    // Merge and override with provided style
    style_ = { ...style_, ...style };

    /**
     * @function onClick_
     * @description Memoized click handler that calls the provided onClick prop.
     * @param {MouseEvent<HTMLButtonElement>} e The mouse event.
     */
    const onClick_ = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);
    }, [onClick]);

    return <button
        data-id={dataId}
        name={name}
        title={title}
        disabled={disabled}
        type={htmlType}
        data-testid={name ? `button-${name}` : undefined}
        style={style_}
        onClick={(disabled || readOnly) ? undefined : onClick_} className={btnClass}
    >
        {iconName && <Icon name={iconName} />}
        {title || children}
    </button>
}

export default Button;