import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Dropdown from 'components/Dropdown';

const meta = {
    title: 'Commons/Dropdown',
    component: Dropdown,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as Meta<typeof Dropdown >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    toggleElement: <h2>test dropdown</h2>,
    children: <div>Hello</div>
};

export const Multiple: Story = {};
Multiple.args = {
    toggleElement: <h2>test dropdown</h2>,
    children:
       [ <input type='date' />,
        <span>Save the date!</span> ]
};