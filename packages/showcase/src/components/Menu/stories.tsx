import { Menu, MenuItem } from '@prismal/react';
import type {MenuItemData} from "@prismal/react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: 'Commons/Menu',
    component: Menu,
    argTypes: {
        spacing: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl']
        }
    }
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

const menuData: MenuItemData[] = [
    { label: "Dashboard", onClick: () => console.log("Dashboard") },
    { 
        label: "Settings", 
        items: [
            { label: "Profile" },
            { label: "Security" },
            { 
                label: "Theme",
                items: [
                    { label: "Light" },
                    { label: "Dark" }
                ]
            }
        ]
    },
    { label: "Logout" }
];

export const Default: Story = {
    args: {
        data: menuData,
        style: { width: '250px', border: '1px solid #e5e7eb' }
    }
};

export const SpacingLarge: Story = {
    args: {
        ...Default.args,
        spacing: 'xl'
    }
};

export const Composed: Story = {
    render: (args) => (
        <Menu {...args} style={{ width: '250px', border: '1px solid #e5e7eb' }}>
            <MenuItem label="Home" />
            <MenuItem label="Library">
                <Menu spacing={args.spacing}>
                    <MenuItem label="Recent" />
                    <MenuItem label="Favorites" />
                </Menu>
            </MenuItem>
            <MenuItem label="Community" />
        </Menu>
    )
};