import React from 'react';
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
}
interface SliderRawProps extends ComponentProps {
    type: "raw";
    id?: number;
    spacing?: number;
    size?: 'xl' | 'l' | 'm' | 's';
    children: React.ReactNode[];
    navElBackward?: JSX.Element;
    navElForward?: JSX.Element;
    labelClass?: string;
    labelEl?: JSX.Element;
}
export type SliderProps = SliderProcProps | SliderRawProps;
declare const Slider: React.FC<SliderProps>;
export default Slider;
