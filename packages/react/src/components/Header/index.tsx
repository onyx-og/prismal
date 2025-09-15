import {
    CSSProperties, FC, useState, useCallback, useMemo, useRef, 
    useEffect, ReactNode, forwardRef, useImperativeHandle
} from "react";
import ComponentProps from "../Component";
import "./index.scss";
import { setAccentStyle, setBorderRadius, setBoxElevation } from "utils/";
import {useElScrollThreshold} from "hooks/useScrollPosition";

export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
const Header = forwardRef((props: HeaderProps, ref) => {
    const {
        "data-id": dataId, className, style,
        navClass, placeHolderClass,
        accent, accentLight, accentDark,
        borderRadius, elevation,
        children,
        sticky = true, stickyClass
    } = props;



    let style_: CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    if (style) style_ = { ...style_, ...style };

    let className_ = "prismal-header";
    if (className) className_ = `${className_} ${className}`;

    let placeHolderClass_ = "prismal-header-placeholder";
    if (navClass) placeHolderClass_ = `${placeHolderClass_} ${placeHolderClass}`;

    const headerRef = useRef<HTMLDivElement>(null);
    const [headerRefSet, markHeaderRefSet] = useState<boolean>(false);
    const setHeaderRef = useCallback((node: HTMLDivElement) => {
        if (headerRef.current) {
            return;
        }
        if (node) {
            headerRef.current = node;
            markHeaderRefSet(true);
        }
    }, []);

    const lowNode = useRef<HTMLDivElement>(null);
    const [lowNodeSet, marklowNodeSet] = useState<boolean>(false);

    const setLowNodeRef = useCallback((node: HTMLDivElement) => {
        if (lowNode.current) {
            return;
        }
        if (node) {
            lowNode.current = node;
            marklowNodeSet(true);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        lowNode: lowNode.current, // lowest managed DOM node
        highNode: headerRef.current, // highest managed DOM node
    }), [headerRefSet, lowNodeSet]);

    const thresholdTrigger = useElScrollThreshold(
        headerRef, headerRefSet,
        (headerRef.current?.clientHeight || 0)/2
    );

    useEffect(() => {
        if (thresholdTrigger) {
            console.log("Scrolled past the top of the header");
        }
    }, [thresholdTrigger]);

    const nav = useMemo(() => {
        let navClass_ = "prismal-header-nav";
        if (navClass) navClass_ = `${navClass_} ${navClass}`;
        if (thresholdTrigger && sticky) {
            navClass_ = `${navClass_} prismal-header-nav-flyout`;
            if (stickyClass) {
                navClass_ = `${navClass_} ${stickyClass}`;
            }
        }

        return <div ref={setLowNodeRef} className={navClass_}>
            {children}
        </div>
    }, [thresholdTrigger, children, sticky, stickyClass]);

    return <header data-id={dataId} style={style_} ref={setHeaderRef} className={className_}>
        {nav}
    </header>
});

export default Header;

