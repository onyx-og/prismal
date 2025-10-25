import {
    ReactElement, FC, Children, isValidElement
} from "react";
import Button, { ButtonProps } from "../Button";
import ComponentProps from "../Component";
import { setAccentStyle } from 'utils/colors';
// FIX: Import missing utility functions `reCloneChildren` and `setBorderRadius`.
import { reCloneChildren, setBorderRadius } from '../../utils';

import "./index.scss";

/**
 * @typedef {object} ButtonGroupProps
 * @description Props for the ButtonGroup component.
 * @property {ReactElement<ButtonProps>[] | ReactElement<ButtonProps>} children The Button components to group.
 * @property {"row" | "column"} [orientation="row"] The orientation of the button group.
 * @property {'default' | 'primary' | 'text'} [type='default'] The visual style to apply to all buttons in the group.
 */
export interface ButtonGroupProps extends ComponentProps {
    children: ReactElement<ButtonProps>[] | ReactElement<ButtonProps>;
    orientation?: "row" | "column";
    type?: 'default' | 'primary' | 'text';
}

/**
 * @component ButtonGroup
 * @description A component to group multiple Button components together, with a shared style and orientation.
 * @param {ButtonGroupProps} props The component props.
 * @returns {React.ReactElement} The rendered ButtonGroup component.
 * @example
 * <ButtonGroup>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 */
const ButtonGroup: FC<ButtonGroupProps> = (props) => {
    const {
        "data-id": dataId,
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

    const childrenWithProps = Children.map(children, child => {
        // Check if the child is a valid React element before cloning
        if (isValidElement(child)) {
            // Use cloneElement to add the new prop to each child
            return reCloneChildren(child, Button,{ type, elevation, borderRadius });
        }
        return child;
    });

    return <div data-id={dataId} style={style_} className={componentClass}>
        {childrenWithProps}
    </div>
}

export default ButtonGroup;