import { FC, ReactNode } from 'react';
import ComponentProps from '../Component';
import BreadcrumbItem from './BreadcrumbItem';
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
/**
 * @component Breadcrumb
 * @description A customizable and accessible breadcrumb navigation bar with robust formatting and dynamic options.
 */
export declare const Breadcrumb: FC<BreadcrumbProps>;
export { BreadcrumbItem };
export type { BreadcrumbItemProps } from './BreadcrumbItem';
export default Breadcrumb;
