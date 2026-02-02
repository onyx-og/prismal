import { CSSProperties, ReactNode, useCallback } from "react";
import "./index.scss";

import MenuItem from "./menu-item";

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
    },[]);

    return <div className={`prismal-menu ${className || ''}`} style={style_}>
        {data ? renderItems(data) : children}
    </div>
}

export {MenuItem};
export default Menu;