import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} LazyItemProps
 * @description Props for the LazyItem component.
 */
export interface LazyItemProps extends ComponentProps {
    /** The content to be lazy-loaded. */
    children: ReactNode;
    /** If true, an exit animation will be applied when the component scrolls out of view. */
    exitEffect?: boolean;
    /**
     * Customize the entrance animation by setting animation -> 'none'
     * and providing loadedClass
     * The type of entrance animation.
     */
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'pop-in' | 'none';
    /** An additional CSS class to apply when the content is loaded. */
    loadedClass?: string;
    /** The delay in milliseconds before the entrance animation starts. */
    offset?: number;
}
/**
 * @component LazyItem
 * @description A component that lazy-loads its children when it scrolls into the viewport, with an optional animation.
 * @param {LazyItemProps} props The component props.
 * @returns {React.ReactElement} The rendered LazyItem component.
 * @example
 * <LazyItem animation="slide-up">
 *   <img src="image.jpg" alt="Lazy loaded" />
 * </LazyItem>
 */
declare const LazyItem: FC<LazyItemProps>;
export default LazyItem;
