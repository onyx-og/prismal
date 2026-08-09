import { FC } from "react";
import Card from "components/Card";
import Button from "components/Button";
import { CanvasNode, LoopNode, NodeShape } from "./types";

const SHAPE_LABELS: Record<NodeShape, string> = {
    circle: "Circle",
    rectangle: "Rectangle",
    control: "Control",
    union: "Union",
    loop: "Loop",
    end: "End",
};

export interface NodeInspectorProps<TData = unknown> {
    node: CanvasNode<TData>;
    onEdit?: () => void;
    className?: string;
}

/**
 * @component NodeInspector
 * @description A fieldset-styled summary card for the selected node (inspired by `Card`'s
 * `type="fieldset"` + `legend`), whose legend hosts the Edit button that opens `NodeEditor`.
 * Canvas renders this only while exactly one node is selected.
 */
const NodeInspector: FC<NodeInspectorProps> = ({ node, onEdit, className }) => {
    let className_ = "prismal-canvas-inspector";
    if (className) className_ = `${className_} ${className}`;

    return (
        <Card
            className={className_}
            type="fieldset"
            padding="s"
            legend={
                <span className="prismal-canvas-inspector-legend">
                    <span className="prismal-canvas-inspector-legend-title">{node.name}</span>
                    <Button type="text" size="sm" iconName="edit" title="Edit node" onClick={onEdit} />
                </span>
            }
        >
            <dl className="prismal-canvas-inspector-fields">
                <dt>Shape</dt>
                <dd>{SHAPE_LABELS[node.shape]}</dd>
                {node.shape === "loop" ? (
                    <>
                        <dt>Mode</dt>
                        <dd>{(node as LoopNode).mode}</dd>
                    </>
                ) : null}
                <dt>Position</dt>
                <dd>{Math.round(node.position.x)}, {Math.round(node.position.y)}</dd>
            </dl>
        </Card>
    );
};

export default NodeInspector;
