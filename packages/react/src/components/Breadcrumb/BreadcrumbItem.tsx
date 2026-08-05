import { FC, ReactNode, useMemo } from 'react';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import Tooltip from 'components/Tooltip';

/**
 * @typedef {object} BreadcrumbItemProps
 * @description Props for the BreadcrumbItem component.
 */
export interface BreadcrumbItemProps extends ComponentProps {
    /** The destination URL for the link. */
    href?: string;
    /** Click event handler. */
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
    /** If true, indicates this is the active/current page. */
    active?: boolean;
    /** The separator to render after this item. Internal use mainly. */
    separator?: ReactNode;
    /** The contents of the item (e.g. label text or custom elements). */
    children?: ReactNode;
    /** If true, the label text will be truncated. */
    truncate?: boolean;
    /** The maximum width of the label element. */
    maxLabelWidth?: string | number;
}

/**
 * @component BreadcrumbItem
 * @description Individual item within a Breadcrumb navigation path.
 */
export const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
    const {
        "data-id": dataId,
        href,
        onClick,
        active = false,
        separator,
        children,
        className,
        style,
        accent, accentDark, accentLight,
        truncate = false,
        maxLabelWidth,
    } = props;

    let itemClass = 'prismal-breadcrumb-item';
    if (active) itemClass += ' item-active';
    if (className) itemClass += ' ' + className;

    let style_: { [key: string]: any } = { ...style };
    setAccentStyle(style_, { accent, accentLight, accentDark });

    const labelNode = useMemo(() => {
        const spanStyle = maxLabelWidth 
            ? { maxWidth: maxLabelWidth, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const } 
            : undefined;
        return (
            <span className="prismal-breadcrumb-label" style={spanStyle}>
                {children}
            </span>
        );
    }, [children, maxLabelWidth]);

    const isString = typeof children === 'string';
    const content = (truncate && isString) ? (
        <Tooltip text={children as string}>
            {labelNode}
        </Tooltip>
    ) : labelNode;

    return (
        <li data-id={dataId} className={itemClass} style={style_}>
            {active ? (
                <span aria-current="page" className="prismal-breadcrumb-link link-active">
                    {content}
                </span>
            ) : (
                <a
                    href={href || '#'}
                    onClick={onClick}
                    className="prismal-breadcrumb-link"
                >
                    {content}
                </a>
            )}
            {separator && (
                <span className="prismal-breadcrumb-separator" aria-hidden="true">
                    {separator}
                </span>
            )}
        </li>
    );
};

export default BreadcrumbItem;
