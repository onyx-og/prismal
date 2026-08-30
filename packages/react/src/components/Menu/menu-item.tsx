import React, { ReactNode, useMemo } from "react";
import Dropdown from "../Dropdown";
import Icon from "components/Icon";
import { useSidebarContext } from "components/Sidebar/context";
import { getInitials, textFromNode } from "utils/";
import "./index.scss";

export interface MenuItemProps {
    /** The item's label. Truncated with an ellipsis when space runs out. */
    label?: ReactNode;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    /** An explicit icon element, taking precedence over `iconName`. */
    icon?: ReactNode;
    /** Name of an icon from the icon font, used when `icon` is not given. */
    iconName?: string;
    /**
     * Text used for the hover hint and for the initials fallback. Defaults to
     * the plain text of `label`; provide it when the label is not plain text.
     */
    title?: string;
    /**
     * Forces icon-only rendering. When omitted, the item renders icon-only if
     * it sits inside a collapsed Sidebar.
     */
    iconOnly?: boolean;
}

/**
 * @component MenuItem
 * @description A single menu entry. It adapts to the width it is given: the
 * label truncates with an ellipsis, and inside a collapsed Sidebar (or with
 * `iconOnly`) it renders as an icon alone -- `icon`, else `iconName`, else the
 * label's initials -- keeping the full label as a hover hint.
 * @param {MenuItemProps} props The component props.
 * @returns {React.ReactElement} The rendered MenuItem component.
 * @example
 * <MenuItem iconName="cog" label="User Settings" onClick={open} />
 */
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        label, onClick, children, className,
        icon, iconName, title, iconOnly
    } = props;

    const { collapsed } = useSidebarContext();
    const isIconOnly = iconOnly ?? collapsed;

    const hint = useMemo(
        () => title ?? textFromNode(label), [title, label]
    );

    // Icon resolution order: explicit element > named font icon > initials of
    // the label, so an item is never reduced to a blank square when collapsed.
    const iconNode = useMemo(() => {
        if (icon) return icon;
        if (iconName) return <Icon name={iconName} />;
        if (!isIconOnly) return null;
        const initials = getInitials(hint);
        return initials
            ? <span className="prismal-menu-item-initials">{initials}</span>
            : null;
    }, [icon, iconName, isIconOnly, hint]);

    let itemClass = `prismal-menu-item ${className || ''}`;
    if (isIconOnly) itemClass = `${itemClass} is-icon-only`;

    const content = (
        <div
            className={itemClass}
            onClick={onClick}
            title={hint || undefined}
            // Icon-only rendering drops the label element entirely, so without
            // this the item has no accessible name at all -- a glyph or a pair
            // of initials is not one.
            aria-label={isIconOnly ? (hint || undefined) : undefined}
        >
            {iconNode && <span
                className="prismal-menu-item-icon"
                // Repeated on the glyph itself, not just inherited from the
                // wrapper: a caller-supplied `icon` element may carry its own
                // `title` (or none where it needs one), and in a collapsed rail
                // the glyph is the only thing left to hover.
                title={hint || undefined}
            >{iconNode}</span>}
            {!isIconOnly && <span className="prismal-menu-item-label">{label}</span>}
        </div>
    );

    if (children) {
        return <Dropdown type="default" toggleElement={content}>
            {children}
        </Dropdown>
    }

    return content;
}

export default MenuItem;
