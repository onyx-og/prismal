import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

export default {
    title: 'Commons/ButtonGroup',
    component: ButtonGroup,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => <ButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Primary = Template.bind({});
Primary.args = {
    type: "primary",
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Vertical = Template.bind({});
Vertical.args = {
    orientation: "column",
    children: [
        <Button>First</Button>,
        <Button>Second</Button>,
        <Button>Third</Button>,
    ],
};

export const Elevated = Template.bind({});
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