import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
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
declare const LazyItem: (props: LazyItemProps) => import("react/jsx-runtime").JSX.Element;
export default LazyItem;
