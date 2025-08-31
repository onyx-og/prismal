import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import NumberInput from 'components/Form/NumberInput';
import Button from 'components/Button';

const meta = {
    title: 'Commons/Form/NumberInput',
    component: NumberInput,
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
} as Meta<typeof NumberInput>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    id: "avgSteps",
    name: "avgSteps",
    label: "Avarage steps",
    placeholder: 10,
    after: <Button type='text' readOnly>per day</Button>,
};

export const Inline: Story = {};
Inline.args = {
    id: "avgSteps",
    name: "avgSteps",
    label: "Avarage steps",
    inline: true,
    placeholder: 10,
    after: <Button type='text' readOnly>per day</Button>,
};

export const Required: Story = {};
Required.args = {
    id: "avgSteps",
    name: "avgSteps",
    label: "Avarage steps",
    placeholder: 10,
    after: <Button type='text' readOnly>per day</Button>,
    required: true,
};