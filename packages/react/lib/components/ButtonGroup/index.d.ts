import { ReactElement, FC } from "react";
import { ButtonProps } from "../Button";
import ComponentProps from "../Component";
import "./index.scss";
export interface ButtonGroupProps extends ComponentProps {
    children: ReactElement<ButtonProps>[] | ReactElement<ButtonProps>;
    orientation?: "row" | "column";
    type?: 'default' | 'primary' | 'text';
}
declare const ButtonGroup: FC<ButtonGroupProps>;
export default ButtonGroup;
