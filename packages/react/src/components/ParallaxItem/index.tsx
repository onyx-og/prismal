import { FC, ReactNode, useEffect, useRef, useState, useMemo, useCallback } from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from "utils/";
import { useElScrollPosition } from "hooks/useScrollPosition";

/**
 * @typedef {object} ParallaxItemProps
 * @description Props for the ParallaxItem component.
 */
export interface ParallaxItemProps extends ComponentProps {
    /** The content to be affected by the parallax effect. */
    children?: ReactNode;
    /** The parallax scroll factor. A value between -1 and 1. */
    factor?: number;
}

/**
 * @component ParallaxItem
 * @description A component that creates a parallax scrolling effect on its children.
 * @param {ParallaxItemProps} props The component props.
 * @returns {React.ReactElement} The rendered ParallaxItem component.
 * @example
 * <ParallaxItem factor={0.2}>
 *   <img src="image.jpg" alt="Parallax" />
 * </ParallaxItem>
 */
const ParallaxItem: FC<ParallaxItemProps> = (props) => {
    const {
        "data-id": dataId,
        children,
        className,
        style,
        accent, accentLight, accentDark,
        factor = 0.1
    } = props;

    let className_ = "prismal-item-parallax";
    if (className) className_ = `${className_} ${className}`;

    useEffect(() => {
        if (factor < -1 || factor > 1) {
            throw new Error('ParallaxItem - Factor value must be between -1 and 1.');
        }
    }, [factor]);

    const ref = useRef<HTMLDivElement>(null);
    const [refSet, markRefSet] = useState<boolean>(false);

    /**
     * @function refSetter
     * @description A callback ref to get a reference to the component's root div.
     * @param {HTMLDivElement} node The DOM node of the div.
     */
    const refSetter = useCallback((node: HTMLDivElement) => {
        if (ref.current) {
            return
        }
        if (node) {
            ref.current = node;
            markRefSet(true);
        }
    }, []);

    const elScrollY = useElScrollPosition(ref, refSet);

    const style_ = useMemo(() => {
        let style_: { [key: string]: any } = {};
        setAccentStyle(style_, { accent, accentLight, accentDark });
        style_.transform = `translateY(${factor * (elScrollY || 0)}px)`;
        if (style) style_ = { ...style_, ...style };
        return style_;
    }, [style, accent, accentDark, accentLight, elScrollY, factor]);

    return <>
        <div ref={refSetter} data-id={dataId} className={className_} style={style_}>
            {children}
        </div>
    </>
}

export default ParallaxItem;