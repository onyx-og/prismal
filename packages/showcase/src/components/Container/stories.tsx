import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Container from 'components/Container';
import 'components/Container/index.scss';

import "./stories.scss";

const meta = {
    title: 'Commons/Container',
    component: Container,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as Meta<typeof Container>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    children: <div className='prismal-sc-div'>I have a 5-2 ratio, span 8 and hide on small viewports</div>,
    ratio: "5-2",
    span: 8,
    hide: {
        md: true
    }
};
