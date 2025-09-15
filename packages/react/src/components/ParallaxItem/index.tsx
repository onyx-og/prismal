import {FC, ReactNode, useEffect, useRef, useState, useMemo, useCallback} from "react";
import ComponentProps from "../Component";
import { setAccentStyle, getRandId } from "utils/";
import { useElScrollPosition } from "hooks/useScrollPosition";

export interface ParallaxItemProps extends ComponentProps {
    children?: ReactNode;
    factor?: number;
}
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
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    const [refSet, markRefSet] = useState<boolean>(false);

    const refSetter = useCallback((node: HTMLDivElement) => {
        if (ref.current) {
            return
        }
        if (node) {
            ref.current = node;
            markRefSet(true);
        }
    }, []);

    const elScrollY =  useElScrollPosition(ref, refSet);

    const style_ = useMemo(() => {
        let style_: {[key: string]: any} = {};
        setAccentStyle(style_, {accent, accentLight, accentDark});
        style_.transform = `translateY(${factor * (elScrollY || 0)}px)`;
        if (style) style_ = {...style_, ...style};
        return style_;
    }, [style, accent, accentDark, accentLight, elScrollY, factor]);
    
    return <>
        <div ref={refSetter} data-id={dataId} className={className_} style={style_}>
            {children}
        </div>
    </>
}

export default ParallaxItem;