import { FC, ReactNode } from 'react';
import ComponentProps from '../Component';
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
export declare const BreadcrumbItem: FC<BreadcrumbItemProps>;
export default BreadcrumbItem;
