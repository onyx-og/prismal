import { CSSProperties, ReactNode, FC } from "react";
import "./index.scss";
import ComponentProps from "../Component";
type StackElement = {
    name: string;
    [key: string]: any;
};
export interface StackProps extends ComponentProps {
    render?: (elData: StackElement, index: number, isActive: boolean) => ReactNode;
    data: StackElement[];
    direction?: "vertical" | "horizontal";
    gap?: CSSProperties["gap"];
    itemContainerClass?: string;
}
declare const Stack: FC<StackProps>;
export default Stack;
