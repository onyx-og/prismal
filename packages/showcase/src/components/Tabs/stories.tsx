import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Tabs, Card} from '@prismal/react';

const meta = {
    title: 'Commons/Tabs',
    component: Tabs,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
}  as Meta<typeof Tabs >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {args: {
    data: [
        { name: "tab1", label: "Tab 1" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3" },
    ],
    children: [
        <Card elevation={0} key="c1" data-tab="tab1">
            First tab content
        </Card>,
        <Card elevation={0} key="c2" data-tab="tab2">
            Second tab content
        </Card>,
        <Card elevation={0} key="c3" data-tab="tab3">
            Third tab content
        </Card>,
    ]
}};

export const TabsOnly: Story = {};
TabsOnly.args = {
    data: [
        { name: "tab1", label: "Tab 1" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3" },
    ],
};