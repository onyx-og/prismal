import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from 'components/Card';
import Button from 'components/Button';

export default {
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
  } as ComponentMeta<typeof Card>;
  

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    style: {
        maxWidth: "10rem"
    },
    children: <div>Lorem ipsum</div>,
    elevation: 1
};

export const WithHeader = Template.bind({});
WithHeader.args = {
    style: {
        maxWidth: "10rem"
    },
    header: <h3>Card title</h3>,
    children: <div>Lorem ipsum</div>,
    elevation: 1
};

export const HeaderAndFooter = Template.bind({});
HeaderAndFooter.args = {
    style: {
        maxWidth: "10rem"
    },
    header: <h3>Card title</h3>,
    children: <div>Lorem ipsum</div>,
    footer: <Button>Launch</Button>,
    elevation: 2
};