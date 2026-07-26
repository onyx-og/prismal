import React from 'react';
import { GraphType } from './types';
interface GraphKeys {
    x: string;
    y?: string | string[];
    open?: string;
    high?: string;
    low?: string;
    close?: string;
}
interface UseGraphProps {
    type: GraphType;
    data: any[];
    keys: GraphKeys;
    onDataProcessed?: (processedData: any[]) => void;
    showMarkers?: boolean;
    isCurved?: boolean;
    colors?: string[];
    width: number;
    height: number;
    layout?: 'vertical' | 'horizontal';
}
export declare const useGraph: ({ type, data, keys, onDataProcessed, showMarkers, isCurved, colors, width, height, layout, }: UseGraphProps) => {
    ChartComponent: React.FC<any>;
    chartProps: {
        width: number;
        height: number;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        candles: {
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
        }[];
        xAxisTicks: {
            value: string;
            pos: number;
        }[];
        yAxisTicks: {
            value: string;
            pos: number;
        }[];
        areas?: undefined;
        bars?: undefined;
        layout?: undefined;
        linePath?: undefined;
        points?: undefined;
        colors?: undefined;
        showMarkers?: undefined;
    } | {
        width: number;
        height: number;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        areas: {
            path: string;
            color: string;
        }[];
        xAxisTicks: {
            value: number;
            x: number;
        }[];
        yAxisTicks: {
            value: string;
            y: number;
        }[];
        candles?: undefined;
        bars?: undefined;
        layout?: undefined;
        linePath?: undefined;
        points?: undefined;
        colors?: undefined;
        showMarkers?: undefined;
    } | {
        width: number;
        height: number;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        bars: {
            x: number;
            y: number;
            width: number;
            height: number;
            color: string;
        }[];
        xAxisTicks: {
            value: string;
            pos: number;
        }[];
        yAxisTicks: {
            value: string;
            pos: number;
        }[];
        layout: "horizontal" | "vertical";
        candles?: undefined;
        areas?: undefined;
        linePath?: undefined;
        points?: undefined;
        colors?: undefined;
        showMarkers?: undefined;
    } | {
        width: number;
        height: number;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        linePath: string;
        points: {
            x: number;
            y: number;
            original: {
                x: number;
                y: number;
            };
        }[];
        xAxisTicks: {
            value: number;
            x: number;
        }[];
        yAxisTicks: {
            value: string;
            y: number;
        }[];
        colors: string[];
        showMarkers: boolean;
        candles?: undefined;
        areas?: undefined;
        bars?: undefined;
        layout?: undefined;
    } | null;
};
export {};
