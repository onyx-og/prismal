import { JSX, FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import './index.scss';
type Orientation = 'horizontal' | 'vertical';
interface SliderProcProps extends ComponentProps {
    type: "process";
    id?: number;
    slides: any[];
    spacing?: number;
    slideWrapper: (arg0: any) => JSX.Element;
    size?: 'xl' | 'l' | 'm' | 's';
    orientation?: Orientation;
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
    /** The controlled active slide index. Falls back to internal state when omitted. */
    selected?: number;
    /** Called whenever the active slide changes, from any source (swipe, keyboard, pagination, autoplay). */
    onChange?: (index: number) => void;
}
interface SliderRawProps extends ComponentProps {
    type: "raw";
    id?: number;
    spacing?: number;
    size?: 'xl' | 'l' | 'm' | 's';
    orientation?: Orientation;
    children: ReactNode[];
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
    /** The controlled active slide index. Falls back to internal state when omitted. */
    selected?: number;
    /** Called whenever the active slide changes, from any source (swipe, keyboard, pagination, autoplay). */
    onChange?: (index: number) => void;
}
export type SliderProps = SliderProcProps | SliderRawProps;
declare const Slider: FC<SliderProps>;
export default Slider;
