import type ComponentProps from "../Component";
import type React from 'react';
import type { RefObject, JSX } from 'react';

/**
 * @typedef {object} ActionBarItemConfig
 * @description Configuration for a single item displayed within the ActionBar.
 */
export interface ActionBarItemConfig {
	/** The renderable content for the item. */
	item: React.ReactNode;
	/** The section of the ActionBar where this item should appear. */
	position: "left" | "center" | "right";
	/** Optional title used for accessibility or tooltips. */
	title?: string;
	/** Unique identifier for the item. */
	key: string;
	/** Whether the item should scale to fill available space. */
	scale?: boolean;
	/** Optional alternate element shown in an "alt" state or modal. */
	alt?: JSX.Element;
}

/**
 * @typedef {object} ActionBarRef
 * @description DOM references managed by the ActionBar for layout and measurements.
 */
export interface ActionBarRef {
	/** The lowest-level managed DOM nodes (e.g., item containers). */
	lowNode: (HTMLDivElement | null)[], // lowest managed DOM node(s)
	/** The high-level container DOM node. */
	highNode: HTMLDivElement | null;
}

/**
 * @typedef {object} ActionBarItemWithRefProps
 * @description Props for an ActionBar item wrapper that forwards refs.
 */
export interface ActionBarItemWithRefProps {
	/** Optional children to render within the wrapper. */
	children?: React.ReactNode;
}

/**
 * @typedef {object} ActionbarAltSectionBtn
 * @description Configuration for an alternate section button in the ActionBar.
 */
export type ActionbarAltSectionBtn = {
	/** The icon name used for the button. */
	iconName: string;
	/** The visual style of the button. */
	type: "default" | "primary" | "text"
}

/**
 * @typedef {object} ActionBarProps
 * @description Props for the ActionBar component. Inherits common component props from ComponentProps.
 */
export interface ActionBarProps extends ComponentProps {
	/** The list of items to render in the bar; nulls are ignored. */
	items: (ActionBarItemConfig | null)[];
	/** Visual style variant for the ActionBar. */
	type?: 'default' | 'primary' | 'secondary';
	/** Optional React elements rendered within the ActionBar. */
	children?: React.ReactElement[];
	/** Default section for items without explicit position. */
	defaultPosition?: "left" | "center" | "right";
	/** Optional DOM id where modals/portals should render. */
	modalAreaId?: string;
	/** Optional alternate action buttons for sections. */
	sectionAlt?: {
		/** Alternate button config for the left section. */
		left?: ActionbarAltSectionBtn,
		/** Alternate button config for the center section. */
		center?: ActionbarAltSectionBtn
		/** Alternate button config for the right section. */
		right?: ActionbarAltSectionBtn
	}
};

/**
 * @typedef {object} AcctionBarSectionProps
 * @description Props for a specific section within the ActionBar (name contains a legacy typo).
 */
export interface AcctionBarSectionProps {
	/** The section type where items are displayed. */
	type: 'left' | 'center' | 'right';
	/** The items to display in this section; nulls are ignored. */
	items: (ActionBarItemConfig | null)[];
	/** Optional DOM id for rendering modals/portals from this section. */
	modalAreaId?: string;
	/** Optional class name applied to the section's modal container. */
	modalClassName?: string;
	/** Optional configuration for an alternate section button. */
	altIcon?: ActionbarAltSectionBtn;
}

/**
 * @typedef {object} ActionBarSectionRef
 * @description Layout metrics and element reference for an ActionBar section.
 */
export type ActionBarSectionRef = {
	/** The computed width of the section. */
	width: number;
	/** The section's root HTML element. */
	element: HTMLElement | null;
}

/**
 * @typedef {object} ActionBarAltSectionProps
 * @description Props for rendering alternate items for an ActionBar section.
 */
export interface ActionBarAltSectionProps {
	/** The list of alternate items to render. */
	items: JSX.Element[];
	/** Optional title for the alternate section view. */
	title?: string;
	/** Optional DOM id for modal/portal rendering. */
	modalAreaId?: string;
	/** Optional class name applied to the alternate modal container. */
	modalClassName?: string;
	/** Optional button configuration that toggles the alternate view. */
	button?: ActionbarAltSectionBtn;
}

/**
 * @typedef {object} ActionBarItemProps
 * @description Props for an individual ActionBar item, including layout behavior and alt content.
 */
export interface ActionBarItemProps {
	/** The renderable content for the item. */
	item: React.ReactNode;
	/** Optional title or tooltip for the item. */
	title?: string;
	/** Weight used to balance available space with siblings. */
	siblingWeight?: number;
	/** Whether the item should expand to fill available space. */
	scale?: boolean;
	/** Multiplier applied when scaling is enabled. */
	scaleFactor?: number;
	/** Alternate content for modal/alt views. */
	alt?: JSX.Element;
	/** Unique stable key for item diffing and refs. */
	uniqueKey: string | number;
	/** Ref to the parent section DOM element. */
	sectionRef: RefObject<HTMLDivElement | null | undefined>;
	/** Optional callback fired when the item is ready/mounted. */
	setReady?: (arg: any) => void;
}

/**
 * @typedef {object} ActionBarItemRef
 * @description Reference object for an action bar item, containing the element and its key.
 */
export type ActionBarItemRef = {
	/** The DOM element of the item. */
	element: HTMLDivElement | null;
	/** The unique key of the item. */
	key: string | number;
}

/**
 * @typedef {object} ActionBarAltItemProps
 * @description Props for the alternative action bar item component.
 */
export interface ActionBarAltItem {
	/** The original item to be displayed in the modal. */
	item: React.ReactNode;
	/** The title for the modal. */
	title?: string;
	/** An alternative element to use as a trigger. */
	alt?: JSX.Element;
	/** ID of the area where the modal should be rendered. */
	modalAreaId?: string;
}