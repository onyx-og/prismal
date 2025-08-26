import React from "react";
import ComponentProps from "components/Component";
import { setAccentStyle, getRandId } from "utils/";
import { useElScrollPosition } from "hooks/useScrollPosition";

export interface ParallaxItemProps extends ComponentProps {
    children?: React.ReactNode;
    factor?: number;
}
const ParallaxItem: React.FC<ParallaxItemProps> = (props) => {
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

    React.useEffect(() => {
        if (factor < 0 || factor > 1) {
            throw new Error('ParallaxItem - Factor value must be between -1 and 1.');
        }
    }, []);

    const dataId_ = React.useMemo( () => {
        if (dataId) return dataId;
        else return getRandId();
    }, [dataId]);

    let style_ = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (style) style_ = {...style_, ...style};

    const ref = React.useRef<HTMLDivElement>();
    const [refSet, markRefSet] = React.useState<boolean>(false);

    const refSetter = React.useCallback((node: HTMLDivElement) => {
        if (ref.current) {
            return
        }
        if (node) {
            ref.current = node;
            markRefSet(true);
        }
    }, []);

    const elScrollY =  useElScrollPosition(ref, refSet);

    let inlineStyles = React.useMemo(() => {
        return <style>
            {`.prismal-item-parallax[data-id="${dataId_}"] {
                transform: translateY(${factor * (elScrollY || 0)}px);
            }`}
        </style>
    }, [dataId_, elScrollY, factor]);

    return <>
        {inlineStyles}
        <div ref={refSetter} data-id={dataId_} className={className_} style={style_}>
            {children}
        </div>
    </>
}

export default ParallaxItem;