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
        showNavBar: { control: 'boolean', defaultValue: 'true'}
    }
  } as ComponentMeta<typeof Slider>;
  

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
    type: "raw",
    autoPlay: 2000,
    spacing: 1,
    children: [<div className='slide-container'>Lorem ipsum</div>, 
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const Processed = Template.bind({});
Processed.args = {
  type: 'process',
  slides: [1,2,3],
  autoPlay: 3000,
  slideWrapper: (slide) => {
    return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
  }
};

export const SlideSizeXL = Template.bind({});
SlideSizeXL.args = {
    type: "raw",
    spacing: 1,
    size: "xl",
    children: [<div className='slide-container'>Lorem ipsum</div>, 
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const SlideSizeS = Template.bind({});
SlideSizeS.args = {
    type: "process",
    spacing: 1,
    size: "s",
    slides: [1,2,3,4,5,6],
    slideWrapper: (slide) => {
        return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
    }
};

export const SlideSizeM = Template.bind({});
SlideSizeM.args = {
    type: "process",
    spacing: 1,
    size: "m",
    slides: [1,2,3,4,5,6],
    slideWrapper: (slide) => {
        return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
    }
};