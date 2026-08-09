import { FC } from "react";
import { LoopNode } from "../types";

/** A rounded rectangle with a repeat-arrow glyph marking the loop-back port. */
const LoopShape: FC<{ node: LoopNode }> = ({ node }) => {
    const { width: w, height: h } = node;
    const r = Math.min(16, h / 3) / 2;
    const cx = r + 8;
    const cy = h / 2;

    return (
        <>
            <rect
                className="prismal-canvas-shape prismal-canvas-shape-loop"
                x={0}
                y={0}
                width={w}
                height={h}
                rx={8}
                ry={8}
            />
            {/* Repeat-arrow glyph: an open circle (3/4 turn) with an arrowhead marking the loop-back port. */}
            <circle
                className="prismal-canvas-shape-loop-glyph"
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                pathLength={100}
                strokeDasharray="75 100"
                strokeDashoffset={-5}
            />
            <polygon
                className="prismal-canvas-shape-loop-glyph"
                points={`${cx + r},${cy} ${cx + r + 5},${cy - 5} ${cx + r + 5},${cy + 5}`}
            />
        </>
    );
};

export default LoopShape;
