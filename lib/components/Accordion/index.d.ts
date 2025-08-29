import React from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface AccordionProps extends ComponentProps {
    children: React.ReactNode;
    header: React.ReactNode;
    defaultOpen?: boolean;
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
