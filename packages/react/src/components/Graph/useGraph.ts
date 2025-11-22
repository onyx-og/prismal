import React, { useMemo, useEffect, FC } from 'react';
// FIX: Import CandlestickDataPoint to use for strong typing.
import { GraphType, CandlestickDataPoint } from './types';
import { LineChartComponent } from './charts/LineChartComponent';
import { BarChartComponent } from './charts/BarChartComponent';
import { AreaChartComponent } from './charts/AreaChartComponent';
import { CandlestickChartComponent } from './charts/CandlestickChartComponent';

interface GraphKeys {
    x: string;
    y?: string | string[];
    open?: string;
    high?: string;
    low?: string;
    close?: string;
}

interface Point {
    x: number;
    y: number;
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

const DEFAULT_COLORS = ['#be123c', '#5b21b6', '#3730a3'];
const BULLISH_COLOR = '#16a34a';
const BEARISH_COLOR = '#dc2626';

// --- START: Bézier curve calculation helpers ---

const line = (pointA: Point, pointB: Point) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
    };
};

const controlPoint = (current: Point, previous: Point | undefined, next: Point | undefined, reverse?: boolean): [number, number] => {
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.2;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current.x + Math.cos(angle) * length;
    const y = current.y + Math.sin(angle) * length;
    return [x, y];
};

