import { FC } from 'react';
import { GraphType } from './types';
import "./index.scss";
interface GraphKeys {
    x: string;
    y?: string | string[];
    open?: string;
    high?: string;
    low?: string;
    close?: string;
}
export interface GraphProps {
    type: GraphType;
    data: any[];
    keys: GraphKeys;
    onDataProcessed?: (processedData: any[]) => void;
    className?: string;
    title?: string;
    showMarkers?: boolean;
    isCurved?: boolean;
    colors?: string[];
    layout?: 'vertical' | 'horizontal';
}
export declare const Graph: FC<GraphProps>;
export { GraphType } from './types';
