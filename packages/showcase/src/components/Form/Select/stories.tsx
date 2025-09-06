import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Select} from '@prismal/react';

const meta = {
    title: 'Commons/Form/Select',
    component: Select,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
}  as Meta<typeof Select >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    placeholder: 'Choose your favorite cuisine',
    options: [
        {
            element: "Italian cuisine",
            value: "italian"
        },
        {
            element: "Japanese cuisine",
            value: "japanese"
        },
        {
            element: "Mexican cuisine",
            value: "mexican"
        },
        {
            element: "Indian cuisine",
            value: "indian"
        }
    ]
};
