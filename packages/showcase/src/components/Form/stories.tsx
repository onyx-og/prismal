import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Form from 'components/Form';
import TextInput from 'components/Form/TextInput';

const meta = {
    title: 'Commons/Form',
    component: Form,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    onSubmit: (formData: {}) => console.log("Form story data", {data: formData}),
    children: [
        <div>An element</div>,
        undefined,
        <TextInput name="lastName" label='Last name' />
    ],
};