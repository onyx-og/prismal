import {
    RefObject, FC, useState, useEffect
} from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";

import "./index.scss";

/**
 * @typedef {object} CursorProps
 * @description Props for the Cursor component.
 * @property {RefObject<{ x: number, y: number }>} positionRef A ref object containing the cursor's x and y coordinates.
 * @property {"circle" | "dot" | "dashed" | "two-dots" | "gooey"} [type="circle"] The visual style of the cursor.
 */
export interface CursorProps extends ComponentProps {
    positionRef: RefObject<{ x: number, y: number }>;
    type?: "circle" | "dot" | "dashed" | "two-dots" | "gooey";
};

/**
 * @component Cursor
 * @description A custom cursor component that follows the mouse position within a parent container.
 * @param {CursorProps} props The component props.
 * @returns {React.ReactElement} The rendered Cursor component.
 * @example
 * const containerRef = useRef(null);
 * const cursorPositionRef = useCursorPosition(containerRef);
 * <div ref={containerRef}><Cursor positionRef={cursorPositionRef} /></div>
 */
const Cursor: FC<CursorProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        positionRef, type = "circle"
    } = props;

    let className_ = "prismal-cursor"
    className_ = `${className_} prismal-cursor-${type}`;
    if (className) className_ = `${className_} ${className}`;

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // We need a subscription model to get updates from the ref
        let animationFrameId: number;

        /**
         * @function updatePosition
         * @description Updates the cursor position based on the positionRef value.
         */
        const updatePosition = () => {
            // Get the value from the ref and update state
            if (positionRef.current) {
                setPosition(positionRef.current);
                animationFrameId = requestAnimationFrame(updatePosition);
            }
        };

        animationFrameId = requestAnimationFrame(updatePosition);

        return () => cancelAnimationFrame(animationFrameId);
    }, [positionRef]);

    let style_: {[key: string]: any} = {
        pointerEvents: 'none',
        "--cursor-position": `translate(${position.x}px, ${position.y}px)`,
    };
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (style) style_ = { ...style_, ...style };

    return <div data-id={dataId}
        className={className_}
        style={style_}
    >
    </div>
};



export default Cursor;