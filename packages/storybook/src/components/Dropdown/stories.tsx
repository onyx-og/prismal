import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from 'components/Dropdown';

export default {
    title: 'Commons/Dropdown',
    component: Dropdown,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
    toggleElement: <h2>test dropdown</h2>,
    children: <div>Hello</div>
};

export const Multiple = Template.bind({});
Multiple.args = {
    toggleElement: <h2>test dropdown</h2>,
    children:
       [ <input type='date' />,
        <span>Save the date!</span> ]
};