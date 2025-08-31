import React from "react";
import ComponentProps from "../Component";
import "./index.scss";
import {useIntersectionObserver} from "hooks/";
export interface LazyItemProps extends ComponentProps {
    children: React.ReactNode;
    exitEffect?: boolean;
    /**
     * Customize the entrance animation by setting animation -> 'none'
     * and providing loadedClass
     */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'pop-in' | 'none';
    loadedClass?: string;
    offset?: number;
}
const LazyItem = (props: LazyItemProps) => {
    const {
        "data-id": dataId,
        className, style,
        children,
        exitEffect = true,
        animation = 'fade',
        loadedClass,
        offset = 250
    } = props;

    let style_ = {};
    style_ = {...style_, ...style};

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

    const isIntersecting = useIntersectionObserver(ref, refSet);

    const [isInView, setIsInView] = React.useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] =  React.useState(false);

    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isIntersecting) {
            timeout = setTimeout(()=> {
                setIsInView(true);
                if (!hasLoadedOnce) setHasLoadedOnce(true);
            }, offset);
        } else if (isInView && !isIntersecting && exitEffect) {
            timeout = setTimeout(()=> {
                setIsInView(false);
            }, offset);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [isIntersecting, isInView, hasLoadedOnce, offset]);

    const children_ = React.useMemo(() => {
        if (hasLoadedOnce) {
            return children;
        }
        return null;
    }, [children, loadedClass, hasLoadedOnce]);

    const className_ = React.useMemo(() => {
        let className_ = `prismal-lazy-item prismal-lazy-item-${animation}`;
        if (className) className_ =  `${className_} ${className}`;
        if (isInView) {
            className_ = `${className_} prismal-lazy-item-view`;
            if (loadedClass) className_ = `${className_} ${loadedClass}`;
        } else {
            // console.log("not loaded")
        }
        return className_;
    },[className, animation, isInView, loadedClass]);

    return <div data-id={dataId} ref={refSetter} className={className_}
        style={style_}
    >
        {children_}
    </div>
}
export default LazyItem;