import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from 'components/Card';
import Slider from 'components/Slider';

export default {
    title: 'Commons/Slider',
    component: Slider,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
  } as ComponentMeta<typeof Slider>;
  

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
    type: "raw",
    children: [<div>Lorem ipsum</div>, <div>Lorem ipsum 2</div>],
};