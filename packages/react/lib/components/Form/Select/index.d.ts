import { ReactNode, JSX } from "react";
import { InputProps, InputRefType } from "../types";
import "./index.scss";
export interface SelectOption {
    value: string;
    element: ReactNode;
    selected?: boolean;
}
export interface SelectProps extends InputProps {
    multiple?: boolean;
    options: SelectOption[];
    placeholder?: string | JSX.Element;
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
}
declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<InputRefType>>;
export default Select;
