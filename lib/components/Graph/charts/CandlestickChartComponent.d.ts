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
export declare const CandlestickChartComponent: FC<CandlestickChartProps>;
export {};
