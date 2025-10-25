import { FC, ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} HeadingTextProps
 * @description Props for a heading text element.
 * @property {"heading"} type The type of text.
 * @property {1 | 2 | 3 | 4 | 5 | 6} level The heading level.
 */
export interface HeadingTextProps extends ComponentProps {
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5 | 6;
}
/**
 * @typedef {object} BodyTextProps
 * @description Props for a body text element.
 * @property {"body"} type The type of text.
 */
export interface BodyTextProps extends ComponentProps {
    type: "body";
}
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
/**
 * @typedef {object} TextProps
 * @description Props for the Text component.
 * @property {React.ReactNode} [children] The content of the text element.
 * @property {object | Size} [size] The size of the text, can be a single value or a responsive object.
 */
export type TextProps = (HeadingTextProps | BodyTextProps) & {
    children?: ReactNode;
    size?: {
        xs?: Size;
        sm?: Size;
        md?: Size;
        lg?: Size;
        xl?: Size;
    } | Size;
};
/**
 * @component Text
 * @description A component for rendering text elements like headings and body text with responsive sizing.
 * @param {TextProps} props The component props.
 * @returns {React.ReactElement | null} The rendered text element.
 * @example
 * <Text type="heading" level={1} size="xl">My Title</Text>
 * <Text type="body" size="md">Some body text.</Text>
 */
declare const Text: FC<TextProps>;
export default Text;
