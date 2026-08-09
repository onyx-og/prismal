import {
    FC, ReactNode, MouseEvent as ReactMouseEvent,
    useCallback, useEffect, useMemo, useRef, useState
} from "react";
import Dropdown from "components/Dropdown";
import { MenuItem, MenuItemData } from "components/Menu";
import ComponentProps from "../Component";
import "./index.scss";

export interface ContextMenuProps extends ComponentProps {
    /** The element that right-clicking opens the menu on. */
    children: ReactNode;
    /** The menu's items — same shape as `Menu`'s `data`, including nested `items` for hover submenus. */
    items: MenuItemData[];
    /** If true, right-clicking the trigger falls back to the browser's native context menu. */
    disabled?: boolean;
    /** Called after the menu closes, however it closed (an item click, an outside click, or Escape). */
    onClose?: () => void;
}

interface Point {
    x: number;
    y: number;
}

/**
 * @component ContextMenu
 * @description Opens a `Menu`-item list at the cursor on right-click — built on `Dropdown` the same
 * way `Tooltip` is: a phantom, zero-size `Dropdown` is placed at the click point via inline
 * `position: fixed` styling and forced open with `isOpen`, so Dropdown's own rect-based flip
 * logic (which edge it opens toward) applies unchanged. Closes on an item click, an outside
 * click, or Escape.
 * @example
 * <ContextMenu items={[{ label: 'Rename', onClick: rename }, { label: 'Delete', onClick: remove }]}>
 *   <div className="file-row">report.pdf</div>
 * </ContextMenu>
 */
const ContextMenu: FC<ContextMenuProps> = (props) => {
    const {
        "data-id": dataId,
        children, items, disabled = false, onClose,
        className, style,
        accent, accentDark, accentLight, borderRadius,
    } = props;

    const [position, setPosition] = useState<Point | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const close = useCallback(() => {
        setPosition(null);
        onClose?.();
    }, [onClose]);

    const handleContextMenu = useCallback((event: ReactMouseEvent) => {
        if (disabled) return;
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
    }, [disabled]);

    // Dismiss on an outside click or Escape while open — Dropdown/Menu have no such hook of their own.
    useEffect(() => {
        if (!position) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) close();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [position, close]);

    // Renders a vertical item list (unlike Menu itself, which lays items out as a horizontal nav bar
    // with its own responsive-collapse machinery — not the right shape for a popup). Reuses MenuItem
    // row-by-row so nested `items` still get their existing hover/focus submenu behavior for free.
    // Every leaf item's onClick is wrapped to also close the menu; parent rows with only `items` are
    // left alone, since hovering already reveals their submenu.
    const renderItems = useCallback((data: MenuItemData[]): ReactNode => (
        <div className="prismal-context-menu-list">
            {data.map((item, index) => (
                <MenuItem
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    className={item.className}
                    onClick={item.onClick ? () => { item.onClick?.(); close(); } : undefined}
                >
                    {item.items ? renderItems(item.items) : undefined}
                </MenuItem>
            ))}
        </div>
    ), [close]);

    const menuContent = useMemo(() => renderItems(items), [renderItems, items]);

    let className_ = "prismal-context-menu";
    if (className) className_ = `${className_} ${className}`;

    return (
        <div className={className_} style={style} data-id={dataId} onContextMenu={handleContextMenu}>
            {children}
            {position ? (
                <div
                    ref={menuRef}
                    className="prismal-context-menu-anchor"
                    style={{ position: "fixed", left: position.x, top: position.y }}
                >
                    {/* Remounted per click (key) since Dropdown only measures its anchor rect on mount/resize/scroll. */}
                    <Dropdown
                        key={`${position.x}-${position.y}`}
                        type="default"
                        isOpen
                        accent={accent} accentDark={accentDark} accentLight={accentLight}
                        borderRadius={borderRadius}
                    >
                        {menuContent}
                    </Dropdown>
                </div>
            ) : null}
        </div>
    );
};

export default ContextMenu;
