import { ReactElement, ReactNode } from "react";
import "./index.scss";
import ComponentProps from "../Component";
/**
 * @typedef {object} TabConfig
 * @description Configuration for a single tab.
 */
export type TabConfig = {
    /** A unique name for the tab. */
    name: string | number;
    /** The name of an icon to display in the tab. */
    iconName?: string;
    /** The text label for the tab. */
    label: string;
    /** If true, the tab is disabled. */
    disabled?: boolean;
    /** If true, this tab is selected by default. */
    default?: boolean;
    /** Additional CSS class for the tab. */
    className?: string;
    [otherProp: string]: any;
};
/**
 * @typedef {object} TabContainerProps
 * @description Props for the TabContainer component.
 */
interface TabContainerProps {
    /** The index of the tab. */
    index: number;
    /** Whether the tab is selected. */
    isSelected: boolean;
    /** The function to render the tab. */
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number) => void) => ReactNode;
    /** The configuration for the tab. */
    config: TabConfig;
    /** Additional CSS class. */
    className?: string;
    /** Function to set the selected tab. */
    setSelected: (selected: TabConfig["name"]) => void;
}
/**
 * @typedef {object} TabContentProps
 * @description Props for tab content elements.
 */
interface TabContentProps {
    /** The name of the tab this content belongs to. */
    'data-tab': string | number;
}
/**
 * @typedef {object} TabsProps
 * @description Props for the Tabs component.
 */
export interface TabsProps extends ComponentProps {
    /** The configuration data for all tabs. */
    data: TabConfig[];
    /** A custom function to render tabs. */
    tabRenderer?: TabContainerProps["tabRenderer"];
    /** Callback fired when the selected tab changes. */
    onChange?: (currentTab: string | number) => void;
    /** Child elements representing tab content. */
    children?: ReactElement<TabContentProps>[];
    /** An object mapping tab names to content nodes. */
    content?: {
        [tabName: string]: ReactNode;
    };
    /** A function to render tab content. */
    contentRenderer?: (tabName: string | number) => ReactNode;
    /** Additional CSS class for the tabs container. */
    tabsClass?: string;
    /** Additional CSS class for the tab content container. */
    tabContentClass?: string;
    /** Additional CSS class for individual tabs. */
    tabClass?: string;
}
/**
 * @typedef {object} TabRef
 * @description The ref object exposed by the Tabs component.
 */
export type TabRef = {
    /** The name of the currently selected tab. */
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
