import { RefObject, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
import { MasonryItemRef } from "./item";
export declare const useMasonryGrid: (gridRef: RefObject<HTMLDivElement | null>, rowHeight: number, itemRefs: RefObject<MasonryItemRef[]>, dependencies?: Array<any>) => void;
export interface MasonryProcProps {
    type: "process";
    data: {
        [key: string]: any;
    }[];
    itemRenderer?: (item: {
        [key: string]: any;
    }) => React.ReactNode;
}
export interface MasonryRawProps {
    type: "raw";
    children: React.ReactNode | React.ReactNode[];
}
interface BaseMasonryProps extends ComponentProps {
    rowHeight?: number;
}
type MasonryProps = (MasonryProcProps | MasonryRawProps) & BaseMasonryProps;
declare const Masonry: FC<MasonryProps>;
export default Masonry;
