import { CSSProperties, ReactNode, FC } from "react";
import "./index.scss";
import ComponentProps from "../Component";
/**
 * @typedef {object} StackElement
 * @description Data structure for an element in the Stack component.
 */
type StackElement = {
    /** The name of the element, used as a key. */
    name: string;
    /** Any other properties for the element. */
    [key: string]: any;
};
/**
 * @typedef {object} StackProps
 * @description Props for the Stack component.
 */
export interface StackProps extends ComponentProps {
    /** A function to render each stack item. */
    render?: (elData: StackElement, index: number, isActive: boolean) => ReactNode;
    /** The array of data for the stack items. */
    data: StackElement[];
    /** The direction of the stack. */
    direction?: "vertical" | "horizontal";
    /** The gap between stack items. */
    gap?: CSSProperties["gap"];
    /** Additional CSS class for the item containers. */
    itemContainerClass?: string;
}
/**
 * @component Stack
 * @description A component that displays a stack of items that can be expanded on click.
 * @param {StackProps} props The component props.
 * @returns {React.ReactElement} The rendered Stack component.
 * @example
 * <Stack data={[{ name: 'Item 1' }, { name: 'Item 2' }]} />
 */
declare const Stack: FC<StackProps>;
export default Stack;
