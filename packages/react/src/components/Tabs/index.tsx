import {
    forwardRef, useState, useCallback, FC, ReactElement, ReactNode,
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
    /** Presentation mode, forwarded from Tabs. */
    variant: TabsVariant;
}

/**
 * @component TabContainer
 * @description A container for a single tab that handles selection.
 *
 * In `variant="nav"` this renders as a `<button>` rather than a `<div>`, so the item is
 * keyboard-operable, and carries `aria-current` rather than relying on the tabs pattern's
 * implicit "only the selected panel exists" — see `Tabs`' `variant` doc for why.
 * @param {TabContainerProps} props The component props.
 * @returns {React.ReactElement} The rendered tab container.
 */
const TabContainer: FC<TabContainerProps> = (props) => {
    const { tabRenderer, index, isSelected, config, className, setSelected, variant } = props;

    let tabContainerClass = `prismal-tab-container`;
    if (className) tabContainerClass = `${tabContainerClass} ${className}`;

    const content = tabRenderer(config, index, isSelected, setSelected);
    const onClick = () => setSelected(config.name);

    if (variant === "nav") {
        return (
            <button
                type="button"
                onClick={onClick}
                className={tabContainerClass}
                aria-current={isSelected ? "true" : undefined}
            >
                {content}
            </button>
        );
    }

    return <div onClick={onClick} className={tabContainerClass}>
        {content}
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
    }
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
const Tabs = forwardRef<TabRef | undefined, TabsProps>((props, ref) => {
    const {
        data, tabRenderer = defaultRenderer,
        className, tabClass, tabsClass, tabContentClass,
        accent, accentDark, accentLight,
        borderRadius, onChange,
        children, content, contentRenderer,
        selected: selectedProp, variant = "tabs", navLabel
    } = props;

    const isControlled = selectedProp !== undefined;

    // Select the tab flagged `default`, falling back to the first one.
    const [internalSelected, setInternalSelected] = useState<TabConfig["name"] | undefined>(
        () => data.find(t => t.default)?.name ?? (data.length > 0 ? data[0].name : undefined)
    );

    const selected = isControlled ? selectedProp : internalSelected;

    useImperativeHandle(ref, () => ({ name: selected! }), [selected]);

    // Uncontrolled only: a controlled `selected` is already known to the caller, so
    // echoing it back through onChange would just be redundant noise on every render.
    useEffect(() => {
        if (!isControlled && onChange && internalSelected !== undefined) {
            onChange(internalSelected);
        }
    }, [isControlled, internalSelected, onChange]);

    const setSelected = useCallback((name: TabConfig["name"]) => {
        if (isControlled) onChange?.(name);
        else setInternalSelected(name);
    }, [isControlled, onChange]);

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
                tabRenderer={tabRenderer} variant={variant}
            />
        });
    }, [data, selected, tabClass, tabRenderer, setSelected, variant]);

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
        {variant === "nav"
            ? <nav className={tabsClass_} aria-label={navLabel}>{tabs}</nav>
            : <div className={tabsClass_}>{tabs}</div>}
        {tabContent != null ? <div className={tabContentClass_}>{tabContent}</div> : <></>}
    </div>
})
Tabs.displayName = "Tabs";
export default Tabs;