import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, Icon } from '@prismal/react';
import type { MenuItemData } from '@prismal/react';

const meta = {
    title: 'Commons/ContextMenu',
    component: ContextMenu,
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const items: MenuItemData[] = [
    { label: 'Rename', icon: <Icon name="edit" />, onClick: () => alert('Rename') },
    { label: 'Duplicate', icon: <Icon name="files-o" />, onClick: () => alert('Duplicate') },
    {
        label: 'Move to',
        icon: <Icon name="folder" />,
        items: [
            { label: 'Archive', onClick: () => alert('Move to Archive') },
            { label: 'Trash', onClick: () => alert('Move to Trash') },
        ],
    },
    { label: 'Delete', icon: <Icon name="trash" />, onClick: () => alert('Delete') },
];

const boxStyle: React.CSSProperties = {
    width: 320,
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #cbd5e1',
    borderRadius: 8,
    color: '#64748b',
    userSelect: 'none',
};

/** Right-click the box to open the menu at the cursor. "Move to" opens a submenu on hover; any other item closes the menu on click; clicking outside or Escape also closes it. */
export const Default: Story = {
    render: () => (
        <div style={boxStyle}>
            <ContextMenu items={items}>
                <span>Right-click anywhere in this box</span>
            </ContextMenu>
        </div>
    ),
};

/** `disabled` lets the trigger fall back to the browser's native context menu. */
export const Disabled: Story = {
    render: () => (
        <div style={boxStyle}>
            <ContextMenu items={items} disabled>
                <span>Right-click falls back to the native menu here</span>
            </ContextMenu>
        </div>
    ),
};
