import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
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
declare const LazyItem: FC<LazyItemProps>;
export default LazyItem;
