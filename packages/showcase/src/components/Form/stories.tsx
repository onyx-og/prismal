import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Form, TextInput, NumberInput} from '@prismal/react';

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
    gridTemplate: "1fr 1fr",
    children: [
        <TextInput name="firstName" label='First name' />,
        <TextInput name="lastName" label='Last name' />,
        <TextInput name="email" label='Email' />,
        <NumberInput name="age" label='Age' />
    ],
};