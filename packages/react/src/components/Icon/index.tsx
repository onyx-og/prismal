import React from 'react';
import 'styles/icons.scss';

export interface IconProps {
    name: string;
    className?: string;
}
const Icon = ( props: IconProps ) => {
    const { name, className } = props;

    let className_ = `prismal-icon icon-${name}`;
    if (className) className_ = `${className_} ${className}`;
    return <i data-testid={`icon-${name}`} className={className_}> </i>
}

export default Icon;