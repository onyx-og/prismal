import React from "react";
import "./index.scss";
import ComponentProps from "../Component";
import {setAccentStyle, setBorderRadius} from "../../utils"
import Icon from "../Icon";


export type TabConfig = {
    name: string | number,
    iconName?: string,
    label: string,
    disabled?: boolean,
    default?: boolean,
    className?: string,
    [otherProp: string]: any
}
interface TabProps extends TabConfig {
    selected: boolean;
}
const Tab: React.FC<TabProps> = (props) => {
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

const defaultRenderer = (tab: TabConfig, index: number, isSelected: boolean) => <Tab selected={isSelected} {...tab} />

interface TabContainerProps {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number)=>void) => React.ReactNode;
    config: TabConfig;
    className?: string;
    setSelected: (selected: TabConfig["name"]) => void;
}
const TabContainer: React.FC<TabContainerProps> = (props) => {
    const { tabRenderer, index, isSelected, config, className, setSelected } = props;

    let tabContainerClass = `prismal-tab-container`;
    if (className)`${tabContainerClass} ${className}`;
    return <div onClick={() => setSelected(config.name)} className={tabContainerClass}>
        {tabRenderer(config, index, isSelected, setSelected)}
    </div>
}
interface TabContentProps {
  'data-tab': string | number;
}
export interface TabsProps extends ComponentProps {
    data: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    onChange?: (currentTab: string | number) => void;
    // [TODO] Try to specify that the elements must have attr/prop "data-tab" set
    children?: React.ReactElement<TabContentProps>[];
    content?: {
        [tabName: string]: React.ReactNode;
    }
    contentRenderer?: (tabName: string | number) => React.ReactNode;
    tabsClass?: string;
    tabContentClass?: string;
    tabClass?: string;
}
export type TabRef = {
    name: string | number;
}
// TODO: Consider accepting children prop that represent tabs
const Tabs = React.forwardRef<TabRef | undefined, TabsProps>((props, ref) => {
    const {
        data, tabRenderer = defaultRenderer,
        className, tabClass, tabsClass, tabContentClass,
        accent, accentDark, accentLight,
        borderRadius, elevation, onChange,
        children, content, contentRenderer
    } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = React.useState(
        data.find(t => t.default)?.name ||
            (data.length > 0) ? data[0].name : undefined
    )
    React.useImperativeHandle(ref, () => ({name: selected!}), [selected]);

    React.useEffect(() => {
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

    const tabs = React.useMemo(() => {
        return data.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return <TabContainer index={index} isSelected={isSelected} setSelected={setSelected} config={tabConfig}
                key={tabConfig.name} className={tabClass}
                tabRenderer={tabRenderer}
            />
        });
    }, [data, selected, tabClass, tabRenderer, setSelected]);

    const tabContent = React.useMemo(() => {
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
            // TODO: Consider adding a fallback content
            return selectedContent;
        }
        return null // Missing content. Probably in use with onChange or ref
    }, [selected, content, tabContentClass_, children, contentRenderer]);

    const style: { [key: string]: any } = React.useMemo(() => {
        let _style: { [key: string]: any } = {}
        _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        _style = setBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark, borderRadius]);

    return <div style={style} className={className_}>
        <div className={tabsClass_}>{tabs}</div>
        {tabContent != null ? <div className={tabContentClass_}>{tabContent}</div> : <></>}
    </div>
})

export default Tabs;