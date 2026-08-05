import {
    useState, useEffect, useCallback, useImperativeHandle,
    useRef, forwardRef, useMemo, CSSProperties, ReactNode, ForwardedRef
} from "react";

import ComponentProps from "../Component";
import useBreakpoint, { Breakpoint } from "hooks/useBreakpoint";

import "./index.scss";

const DEFAULT_SPEED = 8;
const BREAKPOINT_ORDER: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

/**
 * @function resolveSpeed
 * @description Resolves a single speed value for the current breakpoint. When `speed` is a
 * per-breakpoint map, falls back to the nearest smaller breakpoint's value, then to the default.
 */
const resolveSpeed = (speed: MarqueeProps["speed"], breakpoint: Breakpoint): number => {
    if (speed === undefined) return DEFAULT_SPEED;
    if (typeof speed === "number") return speed;

    const startIdx = BREAKPOINT_ORDER.indexOf(breakpoint);
    for (let i = startIdx; i >= 0; i--) {
        const value = speed[BREAKPOINT_ORDER[i]];
        if (value !== undefined) return value;
    }
    return DEFAULT_SPEED;
};

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
 */
export interface MarqueeProps extends ComponentProps {
    /** The content to be scrolled. */
    children: ReactNode;
    /** If true, the animation pauses on mouse hover. */
    pauseOnHover?: boolean;
    /** A decimal from 0 to 1 representing the scroll speed, either a single value or a per-breakpoint map. */
    speed?: number | Partial<Record<Breakpoint, number>>;
    /** Click event handler for the marquee. */
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
        speed,
        pauseOnHover = true,
        onClick
    } = props;
    const { breakpoint } = useBreakpoint();
    const resolvedSpeed = useMemo(() => resolveSpeed(speed, breakpoint), [speed, breakpoint]);
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
    const [isPlaying, setIsPlaying] = useState(true);

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
        pause: () => setIsPlaying(false),
        play: () => setIsPlaying(true)
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

    const style: CSSProperties = {
        ...(onClick ? { cursor: "pointer" } : {}),
        whiteSpace: "nowrap",
        ...(shouldScroll ? {
            animation: `marquee ${10 / resolvedSpeed}s linear infinite`,
            animationPlayState: isPlaying ? "running" : "paused"
        } : {})
    };

    /**
     * @function handleMouseEnter
     * @description Pauses the marquee on mouse enter if pauseOnHover is true.
     */
    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPlaying(false);
        }
    };

    /**
     * @function handleMouseLeave
     * @description Resumes the marquee on mouse leave if pauseOnHover is true.
     */
    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPlaying(true);
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