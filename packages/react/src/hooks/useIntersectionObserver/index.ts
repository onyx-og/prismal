import React from "react";

const useIntersectionObserver = (
    elementRef: React.MutableRefObject<HTMLElement | undefined>,
    refTrigger: boolean | string | number,
    observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }
) => {
    const [isIntersecting, setIsIntersecting] = React.useState(false);

    const intersectionCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            } else {
                setIsIntersecting(false);
            }
        });
    }

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);

    React.useEffect(() => {
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        }
    },[refTrigger])

    return isIntersecting;
    
}
export default useIntersectionObserver;