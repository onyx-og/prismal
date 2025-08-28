import React from "react";
import ComponentProps from "components/Component";
import "./index.scss";
export interface AccordionProps extends ComponentProps {
    children: React.ReactNode;
    header: React.ReactNode;
}
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
