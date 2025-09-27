import ComponentProps from "../Component";
import { FC } from "react";
/**
 * https://stackoverflow.com/a/79042186/1623725 for drawing pie slices
 * https://stackoverflow.com/a/67299291/1623725 for adding text in them
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
declare const Pie: FC<PieChartProps>;
export default Pie;
