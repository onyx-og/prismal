import { ReactNode, FC, useRef, useMemo, useCallback, useEffect, useState } from "react";
import ComponentProps from "../Component";
import "./index.scss";
import { useIntersectionObserver } from "hooks/";

/**
 * @typedef {object} LazyItemProps
 * @description Props for the LazyItem component.
 */
export interface LazyItemProps extends ComponentProps {
    /** The content to be lazy-loaded. */
    children: ReactNode;
    /** If true, an exit animation will be applied when the component scrolls out of view. */
    exitEffect?: boolean;
    /**
     * Customize the entrance animation by setting animation -> 'none'
     * and providing loadedClass
     * The type of entrance animation.
     */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'pop-in' | 'none';
    /** An additional CSS class to apply when the content is loaded. */
    loadedClass?: string;
    /** The delay in milliseconds before the entrance animation starts. */
    offset?: number;
}

/**
 * @component LazyItem
 * @description A component that lazy-loads its children when it scrolls into the viewport, with an optional animation.
 * @param {LazyItemProps} props The component props.
 * @returns {React.ReactElement} The rendered LazyItem component.
 * @example
 * <LazyItem animation="slide-up">
 *   <img src="image.jpg" alt="Lazy loaded" />
 * </LazyItem>
 */
const LazyItem: FC<LazyItemProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        children,
        exitEffect = true,
        animation = 'fade',
        loadedClass,
        offset = 250
    } = props;

    let style_ = {};
    style_ = { ...style_, ...style };

    const ref = useRef<HTMLDivElement>(null);
    const [refSet, markRefSet] = useState<boolean>(false);

    /**
     * @function refSetter
     * @description A callback ref to get a reference to the component's root div.
     * @param {HTMLDivElement} node The DOM node of the div.
     */
    const refSetter = useCallback((node: HTMLDivElement) => {
        if (ref.current) {
            return
        }
        if (node) {
            ref.current = node;
            markRefSet(true);
        }
    }, []);

    const isIntersecting = useIntersectionObserver(ref, refSet);

    const [isInView, setIsInView] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    useEffect(() => {
        // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setTimeout>` for browser compatibility.
        let timeout: ReturnType<typeof setTimeout>;
        if (isIntersecting) {
            timeout = setTimeout(() => {
                setIsInView(true);
                if (!hasLoadedOnce) setHasLoadedOnce(true);
            }, offset);
        } else if (isInView && !isIntersecting && exitEffect) {
            timeout = setTimeout(() => {
                setIsInView(false);
            }, offset);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [isIntersecting, isInView, hasLoadedOnce, offset, exitEffect]);

    /**
     * @member children_
     * @description Memoized children, rendered only after the component has been in view at least once.
     * @returns {ReactNode}
     */
    const children_ = useMemo(() => {
        if (hasLoadedOnce) {
            return children;
        }
        return null;
    }, [children, hasLoadedOnce]);

    /**
     * @member className_
     * @description Memoized CSS class string, dynamically updated based on the component's view state.
     * @returns {string}
     */
    const className_ = useMemo(() => {
        let className_ = `prismal-lazy-item prismal-lazy-item-${animation}`;
        if (className) className_ = `${className_} ${className}`;
        if (isInView) {
            className_ = `${className_} prismal-lazy-item-view`;
            if (loadedClass) className_ = `${className_} ${loadedClass}`;
        }
        return className_;
    }, [className, animation, isInView, loadedClass]);

    return <div data-id={dataId} ref={refSetter} className={className_}
        style={style_}
    >
        {children_}
    </div>
}
export default LazyItem;