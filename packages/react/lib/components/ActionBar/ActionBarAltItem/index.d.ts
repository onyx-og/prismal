import { FC } from 'react';
import type { ActionBarAltItem } from "../types";
/**
 * @description By default, the alternative item for actionbar item is a button with icon as '...',
 * when clicked, it show's a modal with the original item as content.
 * If provided, uses a specific element as 'trigger'
 */
declare const ActionBarAltItem: FC<ActionBarAltItem>;
export default ActionBarAltItem;
