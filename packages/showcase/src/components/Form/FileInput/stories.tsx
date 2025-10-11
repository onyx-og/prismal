import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {FileInput, Button} from '@prismal/react';

const meta = {
    title: 'Commons/Form/FileInput',
    component: FileInput,
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
} as Meta<typeof FileInput>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    id: "fileInput",
    name: "fileInput",
    label: "Choose a file",
};

export const Inline: Story = {};
Inline.args = {
    id: "fileInput",
    name: "fileInput",
    label: "Choose a text file",
    accept: ".txt, .doc, .docx, .rtf",
    inline: true,
};

export const Required: Story = {};
Required.args = {
    id: "fileInput",
    name: "fileInput",
    label: "Choose an image file",
    accept: ".png, .jpg, .jpeg, .gif",
    required: true,
};