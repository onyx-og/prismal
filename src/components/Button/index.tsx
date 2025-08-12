import React from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setBoxElevation } from '../../utils';

export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    text?: string;
    onClick?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: React.ReactNode;
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
        text,
        className, style,
        accent, accentDark, accentLight,
        elevation = 0, borderRadius
    } = props;

    let btnClass = `prismal-btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    else if ( elevation ) btnClass = `${btnClass} btn-elevated`;
    else btnClass = `${btnClass} btn-anim`;

    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    // Merge and override with provided style
    style_ = {...style_, ...style};

    return <button
        data-testid={name ? `button-${name}` : undefined}
        style={style_}
        onClick={onClick} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { text || children }
    </button>
}

export default Button;
