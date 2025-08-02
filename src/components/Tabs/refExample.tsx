import ComponentProps from "components/Component";
import Tabs, {TabRef, TabConfig} from "components/Tabs";
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
const TabView: React.FC<TabViewProps> = (props) => {
    const {
        className,
        accent, accentLight, accentDark
    } = props;

    let tabbedViewClass = 'prismal-view-tabs';
    if (className) tabbedViewClass = `${tabbedViewClass} ${className}`;

    const { tabsClass } = props;
    let tabsClass_ = "prismal-view-tabs-wrapper";
    if (tabsClass) tabsClass_ = `${tabsClass_} ${tabsClass}`;

    const { type, tabs } = props;

    const focusedTab = React.useRef<TabRef | undefined>();
    const [refSet, markRefSet] = React.useState<boolean | TabRef>(false)

    const refSetter = React.useCallback((selection: TabRef) => {
        if (selection) {
            markRefSet(selection)
        }
        // Save a reference to the node
        focusedTab.current = selection
    }, []);

    const viewContent = React.useMemo(() => {
        if (refSet && type == "raw") {
            return props.children.find((el) => {
                return el.props["data-tab"] == focusedTab.current?.name
            })
        }
        return <></>
    }, [refSet, type]);

    return <div className={tabbedViewClass}>
        <Tabs ref={refSetter} className={tabsClass_} data={tabs} />
        <div className="prismal-view-tabs-content-wrapper">
            {viewContent}
        </div>
    </div>
}

export default TabView;