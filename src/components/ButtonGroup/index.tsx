import React from "react";
import Button, { ButtonProps } from "components/Button";
import ComponentProps from "components/Component";
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setBoxElevation, setElevation } from '../../utils';

import "./index.scss";

export interface ButtonGroupProps extends ComponentProps {
    children: React.ReactElement<ButtonProps>[] | React.ReactElement<ButtonProps>;
    orientation?: "row" | "column";
    type?: 'default' | 'primary' | 'text';
}
const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const {
        className, style,
        accent, accentLight, accentDark,
        borderRadius, elevation = 0,
        orientation = "row",
        children, type = 'default'
    } = props;

    let componentClass = "prismal-btn-group";
    if (className) componentClass = `${componentClass} ${className}`;
    componentClass = `${componentClass} prismal-btn-group-${orientation}`;

    let style_: { [key: string]: any } = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    // Merge and override with provided style
    style_ = {...style_, ...style};

    const childrenWithProps = React.Children.map(children, child => {
        // Check if the child is a valid React element before cloning
        if (React.isValidElement(child)) {
            // Use React.cloneElement to add the new prop to each child
            return React.cloneElement(child, { type, elevation, borderRadius });
        }
        return child;
    });

    return <div className={componentClass}>
        {childrenWithProps}
    </div>
}

export default ButtonGroup;