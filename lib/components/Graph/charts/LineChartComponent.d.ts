import { FC } from 'react';
interface Point {
    x: number;
    y: number;
    original: {
        x: any;
        y: any;
    };
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
export declare const LineChartComponent: FC<LineChartProps>;
export {};
