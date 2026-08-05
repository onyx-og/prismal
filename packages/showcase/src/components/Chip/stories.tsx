import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@prismal/react';

const meta = {
    title: 'Commons/Chip',
    component: Chip,
    argTypes: {
        type: { control: 'select', options: ['default', 'primary', 'text'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    label: 'Beta Version',
};

export const Primary: Story = {};
Primary.args = {
    type: 'primary',
    label: 'Approved',
    iconName: 'check',
};

export const Text: Story = {};
Text.args = {
    type: 'text',
    label: 'Archived',
};

export const WithIcon: Story = {};
WithIcon.args = {
    type: 'primary',
    label: 'Starred',
    iconName: 'star',
};

export const Sizes: Story = {};
Sizes.args = {
    label: 'Large chip',
    size: 'lg',
};

export const Elevated: Story = {};
Elevated.args = {
    label: 'Elevated',
    elevation: 2,
};
