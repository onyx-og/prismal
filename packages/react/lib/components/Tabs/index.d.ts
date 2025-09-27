import { ReactElement, ReactNode } from "react";
import "./index.scss";
import ComponentProps from "../Component";
export type TabConfig = {
    name: string | number;
    iconName?: string;
    label: string;
    disabled?: boolean;
    default?: boolean;
    className?: string;
    [otherProp: string]: any;
};
interface TabContainerProps {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number) => void) => ReactNode;
    config: TabConfig;
    className?: string;
    setSelected: (selected: TabConfig["name"]) => void;
}
interface TabContentProps {
    'data-tab': string | number;
}
export interface TabsProps extends ComponentProps {
    data: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    onChange?: (currentTab: string | number) => void;
    children?: ReactElement<TabContentProps>[];
    content?: {
        [tabName: string]: ReactNode;
    };
    contentRenderer?: (tabName: string | number) => ReactNode;
    tabsClass?: string;
    tabContentClass?: string;
    tabClass?: string;
}
export type TabRef = {
    name: string | number;
};
declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<TabRef | undefined>>;
export default Tabs;
