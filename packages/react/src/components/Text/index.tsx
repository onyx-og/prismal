import React from "react";
import ComponentProps from "../Component";
import "./index.scss";

export interface HeadingTextProps extends ComponentProps {
    type: "heading";
    level: number;
}
export interface BodyTextProps extends ComponentProps {
    type: "body"
}
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type TextProps = (HeadingTextProps | BodyTextProps) & {
    children?: React.ReactNode;
    size?: {
        xs?: Size,
        sm?: Size,
        md?: Size,
        lg?: Size,
        xl?: Size,
    } | Size;
};
const Text: React.FC<TextProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        children,
        size, type
    } = props;

    let className_ =  "prismal-text";
    if (className) className_ = `${className_} ${className}`;

    if (size) {
        if (typeof size == "string") {
            className_ = `${className_} prismal-text-${size}`;
        } else if (typeof size == "object") {
            if (size.xs) className_ = `${className_} prismal-xs-text-${size}`;
            if (size.sm) className_ = `${className_} prismal-sm-text-${size}`;
            if (size.md) className_ = `${className_} prismal-md-text-${size}`;
            if (size.lg) className_ = `${className_} prismal-lg-text-${size}`;
            if (size.xl) className_ = `${className_} prismal-xl-text-${size}`;
        }
    }

    let style_: {[key: string]: any} = {};
    if (style) style_ = {...style_, ...style};

    if (type == "heading") {
        const {level} = props;

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

        element = React.cloneElement(element, {
            className: className_,
            children: children,
            style: style_,
            "data-id": dataId
        });

        return element;
    } else if (type == "body") {
        return <span data-id={dataId}
            className={className_} style={style_}>
                {children}
        </span>
    }
};
export default Text;