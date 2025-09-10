import React from "react";
import ComponentProps from "../Component";
import { ViewStyle } from "react-native";
export type TabConfig = {
    name: string | number;
    iconName?: string;
    label: string;
    disabled?: boolean;
    default?: boolean;
    [otherProp: string]: any;
};
interface TabContainerProps extends ComponentProps<ViewStyle> {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number) => void) => React.ReactNode;
    config: TabConfig;
    setSelected: (selected: TabConfig["name"]) => void;
}
interface TabContentProps {
    'data-tab': string | number;
}
export interface TabsProps extends ComponentProps<ViewStyle> {
    data: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    children?: React.ReactElement<TabContentProps>[];
    content?: {
        [tabName: string]: React.ReactNode;
    };
    contentRenderer?: (tabName: string | number) => React.ReactNode;
    tabContentClass?: string;
}
export type TabRef = {
    name: string | number;
};
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<TabRef | undefined>>;
export default Tabs;
