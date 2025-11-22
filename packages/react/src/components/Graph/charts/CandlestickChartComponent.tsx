import { FC } from 'react';

interface Candle {
    wick: {
        x: number;
        y1: number;
        y2: number;
    };
    body: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
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
export interface CandlestickChartProps {
    width: number;
    height: number;
    margin: Margin;
    candles: Candle[];
    xAxisTicks: Tick[];
    yAxisTicks: Tick[];
}

export const CandlestickChartComponent: FC<CandlestickChartProps> = ({
    width,
    height,
    margin,
    candles,
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
                    <g key={i} transform={`translate(0, ${tick.pos})`}>
                        <line
                            x1={0}
                            x2={innerWidth}
                            stroke={'#e5e7eb'} // tailwind gray-200
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
                        x={tick.pos}
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


                {/* Candlesticks */}
                {candles.map((candle, i) => (
                    <g key={i}>
                        {/* Wick */}
                        <line
                            x1={candle.wick.x}
                            y1={candle.wick.y1}
                            x2={candle.wick.x}
                            y2={candle.wick.y2}
                            stroke={candle.color}
                            strokeWidth="1"
                        />
                        {/* Body */}
                        <rect
                            x={candle.body.x}
                            y={candle.body.y}
                            width={candle.body.width}
                            height={Math.max(0, candle.body.height)}
                            fill={candle.color}
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
};