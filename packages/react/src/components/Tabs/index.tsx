import {
    forwardRef, useState, FC, ReactElement, ReactNode,
    useImperativeHandle, useEffect, useMemo
} from "react";
import "./index.scss";
import ComponentProps from "../Component";
// FIX: Import missing utility functions `setAccentStyle` and `setBorderRadius`.
import { setAccentStyle, setBorderRadius } from "../../utils"
import Icon from "../Icon";

/**
 * @typedef {object} TabConfig
 * @description Configuration for a single tab.
 */
export type TabConfig = {
    /** A unique name for the tab. */
    name: string | number,
    /** The name of an icon to display in the tab. */
    iconName?: string,
    /** The text label for the tab. */
    label: string,
    /** If true, the tab is disabled. */
    disabled?: boolean,
    /** If true, this tab is selected by default. */
    default?: boolean,
    /** Additional CSS class for the tab. */
    className?: string,
    [otherProp: string]: any
}

/**
 * @typedef {object} TabProps
 * @description Props for the Tab component.
 */
interface TabProps extends TabConfig {
    /** Whether the tab is currently selected. */
    selected: boolean;
}

/**
 * @component Tab
 * @description Renders a single tab item.
 * @param {TabProps} props The component props.
 * @returns {React.ReactElement} The rendered tab.
 */
const Tab: FC<TabProps> = (props) => {
    const { name, label, iconName, disabled, selected, className } = props;

    let tabClass = "prismal-tab";
    if (className) tabClass = `${tabClass} ${className}`;
    if (disabled) tabClass = `${tabClass} disabled`;
    if (selected) tabClass = `${tabClass} selected`;

    return <div data-key={name} className={tabClass}>
        {iconName && <Icon name={iconName} />}
        <span>{label}</span>
    </div>
}

/**
 * @function defaultRenderer
 * @description The default renderer for a tab.
 * @param {TabConfig} tab The tab configuration.
 * @param {number} index The index of the tab.
 * @param {boolean} isSelected Whether the tab is selected.
 * @returns {ReactNode} The rendered Tab component.
 */
const defaultRenderer = (tab: TabConfig, index: number, isSelected: boolean) => <Tab selected={isSelected} {...tab} />

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
 * @component TabContainer
 * @description A container for a single tab that handles selection.
 * @param {TabContainerProps} props The component props.
 * @returns {React.ReactElement} The rendered tab container.
 */
const TabContainer: FC<TabContainerProps> = (props) => {
    const { tabRenderer, index, isSelected, config, className, setSelected } = props;

    let tabContainerClass = `prismal-tab-container`;
    if (className) tabContainerClass = `${tabContainerClass} ${className}`;
    return <div onClick={() => setSelected(config.name)} className={tabContainerClass}>
        {tabRenderer(config, index, isSelected, setSelected)}
    </div>
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
    }
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
}

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
const Tabs = forwardRef<TabRef | undefined, TabsProps>((props, ref) => {
    const {
        data, tabRenderer = defaultRenderer,
        className, tabClass, tabsClass, tabContentClass,
        accent, accentDark, accentLight,
        borderRadius, onChange,
        children, content, contentRenderer
    } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = useState(
        data.find(t => t.default)?.name ||
            (data.length > 0) ? data[0].name : undefined
    )
    useImperativeHandle(ref, () => ({ name: selected! }), [selected]);

    useEffect(() => {
        if (onChange && selected) {
            onChange(selected);
        }
    }, [selected, onChange]);

    let tabsClass_ = "prismal-tabs";
    if (tabsClass) tabsClass_ = `${tabsClass_} ${tabsClass}`;

    let className_ = "prismal-tabs-container";
    if (className) className_ = `${className_} ${className}`;

    let tabContentClass_ = "prismal-tab-content";
    if (tabContentClass) tabContentClass_ = `${tabContentClass_} ${tabContentClass}`;

    const tabs = useMemo(() => {
        return data.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return <TabContainer index={index} isSelected={isSelected} setSelected={setSelected} config={tabConfig}
                key={tabConfig.name} className={tabClass}
                tabRenderer={tabRenderer}
            />
        });
    }, [data, selected, tabClass, tabRenderer]);

    const tabContent = useMemo(() => {
        if (selected && children) {
            return children.find((el) => {
                return el.props["data-tab"] == selected
            })
        }
        else if (selected && contentRenderer) {
            return contentRenderer(selected)
        }
        else if (selected && content) {
            const selectedContent = content[selected];
            return selectedContent;
        }
        return null // Missing content. Probably in use with onChange or ref
    }, [selected, content, children, contentRenderer]);

    const style: { [key: string]: any } = useMemo(() => {
        let _style: { [key: string]: any } = {}
        _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        if (borderRadius) _style = setBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark, borderRadius]);

    return <div style={style} className={className_}>
        <div className={tabsClass_}>{tabs}</div>
        {tabContent != null ? <div className={tabContentClass_}>{tabContent}</div> : <></>}
    </div>
})
Tabs.displayName = "Tabs";
export default Tabs;