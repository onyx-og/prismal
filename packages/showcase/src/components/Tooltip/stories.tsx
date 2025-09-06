import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Tooltip} from '@prismal/react';

const meta = {
    title: 'Commons/Tooltip',
    component: Tooltip,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as Meta<typeof Tooltip >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    children: <div>Hello</div>,
    text: "Did you just hover me?"
};
