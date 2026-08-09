import { FC } from "react";
import { UnionNode } from "../types";

/** Builds the funnel polygon within [0,0,w,h], full-width/height on the wide edge, narrowing to a point on the opposite edge. */
const buildPoints = (w: number, h: number, rotation: number): [number, number][] => {
    switch (rotation) {
        case 90: // wide top, narrows to a point at the bottom (flows top → bottom)
            return [[0, 0], [w, 0], [w * 0.85, h * 0.7], [w / 2, h], [w * 0.15, h * 0.7]];
        case 180: // wide right, narrows to a point at the left (flows right → left)
            return [[w, 0], [w, h], [w * 0.3, h * 0.85], [0, h / 2], [w * 0.3, h * 0.15]];
        case 270: // wide bottom, narrows to a point at the top (flows bottom → top)
            return [[0, h], [w, h], [w * 0.85, h * 0.3], [w / 2, 0], [w * 0.15, h * 0.3]];
        default: // 0: wide left, narrows to a point at the right (flows left → right)
            return [[0, 0], [w * 0.7, h * 0.15], [w, h / 2], [w * 0.7, h * 0.85], [0, h]];
    }
};

/**
 * A converge/funnel shape, full-width/height on the input side and narrowing to a point on the
 * output side. `rotation` is the node's *effective* rotation (its own `rotation` if set, otherwise
 * Canvas's derived default for the current flow direction) — always use the prop, not `node.rotation`
 * directly, so the shape matches whichever ports actually got rendered.
 */
const UnionShape: FC<{ node: UnionNode; rotation: number }> = ({ node, rotation }) => {
    const points = buildPoints(node.width, node.height, rotation)
        .map(([x, y]) => `${x},${y}`).join(" ");

    return (
        <polygon
            className="prismal-canvas-shape prismal-canvas-shape-union"
            points={points}
        />
    );
};

export default UnionShape;
