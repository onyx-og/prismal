import React, { ChangeEvent, ReactEventHandler } from "react";
import ComponentProps from "../Component";
import { setAccentStyle,getRandId } from "../../utils/";

import "./index.scss";
import Icon from "components/Icon";

export interface AccordionProps extends ComponentProps {
    children: React.ReactNode;
    header: React.ReactNode;
    defaultOpen?: boolean;
}
const Accordion: React.FC<AccordionProps> = (props) => {
    const {
        "data-id": dataId,
        className,
        style, accent, accentLight, accentDark,
        borderRadius, elevation,
        children, header,
        defaultOpen = false
    } = props;

    const [enabled, setEnabled] = React.useState(defaultOpen);

    const dataId_ = React.useMemo( () => {
        if (dataId) return `${dataId}`;
        else return getRandId();
    }, [dataId]);

    let className_ = "prismal-accordion";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    const onToggle = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnabled(e.target.checked);
    }, []);

    const indicator_ = React.useMemo(() => {
        if (enabled) return <Icon className="prismal-accordion-indicator" name="chevron-up" />
        return <Icon className="prismal-accordion-indicator" name="chevron-down" />
    },[enabled]);

    return <div data-id={dataId_} style={style_} className={className_}>
        <input className="prismal-accordion-trigger" defaultChecked={defaultOpen} onChange={onToggle} id={dataId_} type="checkbox" />
        <label className="prismal-accordion-title" htmlFor={dataId_}>{indicator_}{header}</label>
        <div className="prismal-accordion-content">
            {children}
        </div>
    </div>
}

export default Accordion;