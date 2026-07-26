import { JSX, FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import './index.scss';
interface SliderProcProps extends ComponentProps {
    type: "process";
    id?: number;
    slides: any[];
    spacing?: number;
    slideWrapper: (arg0: any) => JSX.Element;
    size?: 'xl' | 'l' | 'm' | 's';
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
}
interface SliderRawProps extends ComponentProps {
    type: "raw";
    id?: number;
    spacing?: number;
    size?: 'xl' | 'l' | 'm' | 's';
    children: ReactNode[];
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
    showNavBar?: boolean;
    autoPlay?: false | number;
}
export type SliderProps = SliderProcProps | SliderRawProps;
declare const Slider: FC<SliderProps>;
export default Slider;
