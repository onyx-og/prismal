/// <reference types="react" />
import './index.scss';
import type { ActionBarItemConfig, ActionBarProps, ActionBarRef } from './types';
/**
 * @component ActionBar
 * @description A flexible bar for actions and navigation, divided into left, center, and right sections.
 * @param {ActionBarProps} props The component props.
 * @param {React.Ref<ActionBarRef>} ref Forwarded ref to the ActionBar's managed DOM nodes.
 * @returns {JSX.Element} The rendered ActionBar component.
 * @example
 * <ActionBar items={[{ item: <Button>Action</Button>, position: 'right', key: 'action1' }]} />
 */
declare const ActionBar: import("react").ForwardRefExoticComponent<ActionBarProps & import("react").RefAttributes<ActionBarRef>>;
export default ActionBar;
export type { ActionBarItemConfig };
