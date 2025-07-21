import React from "react";
import "./index.scss";
import ComponentProps from "../Component";
interface TabContainerProps {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean) => React.ReactNode;
    config: TabConfig;
    className?: string;
    setSelected: (selected: TabConfig["name"]) => void;
}
type TabConfig = {
    name: string | number;
    iconName?: string;
    label: string;
    disabled?: boolean;
    default?: boolean;
    className?: string;
    [otherProp: string]: any;
};
export interface TabsProps extends ComponentProps {
    tabs: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    content?: {
        [tabKey: string]: React.ReactNode;
    };
    tabClassName?: string;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<string | number | undefined>>;
export default Tabs;
