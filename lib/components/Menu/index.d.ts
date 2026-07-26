import { CSSProperties, ReactNode } from "react";
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
declare const Menu: React.FC<MenuProps>;
export { MenuItem };
export default Menu;
