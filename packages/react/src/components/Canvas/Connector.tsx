import { FC, MouseEvent as ReactMouseEvent } from "react";
import { CanvasNode, Connector, destinationList } from "./types";
import { resolveEndpoint, buildConnectorPath } from "./geometry";

export interface ConnectorViewProps {
    connector: Connector;
    nodes: CanvasNode[];
    onClickConnector?: (connector: Connector, event: ReactMouseEvent) => void;
}

/**
 * @component ConnectorView
 * @description Renders an edge between a source port and one or more destination ports. When
 * `destinationPoints` holds more than one endpoint, a path is drawn to each — the branching case.
 */
const ConnectorView: FC<ConnectorViewProps> = ({ connector, nodes, onClickConnector }) => {
    const source = resolveEndpoint(nodes, connector.sourcePoint);
    if (!source) return null;

    const destinations = destinationList(connector)
        .map((endpoint) => resolveEndpoint(nodes, endpoint))
        .filter((resolved): resolved is NonNullable<typeof resolved> => resolved !== null);

    if (destinations.length === 0) return null;

    let className = "prismal-canvas-connector";
    if (connector.isSelected) className += " prismal-canvas-connector-selected";

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
