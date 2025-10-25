import { ReactNode, FC } from "react";
import './index.scss';
import ComponentProps from '../Component';
/**
 * @typedef {object} CardProps
 * @description Props for the Card component.
 * @property {ReactNode} [header] The content for the card's header section.
 * @property {string} [headerClass] Additional CSS class for the header.
 * @property {ReactNode} [footer] The content for the card's footer section.
 * @property {string} [footerClass] Additional CSS class for the footer.
 * @property {ReactNode} [children] The main content of the card (body).
 * @property {string} [bodyClass] Additional CSS class for the body.
 * @property {"vertical" | "horizontal"} [orientation="vertical"] The orientation of the card layout.
 * @property {"none" | 'xs' | "s" | 'm' | 'l'} [padding='s'] The padding size for the card content.
 */
export interface CardProps extends ComponentProps {
    header?: ReactNode;
    headerClass?: string;
    footer?: ReactNode;
    footerClass?: string;
    children?: ReactNode;
    bodyClass?: string;
    orientation?: "vertical" | "horizontal";
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
