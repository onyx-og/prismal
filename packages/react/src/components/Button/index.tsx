import {
    MouseEvent, ReactNode, FC, useCallback
} from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setBoxElevation } from '../../utils';

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

const Button: FC<ButtonProps> = (props) => {
    const {
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
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    if ( readOnly ) btnClass = `${btnClass} btn-readonly`;
    else if ( elevation ) btnClass = `${btnClass} btn-elevated`;
    else btnClass = `${btnClass} btn-anim`;

    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    // Merge and override with provided style
    style_ = {...style_, ...style};

    const onClick_ = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (onClick) onClick(e);
    }, [onClick, disabled]);

    return <button
        type={htmlType}
        data-testid={name ? `button-${name}` : undefined}
        style={style_}
        onClick={onClick_} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { title || children }
    </button>
}

export default Button;
