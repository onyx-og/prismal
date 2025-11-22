import { JSX, cloneElement, FC, ReactNode } from "react";
import ComponentProps from "../Component";
import "./index.scss";

/**
 * @typedef {object} HeadingTextProps
 * @description Props for a heading text element.
 */
export interface HeadingTextProps extends ComponentProps {
    /** The type of text. */
    type: "heading";
    /** The heading level. */
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * @typedef {object} BodyTextProps
 * @description Props for a body text element.
 */
export interface BodyTextProps extends ComponentProps {
    /** The type of text. */
    type: "body"
}

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/**
 * @typedef {object} TextProps
 * @description Props for the Text component.
 */
export type TextProps = (HeadingTextProps | BodyTextProps) & {
    /** The content of the text element. */
    children?: ReactNode;
    /** The size of the text, can be a single value or a responsive object. */
    size?: {
        xs?: Size,
        sm?: Size,
        md?: Size,
        lg?: Size,
        xl?: Size,
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
const Text: FC<TextProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        children,
        size, type
    } = props;

    let className_ = "prismal-text";
    if (className) className_ = `${className_} ${className}`;

    if (size) {
        if (typeof size == "string") {
            className_ = `${className_} prismal-text-${size}`;
        } else if (typeof size == "object") {
            if (size.xs) className_ = `${className_} prismal-xs-text-${size.xs}`;
            if (size.sm) className_ = `${className_} prismal-sm-text-${size.sm}`;
            if (size.md) className_ = `${className_} prismal-md-text-${size.md}`;
            if (size.lg) className_ = `${className_} prismal-lg-text-${size.lg}`;
            if (size.xl) className_ = `${className_} prismal-xl-text-${size.xl}`;
        }
    }

    let style_: { [key: string]: any } = {};
    if (style) style_ = { ...style_, ...style };

    if (type === "heading") {
        const { level } = props;

        className_ = `${className_} prismal-text-heading`;
        let element: JSX.Element;

        switch (level) {
            case 1:
                element = <h1></h1>
                break;
            case 2:
                element = <h2></h2>
                break;
            case 3:
                element = <h3></h3>
                break;
            case 4:
                element = <h4></h4>
                break;
            case 5:
                element = <h5></h5>
                break;
            case 6:
                element = <h6></h6>
                break;
            default:
                throw new Error(`Unexpected heading level provided: ${level}`);
        }

        element = cloneElement(element, {
            className: className_,
            children: children,
            style: style_,
            "data-id": dataId
        });

        return element;
    } else if (type === "body") {
        return <span data-id={dataId}
            className={className_} style={style_}>
            {children}
        </span>
    }
    return null;
};
export default Text;