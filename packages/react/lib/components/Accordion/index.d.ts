import { ReactNode, FC } from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface AccordionProps extends ComponentProps {
    children: ReactNode;
    header: ReactNode;
    defaultOpen?: boolean;
}
declare const Accordion: FC<AccordionProps>;
export default Accordion;
