import {
    forwardRef, useState, FC, ReactElement, ReactNode,
    useImperativeHandle, useEffect, useMemo
} from "react";
import "./index.scss";
import ComponentProps from "../Component";
// FIX: Import missing utility functions `setAccentStyle` and `setBorderRadius`.
import {setAccentStyle, setBorderRadius} from "../../utils"
import Icon from "../Icon";

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
    name: string | number,
    iconName?: string,
    label: string,
    disabled?: boolean,
    default?: boolean,
    className?: string,
    [otherProp: string]: any
}

/**
 * @typedef {object} TabProps
 * @description Props for the Tab component.
 * @property {boolean} selected Whether the tab is currently selected.
 */
interface TabProps extends TabConfig {
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
        { iconName && <Icon name={iconName}/>}
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
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number)=>void) => ReactNode;
    config: TabConfig;
    className?: string;
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
    }
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
    useImperativeHandle(ref, () => ({name: selected!}), [selected]);

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
        if(borderRadius) _style = setBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark, borderRadius]);

    return <div style={style} className={className_}>
        <div className={tabsClass_}>{tabs}</div>
        {tabContent != null ? <div className={tabContentClass_}>{tabContent}</div> : <></>}
    </div>
})
Tabs.displayName = "Tabs";
export default Tabs;