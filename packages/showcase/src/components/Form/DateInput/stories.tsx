import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateInput } from '@prismal/react';

const meta = {
    title: 'Commons/Form/DateInput',
    component: DateInput,
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
} as Meta<typeof DateInput>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    id: "eventDate",
    name: "eventDate",
    label: "Event date",
};

export const Inline: Story = {};
Inline.args = {
    id: "eventDate",
    name: "eventDate",
    label: "Event date",
    inline: true,
};

export const WithBounds: Story = {};
WithBounds.args = {
    id: "eventDate",
    name: "eventDate",
    label: "Event date",
    min: "2026-01-01",
    max: "2026-12-31",
};

export const Required: Story = {};
Required.args = {
    id: "eventDate",
    name: "eventDate",
    label: "Event date",
    required: true,
};
