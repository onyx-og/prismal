import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
type Ratio = "5-2" | "9-2" | "5-4" | "16-9" | "16-3" | "18-9" | "20-6" | "20-8" | "8-5" | "4-3" | "4-5";
export interface ContainerProps extends ComponentProps {
    children?: ReactNode;
    ratio?: {
        xs?: Ratio;
        sm?: Ratio;
        md?: Ratio;
        lg?: Ratio;
        xl?: Ratio;
    } | Ratio;
    span?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    } | number;
    hide?: {
        xs?: boolean;
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
    } | boolean;
    cursor?: "circle";
}
declare const Container: FC<ContainerProps>;
export default Container;
