import {ReactNode, FC, useRef, useMemo,useCallback, useEffect, useState} from "react";
import ComponentProps from "../Component";
import "./index.scss";
import {useIntersectionObserver} from "hooks/";
export interface LazyItemProps extends ComponentProps {
    children: ReactNode;
    exitEffect?: boolean;
    /**
     * Customize the entrance animation by setting animation -> 'none'
     * and providing loadedClass
     */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'pop-in' | 'none';
    loadedClass?: string;
    offset?: number;
}
const LazyItem: FC<LazyItemProps> = (props) => {
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

    const isIntersecting = useIntersectionObserver(ref, refSet);

    const [isInView, setIsInView] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] =  useState(false);

    useEffect(() => {
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

    const children_ = useMemo(() => {
        if (hasLoadedOnce) {
            return children;
        }
        return null;
    }, [children, loadedClass, hasLoadedOnce]);

    const className_ = useMemo(() => {
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