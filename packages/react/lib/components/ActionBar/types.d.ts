import type ComponentProps from "../Component";
import type React from 'react';
import type { RefObject, JSX } from 'react';
/**
 * @typedef {object} ActionBarItemConfig
 * @description Configuration for a single item displayed within the ActionBar.
 * @property {React.ReactNode} item The renderable content for the item.
 * @property {"left" | "center" | "right"} position The section of the ActionBar where this item should appear.
 * @property {string} [title] Optional title used for accessibility or tooltips.
 * @property {string} key Unique identifier for the item.
 * @property {boolean} [scale] Whether the item should scale to fill available space.
 * @property {JSX.Element} [alt] Optional alternate element shown in an "alt" state or modal.
 */
export interface ActionBarItemConfig {
    item: React.ReactNode;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}
/**
 * @typedef {object} ActionBarRef
 * @description DOM references managed by the ActionBar for layout and measurements.
 * @property {(HTMLDivElement | null)[]} lowNode The lowest-level managed DOM nodes (e.g., item containers).
 * @property {HTMLDivElement | null} highNode The high-level container DOM node.
 */
export interface ActionBarRef {
    lowNode: (HTMLDivElement | null)[];
    highNode: HTMLDivElement | null;
}
/**
 * @typedef {object} ActionBarItemWithRefProps
 * @description Props for an ActionBar item wrapper that forwards refs.
 * @property {React.ReactNode} [children] Optional children to render within the wrapper.
 */
export interface ActionBarItemWithRefProps {
    children?: React.ReactNode;
}
/**
 * @typedef {object} ActionbarAltSectionBtn
 * @description Configuration for an alternate section button in the ActionBar.
 * @property {string} iconName The icon name used for the button.
 * @property {"default" | "primary" | "text"} type The visual style of the button.
 */
export type ActionbarAltSectionBtn = {
    iconName: string;
    type: "default" | "primary" | "text";
};
/**
 * @typedef {object} ActionBarProps
 * @description Props for the ActionBar component. Inherits common component props from ComponentProps.
 * @property {(ActionBarItemConfig | null)[]} items The list of items to render in the bar; nulls are ignored.
 * @property {"default" | "primary" | "secondary"} [type] Visual style variant for the ActionBar.
 * @property {React.ReactElement[]} [children] Optional React elements rendered within the ActionBar.
 * @property {"left" | "center" | "right"} [defaultPosition] Default section for items without explicit position.
 * @property {string} [modalAreaId] Optional DOM id where modals/portals should render.
 * @property {object} [sectionAlt] Optional alternate action buttons for sections.
 * @property {ActionbarAltSectionBtn} [sectionAlt.left] Alternate button config for the left section.
 * @property {ActionbarAltSectionBtn} [sectionAlt.center] Alternate button config for the center section.
 * @property {ActionbarAltSectionBtn} [sectionAlt.right] Alternate button config for the right section.
 */
export interface ActionBarProps extends ComponentProps {
    items: (ActionBarItemConfig | null)[];
    type?: 'default' | 'primary' | 'secondary';
    children?: React.ReactElement[];
    defaultPosition?: "left" | "center" | "right";
    modalAreaId?: string;
    sectionAlt?: {
        left?: ActionbarAltSectionBtn;
        center?: ActionbarAltSectionBtn;
        right?: ActionbarAltSectionBtn;
    };
}
/**
 * @typedef {object} AcctionBarSectionProps
 * @description Props for a specific section within the ActionBar (name contains a legacy typo).
 * @property {"left" | "center" | "right"} type The section type where items are displayed.
 * @property {(ActionBarItemConfig | null)[]} items The items to display in this section; nulls are ignored.
 * @property {string} [modalAreaId] Optional DOM id for rendering modals/portals from this section.
 * @property {string} [modalClassName] Optional class name applied to the section's modal container.
 * @property {ActionbarAltSectionBtn} [altIcon] Optional configuration for an alternate section button.
 */
export interface AcctionBarSectionProps {
    type: 'left' | 'center' | 'right';
    items: (ActionBarItemConfig | null)[];
    modalAreaId?: string;
    modalClassName?: string;
    altIcon?: ActionbarAltSectionBtn;
}
/**
 * @typedef {object} ActionBarSectionRef
 * @description Layout metrics and element reference for an ActionBar section.
 * @property {number} width The computed width of the section.
 * @property {HTMLElement | null} element The section's root HTML element.
 */
export type ActionBarSectionRef = {
    width: number;
    element: HTMLElement | null;
};
/**
 * @typedef {object} ActionBarAltSectionProps
 * @description Props for rendering alternate items for an ActionBar section.
 * @property {JSX.Element[]} items The list of alternate items to render.
 * @property {string} [title] Optional title for the alternate section view.
 * @property {string} [modalAreaId] Optional DOM id for modal/portal rendering.
 * @property {string} [modalClassName] Optional class name applied to the alternate modal container.
 * @property {ActionbarAltSectionBtn} [button] Optional button configuration that toggles the alternate view.
 */
export interface ActionBarAltSectionProps {
    items: JSX.Element[];
    title?: string;
    modalAreaId?: string;
    modalClassName?: string;
    button?: ActionbarAltSectionBtn;
}
/**
 * @typedef {object} ActionBarItemProps
 * @description Props for an individual ActionBar item, including layout behavior and alt content.
 * @property {React.ReactNode} item The renderable content for the item.
 * @property {string} [title] Optional title or tooltip for the item.
 * @property {number} [siblingWeight] Weight used to balance available space with siblings.
 * @property {boolean} [scale] Whether the item should expand to fill available space.
 * @property {number} [scaleFactor] Multiplier applied when scaling is enabled.
 * @property {JSX.Element} [alt] Alternate content for modal/alt views.
 * @property {string | number} uniqueKey Unique stable key for item diffing and refs.
 * @property {RefObject<HTMLDivElement | null | undefined>} sectionRef Ref to the parent section DOM element.
 * @property {(arg: any) => void} [setReady] Optional callback fired when the item is ready/mounted.
 */
export interface ActionBarItemProps {
    item: React.ReactNode;
    title?: string;
    siblingWeight?: number;
    scale?: boolean;
    scaleFactor?: number;
    alt?: JSX.Element;
    uniqueKey: string | number;
    sectionRef: RefObject<HTMLDivElement | null | undefined>;
    setReady?: (arg: any) => void;
}
/**
 * @typedef {object} ActionBarItemRef
 * @description Reference object for an action bar item, containing the element and its key.
 * @property {HTMLDivElement | null} element The DOM element of the item.
 * @property {string | number} key The unique key of the item.
 */
export type ActionBarItemRef = {
    element: HTMLDivElement | null;
    key: string | number;
};
/**
 * @typedef {object} ActionBarAltItemProps
 * @description Props for the alternative action bar item component.
 * @property {React.ReactNode} item The original item to be displayed in the modal.
 * @property {string} [title] The title for the modal.
 * @property {JSX.Element} [alt] An alternative element to use as a trigger.
 * @property {string} [modalAreaId] ID of the area where the modal should be rendered.
 */
export interface ActionBarAltItem {
    item: React.ReactNode;
    title?: string;
    alt?: JSX.Element;
    modalAreaId?: string;
}
