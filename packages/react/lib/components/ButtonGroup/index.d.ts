import { ReactElement, FC } from "react";
import { ButtonProps } from "../Button";
import ComponentProps from "../Component";
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
declare const ButtonGroup: FC<ButtonGroupProps>;
export default ButtonGroup;
