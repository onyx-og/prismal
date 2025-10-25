import { RefObject, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
import { MasonryItemRef } from "./item";
/**
 * @function useMasonryGrid
 * @description A custom hook to arrange items in a masonry layout.
 * @param {RefObject<HTMLDivElement | null>} gridRef Ref to the grid container element.
 * @param {number} rowHeight The height of each row in the grid.
 * @param {RefObject<MasonryItemRef[]>} itemRefs Ref to an array of masonry item refs.
 * @param {Array<any>} [dependencies=[]] Dependencies to re-trigger the layout calculation.
 */
export declare const useMasonryGrid: (gridRef: RefObject<HTMLDivElement | null>, rowHeight: number, itemRefs: RefObject<MasonryItemRef[]>, dependencies?: Array<any>) => void;
/**
 * @typedef {object} MasonryProcProps
 * @description Props for a Masonry component that processes data.
 * @property {"process"} type The type of masonry layout.
 * @property {{ [key: string]: any }[]} data The array of data items.
 * @property {(item: { [key: string]: any }) => React.ReactNode} [itemRenderer] A function to render each item.
 */
export interface MasonryProcProps {
    type: "process";
    data: {
        [key: string]: any;
    }[];
    itemRenderer?: (item: {
        [key: string]: any;
    }) => React.ReactNode;
}
/**
 * @typedef {object} MasonryRawProps
 * @description Props for a Masonry component that uses raw children.
 * @property {"raw"} type The type of masonry layout.
 * @property {React.ReactNode | React.ReactNode[]} children The child elements to arrange.
 */
export interface MasonryRawProps {
    type: "raw";
    children: React.ReactNode | React.ReactNode[];
}
/**
 * @typedef {object} BaseMasonryProps
 * @description Base props for the Masonry component.
 * @property {number} [rowHeight=8] The height of each row in pixels.
 */
interface BaseMasonryProps extends ComponentProps {
    rowHeight?: number;
}
type MasonryProps = (MasonryProcProps | MasonryRawProps) & BaseMasonryProps;
/**
 * @component Masonry
 * @description A component for creating a masonry grid layout.
 * @param {MasonryProps} props The component props.
 * @returns {React.ReactElement} The rendered Masonry component.
 * @example
 * <Masonry type="raw" rowHeight={10}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Masonry>
 */
declare const Masonry: FC<MasonryProps>;
export default Masonry;
