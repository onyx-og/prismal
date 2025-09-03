import ComponentProps from "components/Component";
import { TabConfig } from "components/Tabs";
import React from "react";
export interface TabViewRawProps extends ComponentProps {
    type: "raw";
    children: React.ReactElement[];
    tabs: TabConfig[];
    tabsClass?: string;
}
export interface TabViewProcProps extends ComponentProps {
    type: "process";
    tabsClass?: string;
    tabContentRenderer: (tabName: string) => React.ReactNode;
    tabs: TabConfig[];
}
export type TabViewProps = TabViewRawProps | TabViewProcProps;
declare const TabView: React.FC<TabViewProps>;
export default TabView;
