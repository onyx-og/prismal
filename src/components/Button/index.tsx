import React from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setElevation } from '../../utils';

export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: string;
    shape?: 'default-shape' | 'circle';
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        name,
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        className,
        accent, accentDark, accentLight,
        elevation, borderRadius
    } = props;

    let btnClass = `alenite-btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else btnClass = `${btnClass} anim-pulse`;

    btnClass = setElevation(btnClass, elevation);

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});
    style = setBorderRadius(style, borderRadius);

    return <div
        role='button'
        data-testid={name ? `button-${name}` : undefined}
        style={style}
        title={title} onClick={onClick} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { children }
    </div>
}

export default Button;
