import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Toggle} from '@prismal/react';

const meta = {
    title: 'Commons/Form/Toggle',
    component: Toggle,
    argTypes: {
        type: { control: { type: 'select', options: ['switch', 'checkbox'] } },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    }
} as Meta<typeof Toggle>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        id: 'default',
        name: 'default',
        label: 'Puffed rice',
    }
}

export const Switch: Story = {
    args: {
        id: 'default',
        name: 'default',
        type: 'switch',
        label: 'Puffed rice',
    }
}

export const Required: Story = {
    args: {
        required: true,
        id: 'default',
        name: 'default',
        type: 'switch',
        label: 'Puffed rice',
    }
}