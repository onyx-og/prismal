import React, { useState } from 'react';
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
        showNavBar: { control: 'boolean', defaultValue: 'true'},
        animation: {
            control: 'select',
            options: ['ease', 'bounce', 'linear', 'none']
        }
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

export const Vertical = {};
Vertical.args = {
    type: "raw",
    orientation: "vertical",
    spacing: 1,
    size: "m",
    children: [<div className='slide-container'>Lorem ipsum</div>,
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const BounceAnimation = {};
BounceAnimation.args = {
    type: "raw",
    spacing: 1,
    animation: "bounce",
    children: [<div className='slide-container'>Lorem ipsum</div>,
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const LinearAnimation = {};
LinearAnimation.args = {
    type: "raw",
    spacing: 1,
    animation: "linear",
    children: [<div className='slide-container'>Lorem ipsum</div>,
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const NoAnimation = {};
NoAnimation.args = {
    type: "raw",
    spacing: 1,
    animation: "none",
    children: [<div className='slide-container'>Lorem ipsum</div>,
        <div className='slide-container'>Lorem ipsum 2</div>, <div className='slide-container'>Lorem ipsum 3</div>]
};

export const Controlled = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div>
            <p>Currently on slide {selected + 1}</p>
            <Slider
                type="raw"
                spacing={1}
                selected={selected}
                onChange={setSelected}
            >
                <div className='slide-container'>Lorem ipsum</div>
                <div className='slide-container'>Lorem ipsum 2</div>
                <div className='slide-container'>Lorem ipsum 3</div>
            </Slider>
        </div>
    );
};