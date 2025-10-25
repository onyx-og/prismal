import {CSSProperties, ReactNode, useState, useRef, useCallback, useMemo, FC, useEffect} from "react";
import "./index.scss"
import ComponentProps from "../Component";
import { setAccentStyle } from "../../utils/colors";
// FIX: Import missing utility functions `setBorderRadius` and `setElevation`.
import { Elevation, setBorderRadius, setElevation } from "../../utils";

/**
 * @typedef {object} StackElement
 * @description Data structure for an element in the Stack component.
 * @property {string} name The name of the element, used as a key.
 * @property {any} [key] Any other properties for the element.
 */
type StackElement = {
    name: string;
    [key: string]: any;
}

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
 * @function defaultRenderer
 * @description The default renderer function for stack items.
 * @param {StackElement} elData The data for the element.
 * @returns {ReactNode} The rendered default stack item.
 */
const defaultRenderer = (elData: StackElement) => {
    return <div className={"stack-item-default"}>
        <span>{elData.name}</span>
        <div>
            {elData.content}
        </div>
    </div>;
}

/**
 * @typedef {object} StackItemContainerProps
 * @description Props for the StackItemContainer component.
 * @property {boolean} isActive Whether the item is the active one.
 * @property {CSSProperties["gap"]} [gap] The gap between items.
 * @property {CSSProperties["gap"]} [offset] The offset to apply to the item.
 * @property {(index: number) => void} setOffset A function to set the offset of the active item.
 * @property {(index: number) => void} setActive A function to set the active item.
 * @property {StackElement} itemData The data for the item.
 * @property {number} index The index of the item.
 * @property {"vertical" | "horizontal"} direction The direction of the stack.
 * @property {(elData: StackElement, index: number, isActive: boolean) => ReactNode} itemRenderer The renderer function for the item.
 */
interface StackItemContainerProps extends ComponentProps {
    isActive: boolean;
    gap?: CSSProperties["gap"];
    offset?: CSSProperties["gap"];
    setOffset: (index: number) => void;
    setActive: (index: number) => void;
    itemData: StackElement;
    index: number;
    direction: "vertical" | "horizontal";
    itemRenderer: (elData: StackElement, index: number, isActive: boolean) => ReactNode;
}

/**
 * @component StackItemContainer
 * @description An individual item container within a Stack layout.
 * @param {StackItemContainerProps} props The component props.
 * @returns {React.ReactElement} The rendered stack item container.
 */
const StackItemContainer: FC<StackItemContainerProps> = (props) => {
    const {
        gap, offset = 0, setOffset,
        className, isActive, direction,
        setActive, itemData, index, itemRenderer,
        elevation, borderRadius
    } = props;
    const [isRefPresent, markRefPresent] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const refSetter = useCallback((node: HTMLDivElement | null) => {
        if (ref.current) {
            return;
        }

        if (node) {
            markRefPresent(true)
        }

        // Save a reference to the node
        ref.current = node
    }, []);

    useEffect(() => {
        if (isRefPresent && ref.current && isActive) {
            setOffset(ref.current.clientHeight)
        }
    }, [isRefPresent, direction, isActive, setOffset])

    const style: { [key: string]: any } = useMemo(() => {
        let _style: { [key: string]: any } = {
            "--position": index, "--gap": gap,
            "--offset": `${offset || 0}px`,
            "--hasOffset": `${offset ? 1 : 0}`
        }
        _style = setBorderRadius(_style, borderRadius);
        return _style;
    }, [index, gap, offset, borderRadius]);

    let itemContainerClass = `stack-item-container`;
    if(elevation) itemContainerClass = setElevation(itemContainerClass, elevation);
    if (isActive) itemContainerClass = `${itemContainerClass} active`;
    if (className) itemContainerClass = `${itemContainerClass} ${className}`;

    return <div ref={refSetter} onClick={() => setActive(index)} className={itemContainerClass} style={style}>{itemRenderer(itemData, index, isActive)}</div>
}

/**
 * @component Stack
 * @description A component that displays a stack of items that can be expanded on click.
 * @param {StackProps} props The component props.
 * @returns {React.ReactElement} The rendered Stack component.
 * @example
 * <Stack data={[{ name: 'Item 1' }, { name: 'Item 2' }]} />
 */
const Stack: FC<StackProps> = (props) => {
    const { render = defaultRenderer,
        data, direction = "vertical", gap = "20px",
        itemContainerClass, accent, accentDark, accentLight,
        borderRadius = "xs", className
    } = props;
    const [activeIndex, setActive] = useState(data.length - 1);
    const [activeOffset, setOffset] = useState(0);

    const stackedItems = useMemo(() => {
        return data.map((elData, index) => {
            let offset = 0;
            if (activeIndex < index) offset = activeOffset;

            return <StackItemContainer
                className={itemContainerClass} offset={offset}
                setOffset={setOffset} direction={direction}
                itemData={elData} index={index} key={elData.name}
                itemRenderer={render} setActive={setActive} gap={gap}
                isActive={index == activeIndex} borderRadius={borderRadius}
                elevation={index < 5 ? index as Elevation : 4}
            />
        });
    }, [
        data, activeIndex, render, setOffset,
        direction, gap, activeOffset, setActive,
        borderRadius, itemContainerClass
    ]);

    let stackClass = "prismal-stack";
    if (className) stackClass = `${stackClass} ${className}`;

    const style: {[key: string]: any} = useMemo(() => {
        let _style: {[key: string]: any} = {
          height: `calc(${activeOffset}px + ${data.length - 1} * ${gap})`,
        }
        _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        return _style;
    },[activeOffset, gap, data, accent, accentLight, accentDark]);
      
    return <div className={stackClass} style={style}>
        {stackedItems}
    </div>
}

export default Stack;