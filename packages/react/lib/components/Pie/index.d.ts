import ComponentProps from "../Component";
import { FC } from "react";
/**
 * https://stackoverflow.com/a/79042186/1623725 for drawing pie slices
 * https://stackoverflow.com/a/67299291/1623725 for adding text in them
 */
/**
 * @typedef {object} PieChartProps
 * @description Props for the Pie chart component.
 * @property {string} [name] A name for the chart.
 * @property {number} [size=220] The size (width and height) of the pie chart.
 * @property {Array<{name?: string, percentage: number, color?: string, label?: string}>} data The data for the pie chart slices.
 */
export interface PieChartProps extends ComponentProps {
    name?: string;
    size?: number;
    data: {
        name?: string;
        percentage: number;
        color?: string;
        label?: string;
    }[];
}
/**
 * @component Pie
 * @description A component to render a pie chart from a data array.
 * @param {PieChartProps} props The component props.
 * @returns {React.ReactElement} The rendered Pie chart SVG.
 * @example
 * <Pie data={[{ percentage: 50, color: 'red' }, { percentage: 50, color: 'blue' }]} />
 */
declare const Pie: FC<PieChartProps>;
export default Pie;
