import { ReactNode, FC, CSSProperties } from "react";
import ComponentProps from "../Component";
import "./index.scss";
/**
 * @typedef {object} AccordionProps
 * @description Props for the Accordion component.
 */
export interface AccordionProps extends ComponentProps {
    /** The content to be displayed inside the accordion when it is open. */
    children: ReactNode;
    /** The header content of the accordion, which is always visible. */
    header: ReactNode;
    /** If true, the accordion will be open by default. */
    defaultOpen?: boolean;
    /** Custom CSS styles for the content container. */
    contentStyle?: CSSProperties;
    /** Additional CSS class for the content container. */
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
