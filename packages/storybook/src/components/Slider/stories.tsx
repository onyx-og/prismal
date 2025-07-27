import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from 'components/Card';
import Slider from 'components/Slider';
import "./stories.scss";

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
    spacing: 1,
    children: [<div className='slide-container'>Lorem ipsum</div>, 
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};