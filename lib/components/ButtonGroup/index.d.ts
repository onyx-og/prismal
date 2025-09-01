import React from "react";
import { ButtonProps } from "../Button";
import ComponentProps from "../Component";
import "./index.scss";
export interface ButtonGroupProps extends ComponentProps {
    children: React.ReactElement<ButtonProps>[] | React.ReactElement<ButtonProps>;
    orientation?: "row" | "column";
    type?: 'default' | 'primary' | 'text';
}
declare const ButtonGroup: React.FC<ButtonGroupProps>;
export default ButtonGroup;
