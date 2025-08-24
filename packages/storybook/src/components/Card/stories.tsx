import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Card from 'components/Card';
import Button from 'components/Button';

import "./stories.scss";

const meta = {
    title: 'Commons/Card',
    component: Card,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        cornerRadius: { control: 'select', options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"] },
        padding: { control: 'select', options: ['xs', "s", 'm', 'l'] },
        elevation: { control: 'select', options: [0, 1, 2, 3, 4] }
    }
} as Meta<typeof Card >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    style: {
        maxWidth: "10rem"
    },
    children: <div>Lorem ipsum</div>,
    elevation: 1
};

export const WithHeader: Story = {};
WithHeader.args = {
    style: {
        maxWidth: "10rem"
    },
    header: <h3>Card title</h3>,
    children: <div>Lorem ipsum</div>,
    elevation: 1
};

export const HeaderAndFooter: Story = {};
HeaderAndFooter.args = {
    style: {
        maxWidth: "10rem"
    },
    header: <h3>Card title</h3>,
    children: <div>Lorem ipsum</div>,
    footer: <Button>Launch</Button>,
    elevation: 2
};

export const HorizontallyOriented: Story = {};
HorizontallyOriented.args = {
    style: {
        maxWidth: "30rem"
    },
    header: <h3>Card title</h3>,
    children: <div>Lorem ipsum</div>,
    footer: <Button>Launch</Button>,
    orientation: "horizontal"
};

export const Advanced: Story = {};
Advanced.args = {
    style: {
        maxWidth: "30rem"
    },
    header: <Card style={{
        position: 'absolute',
        top: -10,
        left: -10,
        width: "5rem",
        backgroundColor: "var(--color-primary-light)"
    }} elevation={2}>
        <span>Card title</span>
    </Card>,
    headerClass: "card-header-advanced",
    children: <div>Lorem ipsum</div>,
    footer: <Button>Launch</Button>,
    orientation: "horizontal"
};