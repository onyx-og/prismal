import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";

import MenuItem from "./menu-item";
import Button from "components/Button";
import { useSidebar } from "hooks/";

export interface MenuItemData {
    label: ReactNode;
    onClick?: () => void;
    items?: MenuItemData[];
    icon?: ReactNode;
    className?: string;
}

interface MenuProps {
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
    const { className, style, spacing = 'md', children, data } = props;

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
                className={item.className}
            >
                {item.items && <Menu spacing={spacing} data={item.items} />}
            </MenuItem>
        ));
    },[spacing]);

    const items = data ? renderItems(data) : children;

    // Detects when the Menu no longer has room to lay its items out in a row:
    // `measureRef` always renders the items unwrapped/off-flow so its natural
    // width can be compared against the space `wrapperRef` is actually given.
    const wrapperRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
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
    }, [items]);

    const { Sidebar, open } = useSidebar();

    let menuClass = `prismal-menu ${className || ''}`;
    if (collapsed) menuClass = `${menuClass} is-collapsed`;

    return <div className={menuClass} style={style_} ref={wrapperRef}>
        <div className="prismal-menu-measure" aria-hidden="true" ref={measureRef}>
            {items}
        </div>
        {collapsed
            ? <Button shape="circle" type="default" iconName="start" onClick={open} />
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