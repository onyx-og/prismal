import { ReactNode, FC, ChangeEvent, useState, useMemo, useCallback, CSSProperties, useEffect } from "react";
import ComponentProps from "../Component";
// FIX: Corrected import path
import { setAccentStyle, getRandId } from "../../utils";

import "./index.scss";

/**
 * @typedef {object} AccordionProps
 * @description Props for the Accordion component.
 */
export interface AccordionProps extends ComponentProps {
    /** The content to be displayed inside the accordion when it is open. */
    children: ReactNode;
    /** The header content of the accordion, which is always visible. */
    header: ReactNode;
    /** If true, the accordion will be open by default. */
    defaultOpen?: boolean;
    /** Custom CSS styles for the content container. */
    contentStyle?: CSSProperties;
    /** Additional CSS class for the content container. */
    contentClass?: string;
}

/**
 * @component Accordion
 * @description A collapsible content panel component.
 * @param {AccordionProps} props The component props.
 * @returns {React.ReactElement} The rendered Accordion component.
 * @example
 * <Accordion header={<h2>Click to open</h2>}>
 *   <p>This is the content.</p>
 * </Accordion>
 */
const Accordion: FC<AccordionProps> = (props) => {
    const {
        "data-id": dataId,
        className,
        style, accent, accentLight, accentDark,
        children, header,
        defaultOpen = false,
        contentClass, contentStyle
    } = props;

    const [enabled, setEnabled] = useState(defaultOpen);

    useEffect(() => {
        setEnabled(defaultOpen);
    }, [defaultOpen]);

    const dataId_ = useMemo(() => {
        if (dataId) return `${dataId}`;
        else return getRandId();
    }, [dataId]);

    // Stable id for the content region to support aria-controls/labelledby
    const contentId = `${dataId_}-content`;

    let className_ = "prismal-accordion";
    if (className) className_ = `${className_} ${className}`;

    // Ensure typed style object for TS/ESLint
    let style_: Record<string, unknown> = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (style) style_ = { ...style_, ...style };

    let contentClass_ = `prismal-accordion-content`;
    if (contentClass) contentClass_ = `${contentClass_} ${contentClass}`;

    /**
     * @function onToggle
     * @description Handles the accordion toggle and updates the open state.
     * @param {ChangeEvent<HTMLInputElement>} e The change event from the checkbox.
     * @returns {void}
     */
    const onToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnabled(e.target.checked);
    }, []);

    /**
     * @member indicator_
     * @description Renders the plus/minus SVG indicator based on the open state.
     * @returns {JSX.Element} The indicator SVG element.
     * @example
     * // Used within the Accordion header label
     * // {indicator_}{header}
     */
    const indicator_ = useMemo(() => {
        return <svg xmlns="http://www.w3.org/2000/svg"
            className={enabled
                ? "prismal-accordion-icon accordion-minus"
                : "prismal-accordion-icon accordion-plus"}
            width="100" height="100" viewBox="0 0 160 160"
        >
            <rect className="vertical-line" rx="10" x="70" width="20" height="160" />
            <rect className="horizontal-line" rx="10" y="70" width="160" height="20" />
        </svg>
    }, [enabled]);

    return <div data-id={dataId_} style={style_} className={className_}>
        <input
            className="prismal-accordion-trigger"
            defaultChecked={defaultOpen}
            onChange={onToggle}
            id={dataId_}
            type="checkbox"
            aria-controls={contentId}
            aria-expanded={enabled}
        />
        <label
            className="prismal-accordion-title"
            htmlFor={dataId_}
            aria-controls={contentId}
            aria-expanded={enabled}
        >
            {indicator_}{header}
        </label>
        <div
            id={contentId}
            className={contentClass_}
            style={contentStyle}
            role="region"
            aria-labelledby={dataId_}
        >
            {children}
        </div>
    </div>
}

export default Accordion;