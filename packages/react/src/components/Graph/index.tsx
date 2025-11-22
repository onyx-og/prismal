import { FC, useState, useRef, useEffect } from 'react';
import { GraphType } from './types';
import { useGraph } from './useGraph';
import "./index.scss";

// The public interface for the Graph component remains the same.
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

export const Graph: FC<GraphProps> = (props) => {
    const { className, title } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const { ChartComponent, chartProps } = useGraph({ ...props, ...dimensions });

    let className_ = 'graph-container';
    if (className) className_ = `${className_} ${className}`;

    return (
        <div className={className_}>
            {title && <h3 className="graph-title">{title}</h3>}
            <div ref={containerRef} className="graph-chart-area">
                {dimensions.width > 0 && dimensions.height > 0 && chartProps && <ChartComponent {...chartProps} />}
            </div>
        </div>
    );
};

export { GraphType } from './types';