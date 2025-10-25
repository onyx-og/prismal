import {
    useState, useEffect, useCallback, useImperativeHandle,
    useRef, forwardRef, CSSProperties, ReactNode, ForwardedRef
} from "react";

import ComponentProps from "../Component";

import "./index.scss";

/**
 * @typedef {object} MarqueeRef
 * @description The ref object exposed by the Marquee component.
 * @property {() => void} pause A function to pause the marquee animation.
 * @property {() => void} play A function to play the marquee animation.
 */
type MarqueeRef = {
    pause: () => void;
    play: () => void;
}

/**
 * @typedef {object} MarqueeProps
 * @description Props for the Marquee component.
 * @property {ReactNode} children The content to be scrolled.
 * @property {boolean} [pauseOnHover=true] If true, the animation pauses on mouse hover.
 * @property {number} [speed=8] A decimal from 0 to 1 representing the scroll speed.
 * @property {() => void} [onClick] Click event handler for the marquee.
 */
export interface MarqueeProps extends ComponentProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    /** Decimal from 0 to 1 */
    speed?: number;
    onClick?: () => void;
}

/**
 * @component Marquee
 * @description A component that creates a scrolling marquee effect for its children.
 * @param {MarqueeProps} props The component props.
 * @param {ForwardedRef<MarqueeRef>} ref The forwarded ref to control the marquee.
 * @returns {React.ReactElement} The rendered Marquee component.
 * @example
 * <Marquee speed={5}>
 *   <p>This is scrolling text.</p>
 * </Marquee>
 */
const Marquee = forwardRef((props: MarqueeProps, ref: ForwardedRef<MarqueeRef>) => {
    const {
        children,
        speed = 8,
        pauseOnHover = true,
        onClick
    } = props;
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isSetMarqueeRef, markSetMarqueeRef] = useState(false);
    /**
     * @function setMarqueeRef
     * @description A callback ref to get a reference to the marquee content element.
     * @param {HTMLDivElement} el The DOM node.
     */
    const setMarqueeRef = useCallback((el: HTMLDivElement) => {
        if (el) {
            marqueeRef.current = el;
            markSetMarqueeRef(true)
        }
    }, []);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [style, setStyle] = useState<CSSProperties>(onClick
        ? { cursor: "pointer" }
        : {}
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSetContainerRef, markSetContainerRef] = useState(false);
    /**
     * @function setContainerRef
     * @description A callback ref to get a reference to the marquee container element.
     * @param {HTMLDivElement} el The DOM node.
     */
    const setContainerRef = useCallback((el: HTMLDivElement) => {
        if (el) {
            containerRef.current = el;
            markSetContainerRef(true)
        }
    }, []);

    // Expose pause and play methods to parent via ref
    useImperativeHandle(ref, () => ({
        pause: () => {
            if (marqueeRef.current) setStyle({ ...style, animationPlayState: "paused" });
        },
        play: () => {
            if (marqueeRef.current) setStyle({ ...style, animationPlayState: "running" });
        }
    }));

    useEffect(() => {
        /**
         * @function calculateMarquee
         * @description Determines if the content should scroll based on its width relative to the container.
         */
        const calculateMarquee = () => {
            if (containerRef.current && marqueeRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = marqueeRef.current.scrollWidth;

                setShouldScroll(contentWidth > containerWidth);
            }
        };

        calculateMarquee();

        window.addEventListener('resize', calculateMarquee);

        return () => {
            window.removeEventListener('resize', calculateMarquee);
        };

    }, [isSetMarqueeRef, isSetContainerRef]);

    useEffect(() => {
        setStyle(shouldScroll
            ? { ...style, animation: `marquee ${10 / speed}s linear infinite`, whiteSpace: "nowrap" }
            : { ...style, whiteSpace: "nowrap" })
    }, [shouldScroll, speed, style]);

    /**
     * @function handleMouseEnter
     * @description Pauses the marquee on mouse enter if pauseOnHover is true.
     */
    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setStyle({ ...style, animationPlayState: "paused" });
        }
    };

    /**
     * @function handleMouseLeave
     * @description Resumes the marquee on mouse leave if pauseOnHover is true.
     */
    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setStyle({ ...style, animationPlayState: "running" })
        }
    };

    return <div
        className="prismal-marquee" ref={setContainerRef}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        onClick={onClick}>
        <div
            ref={setMarqueeRef}
            className="prismal-marquee-content"
            style={style}
        >
            {children}
        </div>
    </div>
});
Marquee.displayName = "Marquee";
export default Marquee;