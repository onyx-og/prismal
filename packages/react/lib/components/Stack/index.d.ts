import React from "react";
import "./index.scss";
import ComponentProps from "../Component";
type StackElement = {
    name: string;
    [key: string]: any;
};
export interface StackProps extends ComponentProps {
    render?: (elData: StackElement, index: number, isActive: boolean) => React.ReactNode;
    data: StackElement[];
    direction?: "vertical" | "horizontal";
    gap?: React.CSSProperties["gap"];
    itemContainerClass?: string;
}
declare const Stack: React.FC<StackProps>;
export default Stack;
