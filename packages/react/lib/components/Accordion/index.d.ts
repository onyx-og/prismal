import { ReactNode, FC, CSSProperties } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} AccordionProps
 * @description Props for the Accordion component.
 * @property {ReactNode} children The content to be displayed inside the accordion when it is open.
 * @property {ReactNode} header The header content of the accordion, which is always visible.
 * @property {boolean} [defaultOpen=false] If true, the accordion will be open by default.
 * @property {CSSProperties} [contentStyle] Custom CSS styles for the content container.
 * @property {string} [contentClass] Additional CSS class for the content container.
 */
export interface AccordionProps extends ComponentProps {
    children: ReactNode;
    header: ReactNode;
    defaultOpen?: boolean;
    contentStyle?: CSSProperties;
    contentClass?: string;
}
/**
 * @component Accordion
 * @description A collapsible content panel component.
 * @param {AccordionProps} props The component props.
 * @returns {React.ReactElement} The rendered Accordion component.
 * @example
 * <Accordion header={<h2>Click to open</h2>}>
 *   <p>This is the content.</p>
 * </Accordion>
 */
declare const Accordion: FC<AccordionProps>;
export default Accordion;
