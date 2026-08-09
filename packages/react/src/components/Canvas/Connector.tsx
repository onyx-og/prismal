import { FC, MouseEvent as ReactMouseEvent } from "react";
import { CanvasNode, Connector, FlowDirection, destinationList } from "./types";
import { resolveEndpoint, buildConnectorPath } from "./geometry";

export interface ConnectorViewProps {
    connector: Connector;
    nodes: CanvasNode[];
    /** The diagram's flow direction — needed to resolve endpoints on nodes whose ports default differently per direction (see `NodeView`). */
    flowDirection?: FlowDirection;
    onClickConnector?: (connector: Connector, event: ReactMouseEvent) => void;
    /** Fades this connector — used while it's the one being rewired by a drag-to-connect gesture, so the in-progress preview line doesn't read as a duplicate. */
    dimmed?: boolean;
}

/**
 * @component ConnectorView
 * @description Renders an edge between a source port and one or more destination ports. When
 * `destinationPoints` holds more than one endpoint, a path is drawn to each — the branching case.
 */
const ConnectorView: FC<ConnectorViewProps> = ({ connector, nodes, flowDirection = "vertical", onClickConnector, dimmed }) => {
    const source = resolveEndpoint(nodes, connector.sourcePoint, flowDirection);
    if (!source) return null;

    const destinations = destinationList(connector)
        .map((endpoint) => resolveEndpoint(nodes, endpoint, flowDirection))
        .filter((resolved): resolved is NonNullable<typeof resolved> => resolved !== null);

    if (destinations.length === 0) return null;

    let className = "prismal-canvas-connector";
    if (connector.isSelected) className += " prismal-canvas-connector-selected";
    if (dimmed) className += " prismal-canvas-connector-dimmed";

    const midpoint = destinations[0].position;
    const labelX = (source.position.x + midpoint.x) / 2;
    const labelY = (source.position.y + midpoint.y) / 2;

    return (
        <g className={className} data-connector-id={connector.id}>
            {destinations.map((destination, i) => (
                <path
                    key={i}
                    className="prismal-canvas-connector-path"
                    d={buildConnectorPath(source.position, source.point?.side, destination.position, destination.point?.side)}
                    fill="none"
                    markerEnd="url(#prismal-canvas-arrow)"
                    onClick={(event) => onClickConnector?.(connector, event)}
                />
            ))}
            {connector.label ? (
                <text className="prismal-canvas-connector-label" x={labelX} y={labelY} textAnchor="middle">
                    {connector.label}
                </text>
            ) : null}
        </g>
    );
};

export default ConnectorView;
