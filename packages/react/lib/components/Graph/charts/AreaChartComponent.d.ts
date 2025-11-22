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
export declare const AreaChartComponent: FC<AreaChartProps>;
export {};
