import { FC } from "react";
import { ControlNode } from "../types";

/** A decision diamond: one input on top, two outputs (right/bottom). */
const ControlShape: FC<{ node: ControlNode }> = ({ node }) => {
    const { width: w, height: h } = node;
    const points = [
        [w / 2, 0],
        [w, h / 2],
        [w / 2, h],
        [0, h / 2],
    ].map(([x, y]) => `${x},${y}`).join(" ");

    return (
        <polygon
            className="prismal-canvas-shape prismal-canvas-shape-control"
            points={points}
        />
    );
};

export default ControlShape;
