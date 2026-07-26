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

/**
 * `variant="nav"` for bars that sit in front of content that's already all present —
 * a scrollspy nav, in-page jump links — rather than switching which panel exists.
 * Renders as a `<nav>` of buttons with `aria-current` instead of a tablist implying
 * hidden panels. Shown here controlled, since that's how a scrollspy bar has to work:
 * something other than a click (scroll position) decides the active item.
 */
export const NavVariant: Story = {
    render: (args) => {
        const [selected, setSelected] = React.useState<string | number>("tab1");
        return (
            <Tabs
                {...args}
                selected={selected}
                onChange={setSelected}
            />
        );
    },
};
NavVariant.args = {
    variant: "nav",
    navLabel: "Sections",
    data: [
        { name: "tab1", label: "Tab 1" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3" },
    ],
};