import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Slider} from '@prismal/react';
import "./stories.scss";

const meta = {
    title: 'Commons/Slider',
    component: Slider,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        showNavBar: { control: 'boolean', defaultValue: 'true'}
    }
};


export default meta;

export const Default = {};
Default.args = {
    type: "raw",
    autoPlay: 2000,
    spacing: 1,
    children: [<div className='slide-container'>Lorem ipsum</div>, 
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const Processed = {};
Processed.args = {
  type: 'process',
  slides: [1,2,3],
  autoPlay: 3000,
  slideWrapper: (slide) => {
    return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
  }
};

export const SlideSizeXL = {};
SlideSizeXL.args = {
    type: "raw",
    spacing: 1,
    size: "xl",
    children: [<div className='slide-container'>Lorem ipsum</div>, 
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const SlideSizeS = {};
SlideSizeS.args = {
    type: "process",
    spacing: 1,
    size: "s",
    slides: [1,2,3,4,5,6],
    slideWrapper: (slide) => {
        return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
    }
};

export const SlideSizeM = {};
SlideSizeM.args = {
    type: "process",
    spacing: 1,
    size: "m",
    slides: [1,2,3,4,5,6],
    slideWrapper: (slide) => {
        return <div className='slide-container'>{`Lorem ipsum ${slide}`}</div>
    }
};