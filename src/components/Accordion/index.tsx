import React from "react";
import ComponentProps from "../Component";
import { setAccentStyle,getRandId } from "../../utils/";

import "./index.scss";

export interface AccordionProps extends ComponentProps {
    children: React.ReactNode;
    header: React.ReactNode;
}
const Accordion: React.FC<AccordionProps> = (props) => {
    const {
        "data-id": dataId,
        className,
        style, accent, accentLight, accentDark,
        borderRadius, elevation,
        children, header
    } = props;

    const dataId_ = React.useMemo( () => {
        if (dataId) return `${dataId}`;
        else return getRandId();
    }, [dataId]);

    let className_ = "prismal-accordion";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    return <div data-id={dataId_} style={style_} className={className_}>
        <input className="prismal-accordion-trigger" id={dataId_} type="checkbox" />
        <label className="prismal-accordion-title" htmlFor={dataId_}>{header}</label>
        <div className="prismal-accordion-content">
            {children}
        </div>
    </div>
}

export default Accordion;