import { InputProps, InputRefType } from "../types";
import { ReactNode } from "react";
import "./index.scss";
export interface NumberInputProps extends InputProps {
    onChange?: (arg?: number) => void;
    placeholder?: string;
    after?: ReactNode;
    before?: ReactNode;
    type?: 'default' | 'primary';
    step?: number;
    value?: number;
}
declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<InputRefType>>;
export default NumberInput;
