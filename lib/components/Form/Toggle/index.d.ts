import React from "react";
import { InputProps, InputRefType } from '../types';
import "./index.scss";
export interface ToggleProps extends InputProps {
    type?: "checkbox" | "switch";
    checked?: boolean;
    placeholder?: never;
    value?: never;
    inline?: never;
    onChange?: (value: boolean) => any;
}
/**
 * @credits Inspired by Aaron Iker switch/checkbox
 */
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<InputRefType>>;
export default Toggle;
