import { FC } from 'react';

interface Bar {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}
interface Tick {
    value: string | number;
    pos: number;
}
interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface BarChartProps {
    width: number;
    height: number;
    margin: Margin;
    bars: Bar[];
    xAxisTicks: Tick[];
    yAxisTicks: Tick[];
    layout: 'vertical' | 'horizontal';
}

export const BarChartComponent: FC<BarChartProps> = ({
    width,
    height,
    margin,
    bars,
    xAxisTicks,
    yAxisTicks,
    layout
}) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const isVertical = layout === 'vertical';

    return (
        <svg width={width} height={height} className="font-sans">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* Axes & Grid lines */}
                {isVertical ? (
                    <>
                        {/* Y-Axis Grid Lines & Ticks */}
                        {yAxisTicks.map((tick, i) => (
                            <g key={i} transform={`translate(0, ${tick.pos})`} className="text-gray-500">
                                <line x1={0} x2={innerWidth} stroke={i === yAxisTicks.length - 1 ? 'transparent' : '#e5e7eb'} strokeWidth="1" strokeDasharray="2,2" />
                                <text x="-8" textAnchor="end" dy="0.32em" fill="currentColor" fontSize="12">{tick.value}</text>
                            </g>
                        ))}
                        {/* X-Axis Ticks */}
                        {xAxisTicks.map((tick, i) => (
                            <text key={i} x={tick.pos} y={innerHeight + 20} textAnchor="middle" fill="#6b7280" fontSize="12">{tick.value}</text>
                        ))}
                    </>
                ) : (
                    <>
                        {/* X-Axis Grid Lines & Ticks */}
                        {xAxisTicks.map((tick, i) => (
                            <g key={i} transform={`translate(${tick.pos}, 0)`} className="text-gray-500">
                                <line y1={0} y2={innerHeight} stroke={i === 0 ? 'transparent' : '#e5e7eb'} strokeWidth="1" strokeDasharray="2,2" />
                                <text x="0" y={innerHeight + 20} textAnchor="middle" fill="currentColor" fontSize="12">{tick.value}</text>
                            </g>
                        ))}
                        {/* Y-Axis Ticks */}
                        {yAxisTicks.map((tick, i) => (
                            <text key={i} x="-8" y={tick.pos} textAnchor="end" dy="0.32em" fill="#6b7280" fontSize="12">{tick.value}</text>
                        ))}
                    </>
                )}
                {/* Axis Lines */}
                <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="#d1d5db" />
                <line x1="0" y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#d1d5db" />

                {/* Bars */}
                {bars.map((bar, i) => (
                    <rect
                        key={i}
                        x={bar.x}
                        y={bar.y}
                        width={Math.max(0, bar.width)}
                        height={Math.max(0, bar.height)}
                        fill={bar.color}
                        rx="2"
                    />
                ))}
            </g>
        </svg>
    );
};