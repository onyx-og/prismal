import type ComponentProps from "components/Component";
import { MutableRefObject, RefObject } from 'react';

export interface ActionBarItemConfig {
    item: React.ReactElement;
    position: "left" | "center" | "right";
    title?: string;
    key: string;
    scale?: boolean;
    alt?: JSX.Element;
}

export interface ActionBarProps extends ComponentProps {
    items: (ActionBarItemConfig | null)[];
    type?: 'default' | 'primary' | 'secondary';
    children?: React.ReactElement[];
    defaultPosition?: "left" | "center" | "right";
    modalAreaId?: string;
    sectionIcons?: {
        left?: string,
        center?: string,
        right?: string
    }
};

export interface AcctionBarSectionProps {
    type: 'left' | 'center' | 'right';
    items: (ActionBarItemConfig | null)[];
    modalAreaId?: string;
    altIcon?: string;
}
export type ActionBarSectionRef = {
    width: number;
    element: HTMLElement | null;
}

export interface ActionBarAltSectionProps {
    items: JSX.Element[];
    title?: string;
    modalAreaId?: string;
    iconName?: string;
}

export interface ActionBarItemProps {
    item: JSX.Element;
    title?: string;
    siblingWeight?: number;
    scale?: boolean;
    scaleFactor?: number;
    alt?: JSX.Element;
    uniqueKey: string | number;
    sectionRef: RefObject<HTMLDivElement | null | undefined>;
    setReady?: ( arg: any ) => void;
}

export type ActionBarItemRef = {
    element: HTMLDivElement | null;
    key: string | number;
}

export interface ActionBarAltItem {
    item: JSX.Element;
    title?: string;
    alt?: JSX.Element;
    modalAreaId?: string;
}