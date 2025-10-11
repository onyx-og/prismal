import {
    useState, useEffect, useCallback, useImperativeHandle,
    useRef, forwardRef, CSSProperties, ReactNode, ForwardedRef
} from "react";

import ComponentProps from "../Component";

import "./index.scss";

type MarqueeRef = {
    pause: () => void;
    play: () => void;
}
export interface MarqueeProps extends ComponentProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    /** Decimal from 0 to 1 */
    speed?: number;
    onClick?: () => void;
}
const Marquee = forwardRef((props: MarqueeProps, ref: ForwardedRef<MarqueeRef>) => {
    const {
        children,
        speed = 8,
        pauseOnHover = true,
        onClick
    } = props;
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isSetMarqueeRef, markSetMarqueeRef] = useState(false);
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
    }, [shouldScroll]);

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setStyle({ ...style, animationPlayState: "paused" });
        }
    };


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

export default Marquee;