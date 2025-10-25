import {
    CSSProperties, FC, useState, useCallback, useMemo, useRef, 
    useEffect, ReactNode, forwardRef, useImperativeHandle
} from "react";
import ComponentProps from "../Component";
import "./index.scss";
import { setAccentStyle, setBorderRadius, setBoxElevation } from "utils/";
import {useElScrollThreshold} from "hooks/useScrollPosition";

/**
 * @typedef {object} HeaderProps
 * @description Props for the Header component.
 * @property {string} [navClass] Additional CSS class for the navigation container.
 * @property {string} [placeHolderClass] Additional CSS class for the placeholder element.
 * @property {ReactNode} [children] The content to be displayed within the header.
 * @property {boolean} [sticky=true] If true, the header becomes sticky on scroll.
 * @property {string} [stickyClass] Additional CSS class to apply when the header is sticky.
 */
export interface HeaderProps extends ComponentProps {
    navClass?: string;
    placeHolderClass?: string;
    children?: ReactNode;
    sticky?: boolean;
    stickyClass?: string;
}

/**
 * @component Header
 * @description A header component that can be made sticky on scroll.
 * @param {HeaderProps} props The component props.
 * @param {React.Ref<any>} ref The forwarded ref.
 * @returns {React.ReactElement} The rendered Header component.
 * @example
 * <Header sticky>
 *   <nav>...</nav>
 * </Header>
 */
const Header = forwardRef((props: HeaderProps, ref) => {
    const {
        "data-id": dataId, className, style,
        navClass,
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

    const headerRef = useRef<HTMLDivElement>(null);
    const [headerRefSet, markHeaderRefSet] = useState<boolean>(false);
    /**
     * @function setHeaderRef
     * @description A callback ref to get a reference to the header element.
     * @param {HTMLDivElement} node The header DOM node.
     */
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

    /**
     * @function setLowNodeRef
     * @description A callback ref to get a reference to the navigation container element.
     * @param {HTMLDivElement} node The navigation container DOM node.
     */
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

    /**
     * @member nav
     * @description Memoized navigation container element with dynamic classes for sticky behavior.
     * @returns {JSX.Element}
     */
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
    }, [thresholdTrigger, children, sticky, stickyClass, navClass, setLowNodeRef]);

    return <header data-id={dataId} style={style_} ref={setHeaderRef} className={className_}>
        {nav}
    </header>
});
Header.displayName = "Header";
export default Header;