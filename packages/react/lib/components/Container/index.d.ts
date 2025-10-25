import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
type Ratio = "5-2" | "9-2" | "5-4" | "16-9" | "16-3" | "18-9" | "20-6" | "20-8" | "8-5" | "4-3" | "4-5";
/**
 * @typedef {object} ContainerProps
 * @description Props for the Container component.
 * @property {ReactNode} [children] The content to be rendered inside the container.
 * @property {object | Ratio} [ratio] The aspect ratio of the container, can be a single value or responsive object.
 * @property {object | number} [span] The column span of the container in a grid layout.
 * @property {object | boolean} [hide=false] Controls the visibility of the container, can be responsive.
 * @property {"circle"} [cursor] The type of custom cursor to display within the container.
 */
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
/**
 * @component Container
 * @description A flexible container component with responsive properties for layout and visibility.
 * @param {ContainerProps} props The component props.
 * @returns {React.ReactElement} The rendered Container component.
 * @example
 * <Container span={6} ratio="16-9">
 *   <p>Content</p>
 * </Container>
 */
declare const Container: FC<ContainerProps>;
export default Container;
