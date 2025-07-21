import React from "react";
import "./index.scss";
import ComponentProps from "../Component";
import {setAccentStyle, setBorderRadius} from "../../utils"
import Icon from "../Icon";

interface TabProps extends TabConfig {
    selected: boolean;
}
const Tab: React.FC<TabProps> = (props) => {
    const { name, label, iconName, disabled, selected, className } = props;

    let tabClass = "alenite-tab";
    if (className) tabClass = `${tabClass} ${className}`;
    if (disabled) tabClass = `${tabClass} disabled`;
    if (selected) tabClass = `${tabClass} selected`;

    return <div data-key={name} className={tabClass}>
        { iconName && <Icon name={iconName}/>}
        <span>{label}</span>
    </div>
}

const defaultRenderer = (tab: TabConfig, index: number, isSelected: boolean) => <Tab selected={isSelected} {...tab} />

interface TabContainerProps {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean) => React.ReactNode;
    config: TabConfig;
    className?: string;
    setSelected: (selected: TabConfig["name"]) => void;
}
const TabContainer: React.FC<TabContainerProps> = (props) => {
    const { tabRenderer, index, isSelected, config, className, setSelected } = props;

    let tabContainerClass = `alenite-tab-container`;
    if (className)`${tabContainerClass} ${className}`;
    return <div onClick={() => setSelected(config.name)} className={tabContainerClass}>
        {tabRenderer(config, index, isSelected)}
    </div>
}
type TabConfig = {
    name: string | number,
    iconName?: string,
    label: string,
    disabled?: boolean,
    default?: boolean,
    className?: string,
    [otherProp: string]: any
}
export interface TabsProps extends ComponentProps {
    tabs: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    content?: {
        [tabKey: string]: React.ReactNode;
    }
    tabClassName?: string;
}
// TODO: Consider accepting children prop that represent tabs
const Tabs = React.forwardRef<TabConfig["name"] | undefined, TabsProps>((props, ref) => {
    const {
        tabs: tabsConfig, tabRenderer = defaultRenderer,
        content, className, tabClassName,
        accent, accentDark, accentLight,
        borderRadius, elevation
    } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = React.useState(
        tabsConfig.find(t => t.default)?.name ||
            (tabsConfig.length > 0) ? tabsConfig[0].name : undefined
    )
    React.useImperativeHandle(ref, () => selected, [selected])

    let tabsClass = "alenite-tabs";
    if (className) tabsClass = `${tabsClass} ${className}`;

    const tabs = React.useMemo(() => {
        return tabsConfig.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return <TabContainer index={index} isSelected={isSelected} setSelected={setSelected} config={tabConfig}
                key={tabConfig.name} className={tabClassName}
                tabRenderer={tabRenderer}
            />
        });
    }, [tabsConfig, selected, tabClassName, tabRenderer, setSelected]);

    const tabContent = React.useMemo(() => {
        if (content && selected) {
            const selectedContent = content[selected];
            // TODO: Consider adding a fallback content
            return <div className="alenite-tab-content">
                {selectedContent}
            </div>
        }
        return <></> // consider a 404
    }, [selected, content]);

    const style: { [key: string]: any } = React.useMemo(() => {
        let _style: { [key: string]: any } = {}
        _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        _style = setBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark, borderRadius]);

    return <div style={style} className={"alenite-tabs-container"}>
        <div className={tabsClass}>{tabs}</div>
        {tabContent}
    </div>
})

export default Tabs;