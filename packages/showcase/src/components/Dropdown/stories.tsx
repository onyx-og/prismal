import React from 'react';
import {Dropdown} from '@prismal/react';

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
        },
        type: {
            control: 'select',
            options: ["primary", "default"]
        }
    }
} as Meta<typeof Dropdown >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    toggleElement: <span>test dropdown</span>,
    children: <div>Hello</div>
};

export const Multiple: Story = {};
Multiple.args = {
    toggleElement: <span>test dropdown</span>,
    children:
       [ <input type='date' />,
        <span>Save the date!</span> ]
};