import React from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";
import "./index.scss";

type Ratio = "5-2" | "9-2" | "5-4" | "16-9" | "16-3" | "18-9" | "20-6" | "20-8" | "8-5" | "4-3" | "4-5";
export interface ContainerProps extends ComponentProps {
    children?: React.ReactNode;
    ratio?: {
        xs?: Ratio,
        sm?: Ratio,
        md?: Ratio,
        lg?: Ratio,
        xl?: Ratio,
    } | Ratio;
    span?: {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        xl?: number,
    } | number;
    hide?: {
        xs?: boolean,
        sm?: boolean,
        md?: boolean,
        lg?: boolean,
        xl?: boolean,
    } | boolean;
}
const Container: React.FC<ContainerProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        children, ratio, span, hide = false
    } = props;

    const className_ = React.useMemo(() => {
        let className_ = "prismal-container";
        if (className) className_ = `${className_} ${className}`;

        if (ratio) {
            if (typeof ratio =="string") {
                className_ = `${className_} prismal-ratio-${ratio}`;
            } else if (typeof ratio == "object") {
                if (ratio.xs) className_ = `${className_} prismal-ratio-xs-${ratio.xs}`;
                if (ratio.sm) className_ = `${className_} prismal-ratio-sm-${ratio.sm}`;
                if (ratio.md) className_ = `${className_} prismal-ratio-md-${ratio.md}`;
                if (ratio.lg) className_ = `${className_} prismal-ratio-lg-${ratio.lg}`;
                if (ratio.xl) className_ = `${className_} prismal-ratio-xl-${ratio.xl}`;
            }
        }

        if (span) {
            if (typeof span =="number") {
                className_ = `${className_} prismal-span-${span}`;
            } else if (typeof span == "object") {
                if (span.xs) className_ = `${className_} prismal-span-xs-${span.xs}`;
                if (span.sm) className_ = `${className_} prismal-span-sm-${span.sm}`;
                if (span.md) className_ = `${className_} prismal-span-md-${span.md}`;
                if (span.lg) className_ = `${className_} prismal-span-lg-${span.lg}`;
                if (span.xl) className_ = `${className_} prismal-span-xl-${span.xl}`;
            }
        }

        if (hide) {
            if (typeof hide =="boolean") {
                if (hide) className_ = `${className_} prismal-hide`;
                // else className_ = `${className_} prismal-show`;
            } else if (typeof hide == "object") {
                if (hide.xs) className_ = `${className_} prismal-hide-xs`;
                else if (hide.xs === false) className_ = `${className_} prismal-show-xs`;

                if (hide.sm) className_ = `${className_} prismal-hide-sm`;
                else if (hide.sm === false) className_ = `${className_} prismal-show-sm`;

                if (hide.md) className_ = `${className_} prismal-hide-md`;
                else if (hide.md === false) className_ = `${className_} prismal-show-md`;

                if (hide.lg) className_ = `${className_} prismal-hide-lg`;
                else if (hide.lg === false) className_ = `${className_} prismal-show-lg`;

                if (hide.xl) className_ = `${className_} prismal-hide-xl`;
                else if (hide.xl === false) className_ = `${className_} prismal-show-xl`;
            }
        }
        return className_;
    }, [className, ratio, span, hide]);

    let style_: React.CSSProperties = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});

    if (style) style_ = {...style_, ...style};

    return <div data-id={dataId} style={style_} 
        className={className_}>
            {children}
    </div>
};

export default Container;
