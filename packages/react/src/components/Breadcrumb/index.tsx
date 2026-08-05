import { FC, ReactNode, Children, isValidElement, cloneElement, useMemo } from 'react';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import { setBorderRadius, setPadding, setBoxElevation } from 'utils/';
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';
import './index.scss';

export interface BreadcrumbItemConfig {
    /** The text or custom elements for the item's label. */
    label: string | ReactNode;
    /** The URL for the link. */
    href?: string;
    /** Click event handler. */
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
}

export interface BreadcrumbProps extends ComponentProps {
    /** List of objects defining the path. Treated as a data-driven approach. */
    items?: BreadcrumbItemConfig[];
    /** The separator to render between items. Can be a preset string or custom node. */
    separator?: 'none' | 'slash' | 'arrow' | 'bullet' | 'pipe' | 'chevron' | 'dash' | ReactNode;
    /** Standard container padding. */
    padding?: 'none' | 'xs' | 's' | 'm' | 'l';
    /** Custom children for the compound component pattern. */
    children?: ReactNode;
    /** If true, item labels are truncated when exceeding max width. */
    truncate?: boolean;
    /** Maximum width of each individual label (e.g. '120px' or 150). */
    maxLabelWidth?: string | number;
}

const SEPARATOR_MAP = {
    none: null,
    slash: '/',
    arrow: '→',
    bullet: '•',
    pipe: '|',
    chevron: '›',
    dash: '—',
};

/**
 * @component Breadcrumb
 * @description A customizable and accessible breadcrumb navigation bar with robust formatting and dynamic options.
 */
export const Breadcrumb: FC<BreadcrumbProps> = (props) => {
    const {
        "data-id": dataId,
        items,
        separator = 'chevron',
        className,
        style = {},
        accent, accentDark, accentLight,
        borderRadius = 'sm',
        padding = 's',
        elevation = 0,
        children,
        truncate = false,
        maxLabelWidth,
    } = props;

    let containerClass = 'prismal-breadcrumb';
    if (className) containerClass = `${containerClass} ${className}`;

    let style_: { [key: string]: any } = { ...style };
    setAccentStyle(style_, { accent, accentLight, accentDark });
    if (borderRadius) setBorderRadius(style_, borderRadius);
    if (padding) setPadding(style_, padding);
    if (elevation !== undefined) setBoxElevation(style_, elevation);

    const separatorNode = useMemo(() => {
        if (typeof separator === 'string' && separator in SEPARATOR_MAP) {
            return SEPARATOR_MAP[separator as keyof typeof SEPARATOR_MAP];
        }
        return separator;
    }, [separator]);

    const renderedItems = useMemo(() => {
        if (items) {
            return items.map((item, index) => {
                const isActive = index === items.length - 1;
                return (
                    <BreadcrumbItem
                        key={index}
                        href={item.href}
                        onClick={item.onClick}
                        active={isActive}
                        separator={isActive ? null : separatorNode}
                        truncate={truncate}
                        maxLabelWidth={maxLabelWidth}
                    >
                        {item.label}
                    </BreadcrumbItem>
                );
            });
        }

        const childArray = Children.toArray(children).filter(isValidElement);
        const count = childArray.length;
        return childArray.map((child, index) => {
            const isActive = index === count - 1;
            const childProps = (child.props as any);
            return cloneElement(child as React.ReactElement<any>, {
                active: childProps.active !== undefined ? childProps.active : isActive,
                separator: index === count - 1 ? null : (childProps.separator !== undefined ? childProps.separator : separatorNode),
                truncate: childProps.truncate !== undefined ? childProps.truncate : truncate,
                maxLabelWidth: childProps.maxLabelWidth !== undefined ? childProps.maxLabelWidth : maxLabelWidth,
            });
        });
    }, [items, children, separatorNode, truncate, maxLabelWidth]);

    return (
        <nav data-id={dataId} className={containerClass} style={style_} aria-label="Breadcrumb">
            <ol className="prismal-breadcrumb-list">
                {renderedItems}
            </ol>
        </nav>
    );
};

export { BreadcrumbItem };
export type { BreadcrumbItemProps } from './BreadcrumbItem';
export default Breadcrumb;

