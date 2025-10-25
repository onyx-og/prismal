import { FC } from 'react';
import type { ActionBarAltItem as ActionBarAltItemProps } from "../types";
/**
 * @component ActionBarAltItem
 * @description By default, the alternative item for an action bar item is a button with an ellipsis icon. When clicked, it shows a modal with the original item as content. If an alternative element (`alt`) is provided, it is used as the trigger instead.
 * @param {ActionBarAltItemProps} props The component props.
 * @returns {React.ReactElement} The rendered alternative action bar item.
 */
declare const ActionBarAltItem: FC<ActionBarAltItemProps>;
export default ActionBarAltItem;
