import React from 'react';
import Icon from 'components/Icon';
import ComponentProps from '../Component';
import './index.scss';
import { setAccentStyle } from 'utils/colors';

export interface ButtonProps extends ComponentProps {
    name?: string;
    iconName?: string;
    loading?: boolean;
    title?: string;
    onClick?: (arg?: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: React.ReactNode;
    shape?: 'default-shape' | 'circle';
}

const Button: React.FC<ButtonProps> = ( props ) => {
    const {
        name,
        iconName,
        onClick,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        className, loading,
        accent, accentDark, accentLight,
    } = props;

    let btnClass = `alenite-btn btn-${type} btn-${shape}`; 
    if ( className ) btnClass = `${btnClass} ${className}`;
    if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    if ( loading ) btnClass = `${btnClass} btn-loading`;
    else btnClass = `${btnClass} anim-pulse`;

    let style: {[key: string]: any} = {};
    style = setAccentStyle(style, {accent, accentLight, accentDark});
    
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
