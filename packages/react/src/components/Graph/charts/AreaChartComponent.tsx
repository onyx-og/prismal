import { FC } from 'react';

interface Area {
    path: string;
    color: string;
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
export interface AreaChartProps {
    width: number;
    height: number;
    margin: Margin;
    areas: Area[];
    xAxisTicks: Tick[];
    yAxisTicks: Tick[];
}

export const AreaChartComponent: FC<AreaChartProps> = ({
    width,
    height,
    margin,
    areas,
    xAxisTicks,
    yAxisTicks,
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


                {/* Area Paths */}
                {areas.map((area, i) => (
                    <path
                        key={i}
                        d={area.path}
                        fill={area.color}
                    />
                ))}
            </g>
        </svg>
    );
};