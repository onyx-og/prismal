import React, { RefObject } from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";

import "./index.scss";

export interface CursorProps extends ComponentProps {
    positionRef: RefObject<{ x: number, y: number }>;
    type?: "circle" | "dot" | "dashed" | "two-dots" | "gooey";
};
const Cursor: React.FC<CursorProps> = (props) => {
    const {
        "data-id": dataId,
        className, style,
        accent, accentLight, accentDark,
        positionRef, type = "circle"
    } = props;

    let className_ = "prismal-cursor"
    className_ = `${className_} prismal-cursor-${type}`;
    if (className) className_ = `${className_} ${className}`;

    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        // We need a subscription model to get updates from the ref
        let animationFrameId: number;

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