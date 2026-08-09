import { FC } from "react";
import { EndNode } from "../types";

/** A terminal node — a filled ring, matching the flowchart "end" symbol. */
const EndShape: FC<{ node: EndNode }> = ({ node }) => {
    const r = Math.min(node.width, node.height) / 2;
    return (
        <>
            <circle
                className="prismal-canvas-shape prismal-canvas-shape-end"
                cx={node.width / 2}
                cy={node.height / 2}
                r={r}
            />
            <circle
                className="prismal-canvas-shape-end-inner"
                cx={node.width / 2}
                cy={node.height / 2}
                r={Math.max(0, r - 5)}
                fill="none"
            />
        </>
    );
};

export default EndShape;
