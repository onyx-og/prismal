import { ReactNode, FC, ChangeEvent, useState, useMemo, useCallback, CSSProperties, useEffect } from "react";
import ComponentProps from "../Component";
import { setAccentStyle,getRandId } from "../../utils/";

import "./index.scss";
import Icon from "components/Icon";

export interface AccordionProps extends ComponentProps {
    children: ReactNode;
    header: ReactNode;
    defaultOpen?: boolean;
    contentStyle?: CSSProperties;
    contentClass?: string;
}
const Accordion: FC<AccordionProps> = (props) => {
    const {
        "data-id": dataId,
        className,
        style, accent, accentLight, accentDark,
        borderRadius, elevation,
        children, header,
        defaultOpen = false,
        contentClass, contentStyle
    } = props;

    const [enabled, setEnabled] = useState(defaultOpen);

    useEffect(() => {
        setEnabled(defaultOpen);
    },[defaultOpen]);

    const dataId_ = useMemo( () => {
        if (dataId) return `${dataId}`;
        else return getRandId();
    }, [dataId]);

    let className_ = "prismal-accordion";
    if (className) className_ = `${className_} ${className}`;

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    let contentClass_ = `prismal-accordion-content`;
    if (contentClass) contentClass_ = `${contentClass_} ${contentClass}`;

    const onToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnabled(e.target.checked);
    }, []);

    const indicator_ = useMemo(() => {
        return <svg xmlns="http://www.w3.org/2000/svg" 
            className={enabled 
                ? "prismal-accordion-icon accordion-minus"
                : "prismal-accordion-icon accordion-plus"} 
            width="100" height="100" viewBox="0 0 160 160"
        >
            <rect className="vertical-line" rx="10" x="70" width="20" height="160"/>
            <rect className="horizontal-line" rx="10" y="70" width="160" height="20"/>
        </svg>
    },[enabled]);

    return <div data-id={dataId_} style={style_} className={className_}>
        <input className="prismal-accordion-trigger" defaultChecked={defaultOpen} onChange={onToggle} id={dataId_} type="checkbox" />
        <label className="prismal-accordion-title" htmlFor={dataId_}>{indicator_}{header}</label>
        <div className={contentClass_} style={contentStyle}>
            {children}
        </div>
    </div>
}

export default Accordion;