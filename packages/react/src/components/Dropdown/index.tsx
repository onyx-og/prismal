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
    /** Manually toggles visibility */
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
        isOpen = false,
        children,
        className, style,
        accent, accentLight, accentDark,
        borderRadius,
        type = 'primary',
    } = props;

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        /**
         * Places the content on whichever side of the toggle it actually fits.
         *
         * The measurement that matters is the *content's* — the toggle's size
         * says nothing about whether the panel hanging off it will overflow, so
         * a panel is flipped only when its own height or width does not fit in
         * the space on that side. The content stays laid out relative to the
         * toggle: nothing here moves the toggle, only which corner the panel
         * grows from.
         */
        const place = () => {
            const anchor = dropdownRef.current;
            const content = contentRef.current;
            if (!anchor || !content) return;

            const rect = anchor.getBoundingClientRect();
            // Measurable even while closed: closed content is `visibility:
            // hidden`, not `display: none`, so it keeps its box.
            const contentHeight = content.offsetHeight;
            const contentWidth = content.offsetWidth;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            anchor.style.setProperty('--dropdown-width', `${rect.width}px`);
            anchor.style.setProperty('--dropdown-height', `${rect.height}px`);

            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            // Flip only when it does not fit *and* the other side is roomier;
            // a panel taller than both sides stays below, where scrolling can
            // still reach it.
            if (contentHeight > spaceBelow && spaceAbove > spaceBelow) {
                anchor.style.setProperty('--dropdown-content-top', 'auto');
                anchor.style.setProperty('--dropdown-content-bottom', '100%');
                anchor.style.setProperty('--dropdown-content-margin-top', '0');
                anchor.style.setProperty('--dropdown-content-margin-bottom', '0.5em');
            } else {
                anchor.style.setProperty('--dropdown-content-top', '100%');
                anchor.style.setProperty('--dropdown-content-bottom', 'auto');
                anchor.style.setProperty('--dropdown-content-margin-top', '0.5em');
                anchor.style.setProperty('--dropdown-content-margin-bottom', '0');
            }

            const spaceRight = viewportWidth - rect.left;
            const spaceLeft = rect.right;
            if (contentWidth > spaceRight && spaceLeft > spaceRight) {
                anchor.style.setProperty('--dropdown-content-left', 'auto');
                anchor.style.setProperty('--dropdown-content-right', '0');
            } else {
                anchor.style.setProperty('--dropdown-content-left', '0');
                anchor.style.setProperty('--dropdown-content-right', 'auto');
            }
        };

        place();
        window.addEventListener('resize', place);
        window.addEventListener('scroll', place, true);

        // Content that grows after opening — a filtered list, a lazy render —
        // must be re-placed, or it overflows the edge it was measured against.
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
        if (observer && contentRef.current) observer.observe(contentRef.current);

        return () => {
            window.removeEventListener('resize', place);
            window.removeEventListener('scroll', place, true);
            observer?.disconnect();
        };
        // Re-placed when it opens: a panel measured while closed may open at a
        // different size, and an anchored menu re-opens at a new point.
    }, [isOpen]);

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
            <div ref={contentRef} className={`prismal-dropdown-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    </div>

}

export default Dropdown;