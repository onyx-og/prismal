import React from 'react';
import { ActionBarItemConfig } from 'components/ActionBar';
import './index.scss';
interface AcctionBarSectionProps {
    type: 'left' | 'center' | 'right';
    items: (ActionBarItemConfig | null)[];
}
export type ActionBarSectionRef = {
    width: number;
    element: HTMLElement | null;
};
declare const ActionBarSection: React.FC<AcctionBarSectionProps>;
export default ActionBarSection;
