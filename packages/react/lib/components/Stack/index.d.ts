import { CSSProperties, ReactNode, FC } from "react";
import "./index.scss";
import ComponentProps from "../Component";
/**
 * @typedef {object} StackElement
 * @description Data structure for an element in the Stack component.
 * @property {string} name The name of the element, used as a key.
 * @property {any} [key] Any other properties for the element.
 */
type StackElement = {
    name: string;
    [key: string]: any;
};
/**
 * @typedef {object} StackProps
 * @description Props for the Stack component.
 * @property {(elData: StackElement, index: number, isActive: boolean) => ReactNode} [render] A function to render each stack item.
 * @property {StackElement[]} data The array of data for the stack items.
 * @property {"vertical" | "horizontal"} [direction="vertical"] The direction of the stack.
 * @property {CSSProperties["gap"]} [gap="20px"] The gap between stack items.
 * @property {string} [itemContainerClass] Additional CSS class for the item containers.
 */
export interface StackProps extends ComponentProps {
    render?: (elData: StackElement, index: number, isActive: boolean) => ReactNode;
    data: StackElement[];
    direction?: "vertical" | "horizontal";
    gap?: CSSProperties["gap"];
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
