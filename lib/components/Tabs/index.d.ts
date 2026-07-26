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
    /** Presentation mode, forwarded from Tabs. */
    variant: TabsVariant;
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
 * @typedef {"tabs"|"nav"} TabsVariant
 * @description Presentation mode for Tabs.
 *
 * `"tabs"` (the default) is the ARIA tabs widget: it implies only the selected panel
 * exists, which is why it's the right choice whenever `children`/`content`/
 * `contentRenderer` actually swap out what's rendered.
 *
 * `"nav"` is for bars that sit in front of content that's *all* present already —
 * a scrollspy nav, a set of in-page jump links — where Tabs is being used purely to
 * highlight and select, never to hide. It renders the tab strip as a `<nav>` landmark
 * of buttons instead of a bare div, and marks the active item with `aria-current`
 * instead of implying a tablist. It does not change panel rendering: that's still
 * governed by whether you pass `children`/`content`/`contentRenderer`, exactly as in
 * `"tabs"` mode — pass none of them for a bar with nothing to select into.
 */
export type TabsVariant = "tabs" | "nav";
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
    /**
     * The selected tab, for controlled usage. When set, Tabs stops choosing its own
     * selection (from `data[0]` or the `default`-flagged entry) and always renders
     * whichever `name` you pass — clicks call `onChange` instead of updating anything
     * internally, so you're expected to feed the value back in. Needed whenever
     * something other than clicking a tab decides the active one, e.g. a scrollspy
     * nav where scroll position drives selection. Omit to keep Tabs uncontrolled.
     */
    selected?: TabConfig["name"];
    /** Presentation mode. See `TabsVariant`. Defaults to `"tabs"`. */
    variant?: TabsVariant;
    /** Accessible name for the `<nav>` landmark. Only read when `variant="nav"`. */
    navLabel?: string;
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
 * @example
 * // Controlled scrollspy-style nav: no panels, external state decides `selected`.
 * <Tabs
 *   variant="nav"
 *   navLabel="Sections"
 *   data={[{ name: 'intro', label: 'Intro' }, { name: 'details', label: 'Details' }]}
 *   selected={activeSection}
 *   onChange={scrollToSection}
 * />
 */
declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<TabRef | undefined>>;
export default Tabs;
