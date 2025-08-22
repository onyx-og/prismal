import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
import { setAccentStyle } from "utils/colors";
import { setBorderRadius } from "utils/";
import {useElScrollPosition} from "hooks/useScrollPosition";

export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: React.ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}
const Header = React.forwardRef((props: HeaderProps, ref) => {
    const {
        className, style,
        navClass, placeHolderClass,
        accent, accentLight, accentDark,
        borderRadius,
        children,
        sticky = true, stickyClass
    } = props;



    let style_: React.CSSProperties = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);
    style_ = { ...style_, ...style };

    let className_ = "prismal-header";
    if (className) className_ = `${className_} ${className}`;

    let placeHolderClass_ = "prismal-header-placeholder";
    if (navClass) placeHolderClass_ = `${placeHolderClass_} ${placeHolderClass}`;

    const headerRef = React.useRef<HTMLDivElement>();
    const [headerRefSet, markHeaderRefSet] = React.useState<boolean>(false);
    const setHeaderRef = React.useCallback((node: HTMLDivElement) => {
        if (headerRef.current) {
            return;
        }
        if (node) {
            headerRef.current = node;
            markHeaderRefSet(true);
        }
    }, []);

    const lowNode = React.useRef<HTMLDivElement>();
    const [lowNodeSet, marklowNodeSet] = React.useState<boolean>(false);

    const setLowNodeRef = React.useCallback((node: HTMLDivElement) => {
        if (lowNode.current) {
            return;
        }
        if (node) {
            lowNode.current = node;
            marklowNodeSet(true);
        }
    }, []);

    React.useImperativeHandle(ref, () => ({
        lowNode: lowNode.current, // lowest managed DOM node
        highNode: headerRef.current, // highest managed DOM node
    }), [headerRefSet, lowNodeSet]);

    const thresholdTrigger = useElScrollPosition(
        headerRef, headerRefSet, 
        (headerRef.current?.clientHeight || 0)/2
    );

    React.useEffect(() => {
        if (thresholdTrigger) {
            console.log("Scrolled past the top of the header");
        }
    }, [thresholdTrigger]);

    const nav = React.useMemo(() => {
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

    return <header style={style_} ref={setHeaderRef} className={className_}>
        {nav}
    </header>
});

export default Header;

