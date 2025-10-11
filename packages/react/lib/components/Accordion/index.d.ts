import { ReactNode, FC, CSSProperties } from "react";
import ComponentProps from "../Component";
import "./index.scss";
export interface AccordionProps extends ComponentProps {
    children: ReactNode;
    header: ReactNode;
    defaultOpen?: boolean;
    contentStyle?: CSSProperties;
    contentClass?: string;
}
declare const Accordion: FC<AccordionProps>;
export default Accordion;
