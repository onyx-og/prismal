import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from 'components/Card';

export default {
    title: 'Commons/Card',
    component: Card,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        cornerRadius: { control: 'select', options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"] },
        padding: { control: 'select', options: ['xs', "s", 'm', 'l'] }
    }
  } as ComponentMeta<typeof Card>;
  

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <div>Lorem ipsum</div>,
};