const createCurvedPath = (points: (Point & { original?: any })[]) => {
    return points.reduce((path, point, i) => {
        if (i === 0) {
            return `M ${point.x},${point.y}`;
        }
        const [cpsX, cpsY] = controlPoint(points[i - 1], points[i - 2], point);
        const [cpeX, cpeY] = controlPoint(point, points[i - 1], points[i + 1], true);
        return `${path} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
    }, '');
};

// --- END: Bézier curve calculation helpers ---

export const useGraph = ({
    type,
    data,
    keys,
    onDataProcessed,
    showMarkers = false,
    isCurved = false,
    colors = DEFAULT_COLORS,
    width,
    height,
    layout = 'vertical',
}: UseGraphProps) => {

    const isCandlestickData = (array: Array<any>): array is CandlestickDataPoint[] => {
        if (array.length === 0) {
            return false;
        }
        return array.every(item => item.hasOwnProperty("open") && item.hasOwnProperty("high") && item.hasOwnProperty("low") && item.hasOwnProperty("close"));
    }

    const processedData: CandlestickDataPoint[] | { x: number;[key: string]: number }[] = useMemo(() => {
        if (type === GraphType.CANDLESTICK) {
            return data.map(item => ({
                x: item[keys.x],
                open: Number(item[keys.open!]),
                high: Number(item[keys.high!]),
                low: Number(item[keys.low!]),
                close: Number(item[keys.close!]),
            }));
        }
        const yKeys = Array.isArray(keys.y) ? keys.y : (keys.y ? [keys.y] : []);
        return data.map(item => {
            const yValues: { [key: string]: number } = {};
            yKeys.forEach(key => {
                yValues[key] = Number(item[key]) || 0;
            });
            return {
                x: item[keys.x],
                ...yValues,
            };
        });
    }, [data, keys, type]);

    useEffect(() => {
        if (onDataProcessed) {
            onDataProcessed(processedData);
        }
    }, [processedData, onDataProcessed]);

    const chartProps = useMemo(() => {
        const isBarChart = [GraphType.BAR_VERTICAL, GraphType.BAR_HORIZONTAL, GraphType.BAR_STACKED, GraphType.BAR_GROUPED].includes(type);
        const isAreaChart = [GraphType.AREA_STACKED].includes(type);
        const isCandlestickChart = type === GraphType.CANDLESTICK;

        const margin = { top: 5, right: 20, bottom: 25, left: 45 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        if (innerWidth <= 0 || innerHeight <= 0 || processedData.length === 0) return null;

        // --- UTILITY SCALES ---
        const bandScale = (domain: string[], range: number) => {
            const step = range / domain.length;
            const padding = step * 0.2; // 20% padding between bands
            const bandwidth = step - padding;
            const scale = (value: string) => domain.indexOf(value) * step + padding / 2;
            scale.bandwidth = () => bandwidth;
            return scale;
        };

        if (isCandlestickChart && isCandlestickData(processedData)) {
            // FIX: Add CandlestickDataPoint type annotation to map callbacks to resolve property access errors on 'd'.
            const allLows = processedData.map((d: CandlestickDataPoint) => d.low);
            const allHighs = processedData.map((d: CandlestickDataPoint) => d.high);
            const minLow = Math.min(...allLows);
            const maxHigh = Math.max(...allHighs);
            const yPadding = (maxHigh - minLow) * 0.05;

            const yDomain = [minLow - yPadding, maxHigh + yPadding];
            const yRange = yDomain[1] - yDomain[0];
            const yScale = (value: number) => innerHeight - ((value - yDomain[0]) / yRange) * innerHeight;

            const xDomain = processedData.map((d: CandlestickDataPoint) => d.x as string);
            const xScale = bandScale(xDomain, innerWidth);

            const xAxisTicks = xDomain.map(val => ({ value: val, pos: xScale(val) + xScale.bandwidth() / 2 }));
            const yAxisTicks = Array.from({ length: 6 }, (_, i) => {
                const value = yDomain[0] + (yRange / 5) * i;
                return { value: value.toLocaleString(undefined, { maximumFractionDigits: 2 }), pos: yScale(value) };
            });

            const candles = processedData.map((d: CandlestickDataPoint) => {
                const isBullish = d.close >= d.open;
                const bodyTop = yScale(isBullish ? d.close : d.open);
                const bodyBottom = yScale(isBullish ? d.open : d.close);

                return {
                    wick: {
                        x: xScale(d.x as string) + xScale.bandwidth() / 2,
                        y1: yScale(d.high),
                        y2: yScale(d.low),
                    },
                    body: {
                        x: xScale(d.x as string),
                        y: bodyTop,
                        width: xScale.bandwidth(),
                        height: bodyBottom - bodyTop
                    },
                    color: isBullish ? BULLISH_COLOR : BEARISH_COLOR
                };
            });
            return { width, height, margin, candles, xAxisTicks, yAxisTicks };
        } else if (isAreaChart) {
            const yKeysRaw = Array.isArray(keys.y) ? keys.y : (keys.y ? [keys.y] : []);
            if (yKeysRaw.length === 0) return null;

            const yKeys = yKeysRaw.map(key => ({
                key,
                sum: processedData.reduce((acc, d) => acc + d[key], 0),
            })).sort((a, b) => b.sum - a.sum).map(d => d.key);

            const yMax = Math.max(...processedData.flatMap(d => yKeys.map(key => d[key])));
            const yDomain = [0, yMax * 1.05];
            const yRange = yDomain[1] - yDomain[0];

            const yScale = (value: number) => innerHeight - ((value - yDomain[0]) / yRange) * innerHeight;
            const xScale = (index: number) => (processedData.length > 1 ? (index / (processedData.length - 1)) * innerWidth : innerWidth / 2);

            const yBaseline = yScale(0);

            const xAxisTicks = processedData.map((d, i) => ({ value: d.x, x: xScale(i) }));
            const yAxisTicks = Array.from({ length: 6 }, (_, i) => {
                const value = yDomain[0] + (yRange / 5) * i;
                return { value: value.toLocaleString(undefined, { maximumFractionDigits: 0 }), y: yScale(value) };
            });

            const areaPaths = yKeys.map((key, keyIndex) => {
                const points = processedData.map((d, i) => ({
                    x: xScale(i),
                    y: yScale(d[key]),
                }));

                const topPath = isCurved
                    ? createCurvedPath(points)
                    : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

                const startPoint = points[0];
                const endPoint = points[points.length - 1];

                const path = `${topPath} L ${endPoint.x},${yBaseline} L ${startPoint.x},${yBaseline} Z`;

                return {
                    path,
                    color: colors[keyIndex % colors.length],
                };
            });

            return { width, height, margin, areas: areaPaths, xAxisTicks, yAxisTicks };

        } else if (isBarChart) {
            const isVertical = layout === 'vertical';
            const yKeys = Array.isArray(keys.y) ? keys.y : (keys.y ? [keys.y] : []);

            const xDomain = processedData.map(d => `${d.x}`);

            const yMax = type === GraphType.BAR_STACKED
                ? Math.max(...processedData.map(d => yKeys.reduce((sum, key) => sum + d[key], 0)))
                : Math.max(...processedData.flatMap(d => yKeys.map(key => d[key])));

            const yDomain = [0, yMax * 1.05];

            const linearScale = (domain: number[], range: number) => {
                return (value: number) => (value / domain[1]) * range;
            };

            const catScale = isVertical ? bandScale(xDomain, innerWidth) : bandScale(xDomain, innerHeight);
            const valScale = isVertical ? linearScale(yDomain, innerHeight) : linearScale(yDomain, innerWidth);

            const xAxisTicks = isVertical ? xDomain.map(val => ({ value: val, pos: catScale(val) + catScale.bandwidth() / 2 })) : Array.from({ length: 6 }, (_, i) => ({ value: (yDomain[1] / 5 * i).toLocaleString(undefined, { maximumFractionDigits: 0 }), pos: valScale(yDomain[1] / 5 * i) }));
            const yAxisTicks = isVertical ? Array.from({ length: 6 }, (_, i) => ({ value: (yDomain[1] / 5 * i).toLocaleString(undefined, { maximumFractionDigits: 0 }), pos: innerHeight - valScale(yDomain[1] / 5 * i) })) : xDomain.map(val => ({ value: val, pos: catScale(val) + catScale.bandwidth() / 2 }));

            const bars: { x: number, y: number, width: number, height: number, color: string }[] = [];
            const groupPadding = 0.1;
            const groupBandwidth = catScale.bandwidth() * (1 - groupPadding);
            const groupScale = bandScale(yKeys, groupBandwidth);


            processedData.forEach(d => {
                const catPos = catScale(`${d.x}`);

                if (type === GraphType.BAR_STACKED) {
                    let stackedVal = 0;
                    yKeys.forEach((key, i) => {
                        const val = d[key];
                        if (isVertical) {
                            bars.push({
                                x: catPos,
                                y: innerHeight - valScale(val) - valScale(stackedVal),
                                width: catScale.bandwidth(),
                                height: valScale(val),
                                color: colors[i % colors.length]
                            });
                        } else {
                            bars.push({
                                x: valScale(stackedVal),
                                y: catPos,
                                width: valScale(val),
                                height: catScale.bandwidth(),
                                color: colors[i % colors.length]
                            });
                        }
                        stackedVal += val;
                    });
                } else if (type === GraphType.BAR_GROUPED) {
                    yKeys.forEach((key, i) => {
                        const val = d[key];
                        if (isVertical) {
                            bars.push({
                                x: catPos + (catScale.bandwidth() * groupPadding / 2) + groupScale(key),
                                y: innerHeight - valScale(val),
                                width: groupScale.bandwidth(),
                                height: valScale(val),
                                color: colors[i % colors.length]
                            });
                        }
                    });
                } else {
                    const val = d[yKeys[0]];
                    if (isVertical) {
                        bars.push({
                            x: catPos,
                            y: innerHeight - valScale(val),
                            width: catScale.bandwidth(),
                            height: valScale(val),
                            color: colors[0]
                        });
                    } else {
                        bars.push({
                            x: 0,
                            y: catPos,
                            width: valScale(val),
                            height: catScale.bandwidth(),
                            color: colors[0]
                        });
                    }
                }
            });

            return { width, height, margin, bars, xAxisTicks, yAxisTicks, layout };

        } else { // Line chart logic
            if (typeof keys.y !== 'string') return null;
            const lineData = processedData.map(item => ({ x: item.x, y: item[keys.y as string] }));

            const yValues = lineData.map(d => d.y);
            const yMin = Math.min(...yValues);
            const yMax = Math.max(...yValues);
            const yPadding = (yMax - yMin) * 0.05 || 1;
            const yDomainMin = yMin - yPadding;
            const yDomainMax = yMax + yPadding;
            const yRange = yDomainMax - yDomainMin === 0 ? 1 : yDomainMax - yDomainMin;

            const yScale = (value: number) => innerHeight - ((value - yDomainMin) / yRange) * innerHeight;
            const xScale = (index: number) => (lineData.length > 1 ? (index / (lineData.length - 1)) * innerWidth : innerWidth / 2);

            const xAxisTicks = lineData.map((d, i) => ({ value: d.x, x: xScale(i) }));
            const yAxisTicks = Array.from({ length: 6 }, (_, i) => {
                const value = yDomainMin + (yRange / 5) * i;
                return { value: value.toLocaleString(undefined, { maximumFractionDigits: 2 }), y: yScale(value) };
            });

            const points = lineData.map((d, i) => ({ x: xScale(i), y: yScale(d.y), original: d }));
            const linePath = isCurved
                ? createCurvedPath(points)
                : points.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x},${d.y}`).join(' ');

            return { width, height, margin, linePath, points, xAxisTicks, yAxisTicks, colors, showMarkers };
        }
    }, [width, height, processedData, showMarkers, isCurved, colors, type, layout, keys]);


    const ChartComponent: FC<any> = useMemo(() => {
        switch (type) {
            case GraphType.LINE:
            case GraphType.LINE_MARKERS:
            case GraphType.LINE_CURVED:
            case GraphType.LINE_CURVED_MARKERS:
                return LineChartComponent;
            case GraphType.AREA_STACKED:
                return AreaChartComponent;
            case GraphType.BAR_VERTICAL:
            case GraphType.BAR_HORIZONTAL:
            case GraphType.BAR_STACKED:
            case GraphType.BAR_GROUPED:
                return BarChartComponent;
            case GraphType.CANDLESTICK:
                return CandlestickChartComponent;
            default:
                return () => React.createElement('div', { className: "text-center text-red-500" }, "Chart type not implemented yet.");
        }
    }, [type]);

    return {
        ChartComponent,
        chartProps
    };
};
