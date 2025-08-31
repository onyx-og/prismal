import { InputProps, InputRefType } from "../types";
import React from "react";
import "./index.scss";
export interface NumberInputProps extends InputProps {
    onChange?: (arg?: number) => void;
    placeholder?: string;
    after?: React.ReactNode;
    before?: React.ReactNode;
    type?: 'default' | 'primary';
    step?: number;
    value?: number;
}
declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<InputRefType>>;
export default NumberInput;
