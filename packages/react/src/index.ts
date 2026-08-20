// Avoid using alias here.

import Container from "./components/Container";
import Text from "./components/Text";
import Icon from "./components/Icon";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";
import Select, { SelectOption } from "./components/Form/Select";
import TextInput from "./components/Form/TextInput";
import Toggle from "./components/Form/Toggle";
import NumberInput from "./components/Form/NumberInput";
import FileInput from "./components/Form/FileInput";
import Range from "./components/Form/Range";
import DateInput from "./components/Form/DateInput";
import DateInputCombo, { DateRange } from "./components/Form/DateInputCombo";
import Textarea, { TextareaProps } from "./components/Form/Textarea";
import Marquee from "./components/Marquee";
import Dropdown from "./components/Dropdown";
import Tooltip from "./components/Tooltip";
import Menu, {MenuItem, MenuItemData} from "./components/Menu"
import List from "./components/List";
import Masonry from "./components/Masonry";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import ActionBar from "./components/ActionBar";
import type {ActionBarItemConfig} from "./components/ActionBar/types";
import Alert from "./components/Alert";
import { setAccentStyle, hex2rgba } from "./utils/colors";
import Card, {CardProps} from "./components/Card";
import Slider, { SliderAnimation } from "./components/Slider";
import Header from "./components/Header";
import Table, { TableProps, TableRefType, CellData } from "./components/Table";
import Form from "./components/Form";
import {InputRefType} from "./components/Form/types";
import LazyItem from "./components/LazyItem";
import ParallaxItem from "./components/ParallaxItem";
import Pie from "./components/Pie";
import { Graph, GraphType } from "./components/Graph";
import Tabs from "./components/Tabs";
import Accordion from "./components/Accordion";
import View, { ViewItem } from "./components/View";
import Chip, { ChipProps } from "./components/Chip";
import Breadcrumb, { BreadcrumbItem, BreadcrumbProps, BreadcrumbItemProps, BreadcrumbItemConfig } from "./components/Breadcrumb";
import Gallery, { GalleryProps } from "./components/Gallery";
import Sandbox, { SandboxProps } from "./components/Sandbox";
import Canvas, {
    CanvasProps, CanvasOrientation,
    CanvasNode, NodeId, NodeShape, Point, ConnectionPoint, ConnectionPointSide,
    CircleNode, RectangleNode, RectangleVariant, ControlNode, UnionNode, LoopNode, LoopMode, EndNode,
    Connector, ConnectorId, ConnectorEndpoint,
    autoLayoutNodes, useAutoLayout, AutoLayoutOptions, UseAutoLayoutOptions,
    exportCanvasToJSON, importCanvasFromJSON, downloadCanvasJSON, CanvasImportError, CanvasDocument,
    NodeInspector, NodeInspectorProps,
    NodeEditor, NodeEditorProps, NodeDataField,
    useViewport, DEFAULT_VIEWPORT, Viewport, UseViewportOptions,
    ViewportControls, ViewportControlsProps,
    NodePalette, NodePaletteProps, defaultPaletteEntries, PaletteEntry,
} from "./components/Canvas";

import {
    useModal, useSidebar,
    useCursorPosition,
    useElementWidth, useElementHeight,
    useIntersectionObserver,
    useTransitionState,
    useElScrollThreshold, useElScrollPosition, useScrollThreshold,
    useBreakpoint
} from "hooks/";
import type { Breakpoint, UseBreakpointOptions, UseBreakpointResult } from "hooks/useBreakpoint";

export {Container, Text};
export {View, ViewItem};
export {Tabs, Accordion};
export {Pie};
export {Graph, GraphType};
export type { SelectOption };
export { ActionBar };
export type { ActionBarItemConfig };
export type { CardProps };
export { ButtonGroup, Button };
export { Slider };
export type { SliderAnimation };
export { Header };
export { Marquee };
export { Table };
export type { TableProps, TableRefType, CellData };
export { List, Masonry };
export { Gallery };
export type { GalleryProps };
export { Canvas };
export type {
    CanvasProps, CanvasOrientation,
    CanvasNode, NodeId, NodeShape, Point, ConnectionPoint, ConnectionPointSide,
    CircleNode, RectangleNode, RectangleVariant, ControlNode, UnionNode, LoopNode, LoopMode, EndNode,
    Connector, ConnectorId, ConnectorEndpoint,
    AutoLayoutOptions, UseAutoLayoutOptions,
    CanvasDocument,
};
export { autoLayoutNodes, useAutoLayout, exportCanvasToJSON, importCanvasFromJSON, downloadCanvasJSON, CanvasImportError };
export { NodeInspector, NodeEditor };
export type { NodeInspectorProps, NodeEditorProps, NodeDataField };
export { useViewport, DEFAULT_VIEWPORT, ViewportControls };
export type { Viewport, UseViewportOptions, ViewportControlsProps };
export { NodePalette, defaultPaletteEntries };
export type { NodePaletteProps, PaletteEntry };
export {Icon, Card, Modal, Alert, SearchBar, Sidebar};
export { Form, Select, TextInput, Toggle, NumberInput, FileInput, Range, DateInput, DateInputCombo, Textarea, InputRefType };
export type { DateRange, TextareaProps };
export { Dropdown, Tooltip };
export { Menu, MenuItem, MenuItemData };
export { LazyItem, ParallaxItem };
export { Chip };
export type { ChipProps };
export { Breadcrumb, BreadcrumbItem };
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbItemConfig };

export { setAccentStyle, hex2rgba };

// Dev-only tooling, grouped under a namespace rather than exported flat since it's not
// part of the design system itself (e.g. Sandbox is a docs/playground utility).
export const Dev = { Sandbox };
export type { SandboxProps };
export {
    useIntersectionObserver,
    useElementWidth,
    useElementHeight,
    useCursorPosition,
    useModal, useSidebar,
    useTransitionState,
    useElScrollThreshold, useElScrollPosition, useScrollThreshold,
    useBreakpoint
}
export type { Breakpoint, UseBreakpointOptions, UseBreakpointResult };