import {
    FC, ReactNode, useRef, useMemo
} from 'react';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import './index.scss';
import { setBorderRadius } from 'utils/';

/**
 * @typedef {object} SelectOption
 * @description Represents an option in a select-like component.
 * @property {string} label The display label for the option.
 * @property {string} value The value of the option.
 * @property {boolean} [selected] Whether the option is selected.
 */
export type SelectOption = {
    label: string;
    value: string;
    selected?: boolean;
}

/**
 * @typedef {object} DropdownProps
 * @description Props for the Dropdown component.
 * @property {ReactNode} children The content to display within the dropdown.
 * @property {ReactNode} [toggleElement] The element that toggles the dropdown's visibility.
 */
export interface DropdownProps extends ComponentProps {
    children: ReactNode;
    toggleElement?: ReactNode;
}

/**
 * @component Dropdown
 * @description A component that displays content in a dropdown, toggleable by a specified element.
 * @param {DropdownProps} props The component props.
 * @returns {React.ReactElement} The rendered Dropdown component.
 * @example
 * <Dropdown toggleElement={<Button>Open</Button>}>
 *   <p>Dropdown content.</p>
 * </Dropdown>
 */
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

    if (style) style_ = {...style_, ...style};

    let className_ = 'prismal-dropdown';
    if (className) className_ = `${className_} ${className}`;

    /**
     * @member toggleEl
     * @description Memoized toggle element for the dropdown.
     * @returns {JSX.Element | undefined}
     */
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