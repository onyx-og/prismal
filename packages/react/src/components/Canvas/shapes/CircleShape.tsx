import { FC } from "react";
import { CircleNode } from "../types";

const CircleShape: FC<{ node: CircleNode }> = ({ node }) => {
    const r = Math.min(node.width, node.height) / 2;
    return (
        <circle
            className="prismal-canvas-shape prismal-canvas-shape-circle"
            cx={node.width / 2}
            cy={node.height / 2}
            r={r}
        />
    );
};

export default CircleShape;
