import { FC, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { CanvasNode, LoopNode } from "./types";
import { getNodePorts } from "./ports";
import { getPortLocalPosition } from "./geometry";
import CircleShape from "./shapes/CircleShape";
import RectangleShape from "./shapes/RectangleShape";
import ControlShape from "./shapes/ControlShape";
import UnionShape from "./shapes/UnionShape";
import LoopShape from "./shapes/LoopShape";
import EndShape from "./shapes/EndShape";

const SHAPE_RENDERERS: Record<CanvasNode["shape"], FC<{ node: any }>> = {
    circle: CircleShape,
    rectangle: RectangleShape,
    control: ControlShape,
    union: UnionShape,
    loop: LoopShape,
    end: EndShape,
};

export interface NodeViewProps {
    node: CanvasNode;
    onPointerDownNode?: (node: CanvasNode, event: ReactPointerEvent) => void;
    onPointerDownPort?: (node: CanvasNode, pointId: string, event: ReactPointerEvent) => void;
    onClickNode?: (node: CanvasNode, event: ReactMouseEvent) => void;
}

/**
 * @component NodeView
 * @description Renders a single Canvas node: its shape, label, and connection points, and wires up
 * the pointer handlers Canvas uses to drive dragging and selection.
 */
const NodeView: FC<NodeViewProps> = ({ node, onPointerDownNode, onPointerDownPort, onClickNode }) => {
    const ShapeComponent = SHAPE_RENDERERS[node.shape];
    const ports = node.connectable === false ? [] : getNodePorts(node.shape);

    let className = `prismal-canvas-node prismal-canvas-node-${node.shape}`;
    if (node.isSelected) className += " prismal-canvas-node-selected";
    if (node.isDragging) className += " prismal-canvas-node-dragging";
    if (node.draggable === false) className += " prismal-canvas-node-static";

    return (
        <g
            className={className}
            transform={`translate(${node.position.x}, ${node.position.y})`}
            data-node-id={node.id}
            onPointerDown={(event) => onPointerDownNode?.(node, event)}
            onClick={(event) => onClickNode?.(node, event)}
        >
            <ShapeComponent node={node} />
            <text
                className="prismal-canvas-node-label"
                x={node.width / 2}
                y={node.shape === "loop" ? node.height / 2 - 7 : node.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {node.name}
            </text>
            {node.shape === "loop" ? (
                <text
                    className="prismal-canvas-node-sublabel"
                    x={node.width / 2}
                    y={node.height / 2 + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {(node as LoopNode).mode}
                </text>
            ) : null}
            {ports.map((port) => {
                const { x, y } = getPortLocalPosition(node, port.id);
                return (
                    <g key={port.id} className="prismal-canvas-port-group">
                        <circle
                            className="prismal-canvas-port"
                            data-port-id={port.id}
                            cx={x}
                            cy={y}
                            r={5}
                            onPointerDown={(event) => {
                                event.stopPropagation();
                                onPointerDownPort?.(node, port.id, event);
                            }}
                        />
                        {port.label ? (
                            <text
                                className="prismal-canvas-port-label"
                                x={x + (port.side === "left" ? -8 : port.side === "right" ? 8 : 0)}
                                y={y + (port.side === "bottom" ? 14 : port.side === "top" ? -8 : 4)}
                                textAnchor={port.side === "left" ? "end" : port.side === "right" ? "start" : "middle"}
                            >
                                {port.label}
                            </text>
                        ) : null}
                    </g>
                );
            })}
        </g>
    );
};

export default NodeView;
