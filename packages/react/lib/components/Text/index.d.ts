/// <reference types="react" />
import ComponentProps from "../Component";
import "./index.scss";
export interface HeadingTextProps extends ComponentProps {
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5 | 6;
}
export interface BodyTextProps extends ComponentProps {
    type: "body";
}
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type TextProps = (HeadingTextProps | BodyTextProps) & {
    children?: React.ReactNode;
    size?: {
        xs?: Size;
        sm?: Size;
        md?: Size;
        lg?: Size;
        xl?: Size;
    } | Size;
};
declare const Text: React.FC<TextProps>;
export default Text;
