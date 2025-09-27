import { RefObject, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface CursorProps extends ComponentProps {
    positionRef: RefObject<{
        x: number;
        y: number;
    }>;
    type?: "circle" | "dot" | "dashed" | "two-dots" | "gooey";
}
declare const Cursor: FC<CursorProps>;
export default Cursor;
