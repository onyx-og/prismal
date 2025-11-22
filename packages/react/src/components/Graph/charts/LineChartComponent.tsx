import { FC } from 'react';

interface Point {
    x: number;
    y: number;
    original: { x: any; y: any };
}
interface Tick {
    value: string | number;
    x?: number;
    y?: number;
}
interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface LineChartProps {
    width: number;
    height: number;
    margin: Margin;
    linePath: string;
    points: Point[];
    xAxisTicks: Tick[];
    yAxisTicks: Tick[];
    colors: string[];
    showMarkers: boolean;
}

export const LineChartComponent: FC<LineChartProps> = ({
    width,
    height,
    margin,
    linePath,
    points,
    xAxisTicks,
    yAxisTicks,
    colors,
    showMarkers
}) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return (
        <svg width={width} height={height} className="font-sans">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* Y-Axis Grid Lines & Ticks */}
                {yAxisTicks.map((tick, i) => (
                    <g key={i} transform={`translate(0, ${tick.y})`}>
                        <line
                            x1={0}
                            x2={innerWidth}
                            stroke={i === 0 ? 'transparent' : '#e5e7eb'} // tailwind gray-200
                            strokeWidth="1"
                            strokeDasharray="2,2"
                        />
                        <text
                            x="-8"
                            textAnchor="end"
                            dy="0.32em"
                            fill="#6b7280" // tailwind gray-500
                            fontSize="12"
                        >
                            {tick.value}
                        </text>
                    </g>
                ))}

                {/* X-Axis Ticks */}
                {xAxisTicks.map((tick, i) => (
                    <text
                        key={i}
                        x={tick.x}
                        y={innerHeight + 20}
                        textAnchor="middle"
                        fill="#6b7280" // tailwind gray-500
                        fontSize="12"
                    >
                        {tick.value}
                    </text>
                ))}

                {/* Axes Lines */}
                <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="#d1d5db" />
                <line x1="0" y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#d1d5db" />


                {/* Line Path */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={colors[0]}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Markers */}
                {showMarkers && points.map((point, i) => (
                    <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={colors[0]}
                        stroke="#fff"
                        strokeWidth="2"
                    />
                ))}
            </g>
        </svg>
    );
};