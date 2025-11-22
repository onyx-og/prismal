import { ReactNode, FC } from "react";
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} CardProps
 * @description Props for the Card component.
 */
export interface CardProps extends ComponentProps {
    /** The content for the card's header section. */
    header?: ReactNode;
    /** Additional CSS class for the header. */
    headerClass?: string;
    /** The content for the card's footer section. */
    footer?: ReactNode;
    /** Additional CSS class for the footer. */
    footerClass?: string;
    /** The main content of the card (body). */
    children?: ReactNode;
    /** Additional CSS class for the body. */
    bodyClass?: string;
    /** The orientation of the card layout. */
    orientation?: "vertical" | "horizontal";
    /** The padding size for the card content. */
    padding?: "none" | 'xs' | "s" | 'm' | 'l';
}
/**
 * @component Card
 * @description A flexible content container with optional header, footer, and body sections.
 * @param {CardProps} props The component props.
 * @returns {React.ReactElement} The rendered Card component.
 * @example
 * <Card header={<h2>Card Title</h2>} footer={<Button>Action</Button>}>
 *   <p>This is the card content.</p>
 * </Card>
 */
declare const Card: FC<CardProps>;
export default Card;
