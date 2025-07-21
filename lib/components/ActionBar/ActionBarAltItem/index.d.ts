import React from 'react';
interface ActionBarAltItem {
    item: JSX.Element;
    title?: string;
    alt?: JSX.Element;
}
/**
 * @description By default, the alternative item for actionbar item is a button with icon as '...',
 * when clicked, it show's a modal with the original item as content.
 * If provided, uses a specific element as 'trigger'
 */
declare const ActionBarAltItem: React.FC<ActionBarAltItem>;
export default ActionBarAltItem;
