import { ReactElement, ReactNode } from "react";
import "./index.scss";
import ComponentProps from "../Component";
/**
 * @typedef {object} TabConfig
 * @description Configuration for a single tab.
 * @property {string | number} name A unique name for the tab.
 * @property {string} [iconName] The name of an icon to display in the tab.
 * @property {string} label The text label for the tab.
 * @property {boolean} [disabled] If true, the tab is disabled.
 * @property {boolean} [default] If true, this tab is selected by default.
 * @property {string} [className] Additional CSS class for the tab.
 */
export type TabConfig = {
    name: string | number;
    iconName?: string;
    label: string;
    disabled?: boolean;
    default?: boolean;
    className?: string;
    [otherProp: string]: any;
};
/**
 * @typedef {object} TabContainerProps
 * @description Props for the TabContainer component.
 * @property {number} index The index of the tab.
 * @property {boolean} isSelected Whether the tab is selected.
 * @property {(tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number)=>void) => ReactNode} tabRenderer The function to render the tab.
 * @property {TabConfig} config The configuration for the tab.
 * @property {string} [className] Additional CSS class.
 * @property {(selected: TabConfig["name"]) => void} setSelected Function to set the selected tab.
 */
interface TabContainerProps {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number) => void) => ReactNode;
    config: TabConfig;
    className?: string;
    setSelected: (selected: TabConfig["name"]) => void;
}
/**
 * @typedef {object} TabContentProps
 * @description Props for tab content elements.
 * @property {string | number} data-tab The name of the tab this content belongs to.
 */
interface TabContentProps {
    'data-tab': string | number;
}
/**
 * @typedef {object} TabsProps
 * @description Props for the Tabs component.
 * @property {TabConfig[]} data The configuration data for all tabs.
 * @property {TabContainerProps["tabRenderer"]} [tabRenderer] A custom function to render tabs.
 * @property {(currentTab: string | number) => void} [onChange] Callback fired when the selected tab changes.
 * @property {ReactElement<TabContentProps>[]} [children] Child elements representing tab content.
 * @property {{[tabName: string]: ReactNode}} [content] An object mapping tab names to content nodes.
 * @property {(tabName: string | number) => ReactNode} [contentRenderer] A function to render tab content.
 * @property {string} [tabsClass] Additional CSS class for the tabs container.
 * @property {string} [tabContentClass] Additional CSS class for the tab content container.
 * @property {string} [tabClass] Additional CSS class for individual tabs.
 */
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
/**
 * @typedef {object} TabRef
 * @description The ref object exposed by the Tabs component.
 * @property {string | number} name The name of the currently selected tab.
 */
export type TabRef = {
    name: string | number;
};
/**
 * @component Tabs
 * @description A component for displaying content in a tabbed interface.
 * @param {TabsProps} props The component props.
 * @param {React.Ref<TabRef | undefined>} ref The forwarded ref.
 * @returns {React.ReactElement} The rendered Tabs component.
 * @example
 * <Tabs data={[{ name: 'tab1', label: 'Tab 1' }, { name: 'tab2', label: 'Tab 2' }]}>
 *   <div data-tab="tab1">Content 1</div>
 *   <div data-tab="tab2">Content 2</div>
 * </Tabs>
 */
declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<TabRef | undefined>>;
export default Tabs;
