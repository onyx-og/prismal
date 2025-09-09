import type ComponentProps from "../Component";
import { RefObject } from 'react';
export interface ActionBarItemConfig {
    item: React.ReactNode;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}
export interface ActionBarRef {
    lowNode: (HTMLDivElement | undefined)[];
    highNode: HTMLDivElement | undefined;
}
export interface ActionBarItemWithRefProps {
    children?: React.ReactNode;
}
export type ActionbarAltSectionBtn = {
    iconName: string;
    type: "default" | "primary" | "text";
};
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
export interface AcctionBarSectionProps {
    type: 'left' | 'center' | 'right';
    items: (ActionBarItemConfig | null)[];
    modalAreaId?: string;
    modalClassName?: string;
    altIcon?: ActionbarAltSectionBtn;
}
export type ActionBarSectionRef = {
    width: number;
    element: HTMLElement | null;
};
export interface ActionBarAltSectionProps {
    items: JSX.Element[];
    title?: string;
    modalAreaId?: string;
    modalClassName?: string;
    button?: ActionbarAltSectionBtn;
}
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
export type ActionBarItemRef = {
    element: HTMLDivElement | null;
    key: string | number;
};
export interface ActionBarAltItem {
    item: React.ReactNode;
    title?: string;
    alt?: JSX.Element;
    modalAreaId?: string;
}
