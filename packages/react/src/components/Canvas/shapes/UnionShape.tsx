import { FC } from "react";
import { UnionNode } from "../types";

/** A converge/funnel shape: full height on the left (inputs), narrowing to a single point on the right (output). */
const UnionShape: FC<{ node: UnionNode }> = ({ node }) => {
    const { width: w, height: h } = node;
    const points = [
        [0, 0],
        [w * 0.7, h * 0.15],
        [w, h / 2],
        [w * 0.7, h * 0.85],
        [0, h],
    ].map(([x, y]) => `${x},${y}`).join(" ");

    return (
        <polygon
            className="prismal-canvas-shape prismal-canvas-shape-union"
            points={points}
        />
    );
};

export default UnionShape;
