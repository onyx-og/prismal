import { RefObject, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} CursorProps
 * @description Props for the Cursor component.
 * @property {RefObject<{ x: number, y: number }>} positionRef A ref object containing the cursor's x and y coordinates.
 * @property {"circle" | "dot" | "dashed" | "two-dots" | "gooey"} [type="circle"] The visual style of the cursor.
 */
export interface CursorProps extends ComponentProps {
    positionRef: RefObject<{
        x: number;
        y: number;
    }>;
    type?: "circle" | "dot" | "dashed" | "two-dots" | "gooey";
}
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
declare const Cursor: FC<CursorProps>;
export default Cursor;
