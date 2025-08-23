import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
import {useIntersectionObserver} from "hooks/";
export interface LazyItemProps extends ComponentProps {
    children: React.ReactNode;
    exitEffect?: boolean;
    /**
     * Customize the entrance @param loadedClass animation by setting animation -> 'none'
     * and providing @param loadedClass
     */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'pop-in' | 'none';
    loadedClass?: string;
}
const LazyItem = (props: LazyItemProps) => {
    const {
        "data-id": dataId,
        className, style,
        children,
        exitEffect = true,
        animation = 'fade',
        loadedClass
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

    const [isLoaded, setIsLoaded] = React.useState(isIntersecting);

    React.useEffect(() => {
        if (isIntersecting) {
            setIsLoaded(true)
        } else if (isLoaded && !isIntersecting && exitEffect) {
            setIsLoaded(false);
        }
    }, [isIntersecting, isLoaded]);

    const children_ = React.useMemo(() => {
        if (isLoaded) {
            return children;
        }
        return null;
    }, [children, loadedClass, isLoaded]);

    const className_ = React.useMemo(() => {
        let className_ = `prismal-lazy-item prismal-lazy-item-${animation}`;
        if (className) className_ =  `${className_} ${className}`;
        if (isLoaded) {
            className_ = `${className_} prismal-lazy-item-view`;
            if (loadedClass) className_ = `${className_} ${loadedClass}`;
        } else {
            console.log("not loaded")
        }
        return className_;
    },[className, animation, isLoaded, loadedClass]);

    return <div data-id={dataId} ref={refSetter} className={className_}
        style={style_}
    >
        {children_}
    </div>
}
export default LazyItem;