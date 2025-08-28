import React from "react";
import ComponentProps from "components/Component";
import { setAccentStyle } from "utils/";

import "./index.scss";

export interface AccordionProps extends ComponentProps {

}
const Accordion: React.FC<AccordionProps> = (props) => {
    const {
        "data-id": dataId,
        className,
        style, accent, accentLight, accentDark,
        borderRadius, elevation
    } = props;

    let className_ = "prismal-accordion";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    return <div data-id={dataId} style={style_} className={className_}>
        
    </div>
}

export default Accordion;