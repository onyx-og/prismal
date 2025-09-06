import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Button, ButtonGroup} from '@prismal/react';

const meta = {
    title: 'Commons/ButtonGroup',
    component: ButtonGroup,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as Meta<typeof ButtonGroup >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Primary: Story = {};
Primary.args = {
    type: "primary",
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Vertical: Story = {};
Vertical.args = {
    orientation: "column",
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Elevated: Story = {};
Elevated.args = {
    orientation: "column",
    type: 'primary',
    elevation: 1,
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};