import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {SearchBar} from '@prismal/react';

const meta = {
    title: 'Commons/SearchBar',
    component: SearchBar,
    argTypes: {
        placeholder: { control: 'text' },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        btnPosition: {
            control: { type: 'select' },
            options: [
                "inner-after",
                "inner-before",
                "outer-after",
                "outer-before"
            ]
        }
    }
} as Meta<typeof SearchBar >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    placeholder: 'Search',
};

export const InnerAfter: Story = {};
InnerAfter.args = {
    placeholder: 'test',
    btnPosition: "inner-after"
};

export const Primary: Story = {};
Primary.args = {
    placeholder: 'test',
    type: "primary"
};