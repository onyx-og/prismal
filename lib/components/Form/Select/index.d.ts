import React from "react";
import { InputProps } from "components/Form/types";
import "./index.scss";
export interface SelectOption {
    value: string;
    element: React.ReactNode;
    selected?: boolean;
}
export interface SelectProps extends InputProps {
    multiple?: boolean;
    options: SelectOption[];
    placeholder?: string | JSX.Element;
    onChange?: ((arg: string) => void) & ((arg: string[]) => void);
}
declare const Select: (props: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default Select;
