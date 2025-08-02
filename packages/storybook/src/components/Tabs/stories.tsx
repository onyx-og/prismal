import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from 'components/Tabs';

export default {
    title: 'Commons/Tabs',
    component: Tabs,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as ComponentMeta<typeof Tabs>;
  

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [
        { name: "tab1", label: "Tab 1" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3" },
    ],
    children: [
        <div key="c1" data-tab="tab1">
            First tab content
        </div>,
        <div key="c2" data-tab="tab2">
            Second tab content
        </div>,
        <div key="c3" data-tab="tab3">
            Third tab content
        </div>,
    ]
};

export const TabsOnly = Template.bind({});
TabsOnly.args = {
    data: [
        { name: "tab1", label: "Tab 1" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3" },
    ],
};