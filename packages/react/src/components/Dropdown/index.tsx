import {
    FC, ReactNode, useRef, useMemo
} from 'react';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import './index.scss';
import { setBorderRadius } from 'utils/';
    
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
}
export interface DropdownProps extends ComponentProps {
    children: ReactNode;
    toggleElement?: ReactNode;
}
const Dropdown: FC<DropdownProps> = ( props ) => {
    const {
        toggleElement,
        children,
        className, style,
        accent, accentLight, accentDark,
        borderRadius
    } = props;
    
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    let style_: {[key: string]: any} = {};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    setBorderRadius(style_, borderRadius);

    if (style) style_ = {...style_, style};

    let className_ = 'prismal-dropdown';
    if (className) className_ = `${className_} ${className}`;

    const toggleEl = useMemo(() => {
        if (toggleElement != null) {
            return <div className="prismal-dropdown-toggle">{toggleElement}</div>;
        }
    }, [toggleElement]);

    return <div 
        className={className_}
        style={style_}
    >
        <div tabIndex={0} className='prismal-dropdown-select' ref={dropdownRef}>
            {toggleEl}
            <div className='prismal-dropdown-toggle-btn'></div>
            <div className="prismal-dropdown-content">
                {children}
            </div>
        </div>
    </div>
        
}

export default Dropdown;
