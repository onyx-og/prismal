import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ComponentProps from "../Component";
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius } from 'utils/';
import "./index.scss";

import MenuItem from "./menu-item";
import Button from "components/Button";
import { useSidebar } from "hooks/";
import { useSidebarContext } from "components/Sidebar/context";

export interface MenuItemData {
    label: ReactNode;
    onClick?: () => void;
    items?: MenuItemData[];
    /** An explicit icon element, taking precedence over `iconName`. */
    icon?: ReactNode;
    /** Name of an icon from the icon font, used when `icon` is not given. */
    iconName?: string;
    /** Hover hint / initials source, defaulting to the label's plain text. */
    title?: string;
    className?: string;
}

interface MenuProps extends ComponentProps {
    className?: string;
    style?: CSSProperties;
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children?: ReactNode;
    data?: MenuItemData[];
}

const spacingMap = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
};

const Menu: React.FC<MenuProps> = (props) => {
    const { className, style, 
        accent, accentDark, accentLight,
        spacing = 'md', children, data
    } = props;

    const style_ = {
        ...style,
        '--menu-item-padding': spacingMap[spacing]
    } as CSSProperties;

    const renderItems = useCallback((items: MenuItemData[]) => {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                label={item.label}
                onClick={item.onClick}
                icon={item.icon}
                iconName={item.iconName}
                title={item.title}
                className={item.className}
            >
                {item.items && <Menu spacing={spacing} data={item.items} />}
            </MenuItem>
        ));
    },[spacing]);

    const items = data ? renderItems(data) : children;

    // A Menu inside a Sidebar is laid out as a vertical list, so the
    // horizontal overflow-into-a-sidebar behaviour below does not apply --
    // there items adapt to the panel's width instead (ellipsis truncation,
    // or icon-only when the panel is collapsed).
    const { inSidebar } = useSidebarContext();

    // Detects when the Menu no longer has room to lay its items out in a row:
    // `measureRef` always renders the items unwrapped/off-flow so its natural
    // width can be compared against the space `wrapperRef` is actually given.
    const wrapperRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (inSidebar) {
            setCollapsed(false);
            return;
        }
        const wrapper = wrapperRef.current;
        const measure = measureRef.current;
        if (!wrapper || !measure) return;

        const checkOverflow = () => {
            setCollapsed(measure.scrollWidth > wrapper.clientWidth);
        };
        checkOverflow();

        if (!('ResizeObserver' in window)) return;
        const observer = new ResizeObserver(checkOverflow);
        observer.observe(wrapper);
        observer.observe(measure);
        return () => observer.disconnect();
    }, [items, inSidebar]);

    const { Sidebar, open } = useSidebar();

    let menuClass = `prismal-menu ${className || ''}`;
    if (collapsed) menuClass = `${menuClass} is-collapsed`;
    if (inSidebar) menuClass = `${menuClass} is-in-sidebar`;

    setAccentStyle(style_, { accent, accentLight, accentDark });

    if (inSidebar) {
        return <div className={menuClass} style={style_} ref={wrapperRef}>
            <div className="prismal-menu-items">{items}</div>
        </div>
    }

    return <div className={menuClass} style={style_} ref={wrapperRef}>
        <div className="prismal-menu-measure" aria-hidden="true" ref={measureRef}>
            {items}
        </div>
        {collapsed
            ? <Button shape="circle" type="text" iconName="navicon" onClick={open} />
            : <div className="prismal-menu-items">{items}</div>
        }
        <Sidebar>
            <div className="prismal-menu-sidebar-items">
                {items}
            </div>
        </Sidebar>
    </div>
}

export {MenuItem};
export default Menu;