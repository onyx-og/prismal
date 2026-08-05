import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from '@prismal/react';

const meta = {
    title: 'Commons/Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        separator: { control: 'select', options: ['none', 'slash', 'arrow', 'bullet', 'pipe', 'chevron', 'dash'] },
        padding: { control: 'select', options: ['none', 'xs', 's', 'm', 'l'] },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    items: [
        { label: 'Home', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Breadcrumb' },
    ],
};

export const ArrowSeparator: Story = {};
ArrowSeparator.args = {
    separator: 'arrow',
    items: [
        { label: 'Home', href: '/' },
        { label: 'Library', href: '/library' },
        { label: 'Recipe' },
    ],
};

export const Truncated: Story = {};
Truncated.args = {
    truncate: true,
    maxLabelWidth: 120,
    items: [
        { label: 'Home', href: '/' },
        { label: 'A very long section name that should truncate', href: '/section' },
        { label: 'Current page with an equally long title' },
    ],
};

export const CompoundChildren: Story = {};
CompoundChildren.args = {
    children: [
        <BreadcrumbItem href="/">Home</BreadcrumbItem>,
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>,
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>,
    ],
};
