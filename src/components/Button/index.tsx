import React from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setBoxElevation } from '../../utils';

export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    title?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
        title,
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

    const onClick_ = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (onClick) onClick(e);
    }, [onClick, disabled]);

    return <button
        data-testid={name ? `button-${name}` : undefined}
        style={style_}
        onClick={onClick_} className={btnClass}
    >
        { iconName && <Icon name={iconName}/>}
        { title || children }
    </button>
}

export default Button;
