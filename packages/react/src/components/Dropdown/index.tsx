import {
    FC, ReactNode, useRef, useMemo, useEffect
} from 'react';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import './index.scss';
import { setBorderRadius } from 'utils/';

/**
 * @typedef {object} SelectOption
 * @description Represents an option in a select-like component.
 */
export type SelectOption = {
    /** The display label for the option. */
    label: string;
    /** The value of the option. */
    value: string;
    /** Whether the option is selected. */
    selected?: boolean;
}

/**
 * @typedef {object} DropdownProps
 * @description Props for the Dropdown component.
 */
export interface DropdownProps extends ComponentProps {
    /** The content to display within the dropdown. */
    children: ReactNode;
    /** The element that toggles the dropdown's visibility. */
    toggleElement?: ReactNode;
    /** Defines the visual style of the dropdown. */
    type?: 'primary' | 'default';
    /** Whether the dropdown is open. */
    isOpen?: boolean;
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
const Dropdown: FC<DropdownProps> = (props) => {
    const {
        toggleElement,
        children,
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        type = 'primary',
        isOpen,
    } = props;

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateRect = () => {
            if (dropdownRef.current) {
                const rect = dropdownRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;

                dropdownRef.current.style.setProperty('--dropdown-width', `${rect.width}px`);
                dropdownRef.current.style.setProperty('--dropdown-height', `${rect.height}px`);
                dropdownRef.current.style.setProperty('--dropdown-top', `${rect.top}px`);
                dropdownRef.current.style.setProperty('--dropdown-left', `${rect.left}px`);

                const spaceBelow = viewportHeight - rect.bottom;
                const spaceAbove = rect.top;
                if (spaceBelow < 200 && spaceAbove > spaceBelow) {
                    dropdownRef.current.style.setProperty('--dropdown-content-top', 'auto');
                    dropdownRef.current.style.setProperty('--dropdown-content-bottom', '100%');
                    dropdownRef.current.style.setProperty('--dropdown-content-margin-top', '0');
                    dropdownRef.current.style.setProperty('--dropdown-content-margin-bottom', '0.5em');
                } else {
                    dropdownRef.current.style.setProperty('--dropdown-content-top', 'var(--dropdown-height)');
                    dropdownRef.current.style.setProperty('--dropdown-content-bottom', 'auto');
                    dropdownRef.current.style.setProperty('--dropdown-content-margin-top', '0.5em');
                    dropdownRef.current.style.setProperty('--dropdown-content-margin-bottom', '0');
                }

                const spaceRight = viewportWidth - rect.right;
                const spaceLeft = rect.left;
                if (spaceRight < 200 && spaceLeft > spaceRight) {
                    dropdownRef.current.style.setProperty('--dropdown-content-left', 'auto');
                    dropdownRef.current.style.setProperty('--dropdown-content-right', '0');
                } else {
                    dropdownRef.current.style.setProperty('--dropdown-content-left', '0');
                    dropdownRef.current.style.setProperty('--dropdown-content-right', 'auto');
                }
            }
        };
        updateRect();
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);
        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
        };
    }, []);

    let style_: { [key: string]: any } = {};
    setAccentStyle(style_, { accent, accentLight, accentDark });
    setBorderRadius(style_, borderRadius);

    if (style) style_ = { ...style_, ...style };

    let className_ = 'prismal-dropdown';
    if (className) className_ = `${className_} ${className}`;
    if (isOpen) className_ = `${className_} is-open`;

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
        <div tabIndex={0} className={`prismal-dropdown-select type-${type}`} ref={dropdownRef}>
            {toggleEl}
            {type == 'primary' ? <div className='prismal-dropdown-toggle-btn'></div> : null}
            <div className={`prismal-dropdown-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    </div>

}

export default Dropdown;