import React from 'react';
import './index.scss';
interface SliderProps {
    id: number;
    slides: any[];
    spacing?: number;
    slideWrapper: (arg0: any) => JSX.Element;
    size?: 'xl' | 'l' | 'm' | 's';
    defaultChecked?: number;
    showPagination?: boolean;
    showNavArrows?: boolean;
}
declare const Slider: React.FC<SliderProps>;
export default Slider;
