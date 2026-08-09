import { FC } from "react";
import { RectangleNode } from "../types";

const variantRadius = (node: RectangleNode): number => {
    if (node.borderRadius !== undefined) return node.borderRadius;
    switch (node.variant) {
        case "pill": return Math.min(node.width, node.height) / 2;
        case "rounded": return 12;
        case "sharp": default: return 0;
    }
};

const RectangleShape: FC<{ node: RectangleNode }> = ({ node }) => (
    <rect
        className="prismal-canvas-shape prismal-canvas-shape-rectangle"
        x={0}
        y={0}
        width={node.width}
        height={node.height}
        rx={variantRadius(node)}
        ry={variantRadius(node)}
    />
);

export default RectangleShape;
