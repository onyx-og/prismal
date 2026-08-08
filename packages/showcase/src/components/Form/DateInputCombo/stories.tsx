import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateInputCombo } from '@prismal/react';

const meta = {
    title: 'Commons/Form/DateInputCombo',
    component: DateInputCombo,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        },
        inline: { control: "boolean" },
    }
} as Meta<typeof DateInputCombo>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    id: "stay",
    name: "stay",
    label: "Stay dates",
};

export const Inline: Story = {};
Inline.args = {
    id: "stay",
    name: "stay",
    label: "Stay dates",
    inline: true,
};

export const WithBounds: Story = {};
WithBounds.args = {
    id: "stay",
    name: "stay",
    label: "Stay dates",
    min: "2026-01-01",
    max: "2026-12-31",
};

export const Required: Story = {};
Required.args = {
    id: "stay",
    name: "stay",
    label: "Stay dates",
    required: true,
};
