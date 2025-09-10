import React from "react";
// import "./index.scss";
import ComponentProps from "../Component";
// import {setAccentStyle, getBorderRadius} from "../../utils"
// import Icon from "../Icon";
import { View, StyleProp, ViewStyle, TouchableHighlight, Text } from "react-native";
import styles from "./styles";

export type TabConfig = {
    name: string | number,
    iconName?: string,
    label: string,
    disabled?: boolean,
    default?: boolean,
    [otherProp: string]: any
}
interface TabProps extends TabConfig, ComponentProps<ViewStyle> {
    selected: boolean;
}
const Tab: React.FC<TabProps> = (props) => {
    const { name, label, iconName, disabled, selected, style } = props;

    // let tabClass = "prismal-tab";
    // if (className) tabClass = `${tabClass} ${className}`;
    // if (disabled) tabClass = `${tabClass} disabled`;
    // if (selected) tabClass = `${tabClass} selected`;

    let tabStyle = styles.tab;
    if (selected) {
        tabStyle = Object.assign({...tabStyle}, styles.tabSelected);
    }
    
    if (style) tabStyle = Object.assign({...tabStyle}, style);

    return <View data-key={name} style={tabStyle}>{/* tabClass */}
        {/* { iconName && <Icon name={iconName}/>} */}
        <Text>{label}</Text>
    </View>
}

const defaultRenderer = (tab: TabConfig, index: number, isSelected: boolean) => <Tab selected={isSelected} {...tab} />

interface TabContainerProps extends ComponentProps<ViewStyle> {
    index: number;
    isSelected: boolean;
    tabRenderer: (tab: TabConfig, index: number, isSelected: boolean, setSelected: (selected: string | number)=>void) => React.ReactNode;
    config: TabConfig;
    setSelected: (selected: TabConfig["name"]) => void;
}
const TabContainer: React.FC<TabContainerProps> = (props) => {
    const { tabRenderer, index, isSelected, config, setSelected } = props;

    const tab = React.useMemo(() => {
        return tabRenderer(config, index, isSelected, setSelected);
    }, [isSelected, tabRenderer, config, index])

    // let tabContainerClass = `prismal-tab-container`;
    return <TouchableHighlight  onPress={() => setSelected(config.name)} >
        <View style={styles.tabContainer}>{/*tabContainerClass */}
            {tab}
        </View>
    </TouchableHighlight>
}
interface TabContentProps {
    'data-tab': string | number;
}
export interface TabsProps extends ComponentProps<ViewStyle> {
    data: TabConfig[];
    tabRenderer?: TabContainerProps["tabRenderer"];
    // [TODO] Try to specify that the elements must have attr/prop "data-tab" set
    children?: React.ReactElement<TabContentProps>[];
    content?: {
        [tabName: string]: React.ReactNode;
    }
    contentRenderer?: (tabName: string | number) => React.ReactNode;
    // tabsClass?: string;
    tabContentClass?: string;
    // tabClass?: string;
}
export type TabRef = {
    name: string | number;
}
// TODO: Consider accepting children prop that represent tabs
const Tabs = React.forwardRef<TabRef | undefined, TabsProps>((props, ref) => {
    const {
        data, tabRenderer = defaultRenderer,
        // className, tabClass, tabsClass, tabContentClass,
        accent, accentDark, accentLight, style,
        // borderRadius, elevation,
        children, content, contentRenderer
    } = props;
    // Select the first tab if no default is provided
    const [selected, setSelected] = React.useState(
        data.find(t => t.default)?.name ||
            (data.length > 0) ? data[0].name : undefined
    )
    React.useImperativeHandle(ref, () => ({ name: selected! }), [selected])

    // let tabsClass_ = "prismal-tabs";
    // if (tabsClass) tabsClass_ = `${tabsClass_} ${tabsClass}`;

    // let className_ = "prismal-tabs-container";
    // if (className) className_ = `${className_} ${className}`;

    // let tabContentClass_ = "prismal-tab-content";
    // if (tabContentClass) tabContentClass_ = `${tabContentClass_} ${tabContentClass}`;

    const tabs = React.useMemo(() => {
        return data.map((tabConfig, index) => {
            let isSelected = selected == tabConfig.name;
            return <TabContainer index={index} isSelected={isSelected} setSelected={setSelected} config={tabConfig}
                key={tabConfig.name} style={styles.tab}
                tabRenderer={tabRenderer}
            />
        });
    }, [data, selected, tabRenderer, setSelected]);

    const tabContent = React.useMemo(() => {
        let component;
        if (selected && children) {
            component = children.find((el) => {
                return el.props["data-tab"] == selected
            })
        }
        else if (selected && contentRenderer) {
            component = contentRenderer(selected)
        }
        else if (selected && content) {
            const selectedContent = content[selected];
            // TODO: Consider adding a fallback content
            component = selectedContent;
        }
        if (component) {
            return <View style={styles.tabContent}>
                {component}
            </View>;
        } else {
            return null;
        }
    }, [selected, content, children, contentRenderer]);

    /*
    const style: { [key: string]: any } = React.useMemo(() => {
        let _style: { [key: string]: any } = {}
        // _style = setAccentStyle(_style, { accent, accentLight, accentDark });
        // _style = getBorderRadius(_style, borderRadius)
        return _style;
    }, [accent, accentLight, accentDark]);
    */
   let tabContainerStyle = styles.tabsContainer;
   if (style) tabContainerStyle = Object.assign({...tabContainerStyle}, style);

    return <View style={styles.tabContainer}>
        <View style={styles.tabs}>{tabs}</View>
        {tabContent}
    </View>
})

export default Tabs;