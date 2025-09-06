import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Container} from '@prismal/react';
// import 'components/Container/index.scss';

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
    children: <div className='prismal-sc-div'>I have a 5-2 ratio, span 8 and hide on medium viewports</div>,
    ratio: "5-2",
    span: 8,
    hide: {
        md: true
    }
};

export const HideMediumNotSmall: Story = {
    args: {
        children: <div className='prismal-sc-div'>I hide on medium viewport but not on small ones</div>,
        ratio: "16-9",
        span: 6,
        hide: {
            sm: false,
            md: true
        }
    }
}

export const SpecificRatio: Story = {
    args: {
        children: <div className='prismal-sc-div'>I have a 16-9 ratio</div>,
        span: 6,
        ratio: "5-2",
    }
}
