import React from 'react';
import 'styles/icons.scss';

export interface IconProps {
    name: string
}
const Icon = ( props: IconProps ) => {
    const { name } = props;
    return <i data-testid={`icon-${name}`} className={`alenite-icon icon-${name}`}> </i>
}

export default Icon;