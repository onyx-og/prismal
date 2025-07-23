import React from "react";
import "./index.scss"
import ComponentProps from "../Component";
import { setAccentStyle } from "../../utils/colors";
import { Elevation, setBorderRadius, setElevation } from "../../utils";
type StackElement = {
    name: string;
    [key: string]: any;
}
export interface StackProps extends ComponentProps {
    render?: (elData: StackElement, index: number, isActive: boolean) => React.ReactNode;
    data: StackElement[];
    direction?: "vertical" | "horizontal";
    gap?: React.CSSProperties["gap"];
    itemContainerClass?: string;
}

const defaultRenderer = (elData: StackElement, index: number, isActive: boolean) => {
    return <div className={"stack-item-default"}>
        <span>{elData.name}</span>
        <div>
            {elData.content}
        </div>
    </div>;
}

interface StackItemContainerProps extends ComponentProps {
    isActive: boolean;
    gap?: React.CSSProperties["gap"];
    offset?: React.CSSProperties["gap"];
    setOffset: (index: number) => void;
    setActive: (index: number) => void;
    itemData: StackElement;
    index: number;
    direction: "vertical" | "horizontal";
    itemRenderer: (elData: StackElement, index: number, isActive: boolean) => React.ReactNode;
}

const StackItemContainer: React.FC<StackItemContainerProps> = (props) => {
    const {
        gap, offset = 0, setOffset,
        className, isActive, direction,
        setActive, itemData, index, itemRenderer,
        elevation, borderRadius
    } = props;
    const [isRefPresent, markRefPresent] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const refSetter = React.useCallback((node: HTMLDivElement | null) => {
        if (ref.current) {
            //
        }

        if (node) {
            markRefPresent(true)
        }

        // Save a reference to the node
        ref.current = node
    }, []);

    React.useEffect(() => {
        if (isRefPresent && ref.current && isActive) {
            setOffset(ref.current.clientHeight)
        }
    }, [isRefPresent, direction, isActive])

    const style: { [key: string]: any } = React.useMemo(() => {
        let _style: { [key: string]: any } = {
            "--position": index, "--gap": gap,
            "--offset": `${offset || 0}px`,
            "--hasOffset": `${offset ? 1 : 0}`
        }
        _style = setBorderRadius(_style, borderRadius);
        return _style;
    }, [index, gap, offset, borderRadius]);

    let itemContainerClass = `stack-item-container`;
    itemContainerClass = setElevation(itemContainerClass, elevation);
    if (isActive) itemContainerClass = `${itemContainerClass} active`;
    if (className) itemContainerClass = `${itemContainerClass} ${className}`;

    return <div ref={refSetter} onClick={() => setActive(index)} className={itemContainerClass} style={style}>{itemRenderer(itemData, index, isActive)}</div>
}

const Stack: React.FC<StackProps> = (props) => {
    const { render = defaultRenderer,
        data, direction = "vertical", gap = "20px",
        itemContainerClass, accent, accentDark, accentLight,
        borderRadius = "extra-small", className
    } = props;
    const [activeIndex, setActive] = React.useState(data.length - 1);
    const [activeOffset, setOffset] = React.useState(0);

    const stackedItems = React.useMemo(() => {
        return data.map((elData, index) => {
            let offset = 0;
            if (activeIndex < index) offset = activeOffset;

            return <StackItemContainer
                className={itemContainerClass} offset={offset}
                setOffset={setOffset} direction={direction}
                itemData={elData} index={index} key={elData.name}
                itemRenderer={render} setActive={setActive} gap={gap}
                isActive={index == activeIndex} borderRadius={borderRadius}
                elevation={index < 6 ? index as Elevation : 5}
            />
        });
    }, [
        data, activeIndex, render, setOffset,
        direction, gap, activeOffset, setActive,
        borderRadius, itemContainerClass
    ]);

    let stackClass = "prismal-stack";
    if (className) stackClass = `${stackClass} ${className}`;

    const style: {[key: string]: any} = React.useMemo(() => {
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