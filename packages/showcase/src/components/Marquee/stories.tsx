import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Marquee } from '@prismal/react';
import './stories.scss';

const meta = {
    title: 'Commons/Marquee',
    component: Marquee,
    argTypes: {
        pauseOnHover: { control: 'boolean' },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as Meta<typeof Marquee>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    speed: 8,
    children: <div className="marquee-item-row">
        <span>Prismal</span><span>React</span><span>Components</span><span>Marquee</span><span>Showcase</span>
    </div>,
};

export const PerBreakpointSpeed: Story = {};
PerBreakpointSpeed.args = {
    speed: { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 },
    children: <div className="marquee-item-row">
        <span>Resize the viewport</span><span>to see the</span><span>scroll speed change</span><span>per breakpoint</span>
    </div>,
};

export const PausedOnHover: Story = {};
PausedOnHover.args = {
    speed: 6,
    pauseOnHover: true,
    children: <div className="marquee-item-row">
        <span>Hover over me</span><span>to pause</span><span>the animation</span>
    </div>,
};
