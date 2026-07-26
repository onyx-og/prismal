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
export declare const BarChartComponent: FC<BarChartProps>;
export {};
