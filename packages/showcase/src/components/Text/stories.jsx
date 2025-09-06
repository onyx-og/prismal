import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Text} from '@prismal/react';

const meta = {
    title: 'Commons/Text',
    component: Text,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
}


export default meta;

export const BodyExtraSmall = {};
BodyExtraSmall.args = {
    type: "body",
    children: "Typography",
    size: "xs"
};
export const BodySmall = {};
BodySmall.args = {
    type: "body",
    children: "Typography",
    size: "sm"
};
export const BodyMedium = {};
BodyMedium.args = {
    type: "body",
    children: "Typography",
    size: "md"
};
export const BodyLarge = {};
BodyLarge.args = {
    type: "body",
    children: "Typography",
    size: "lg"
};
export const BodyExtraLarge = {};
BodyExtraLarge.args = {
    type: "body",
    children: "Typography",
    size: "xl"
};

export const BodyExtremelyLarge = {};
BodyExtremelyLarge.args = {
    type: "body",
    children: "Typography",
    size: "xxl"
};

export const Heading1 = {};
Heading1.args = {
    type: "heading",
    children: "Heading level 1",
    level: 1
};

export const Heading2 = {};
Heading2.args = {
    type: "heading",
    children: "Heading level 2",
    level: 2
};

export const Heading3 = {};
Heading3.args = {
    type: "heading",
    children: "Heading level 3",
    level: 3
};

export const Heading4 = {};
Heading4.args = {
    type: "heading",
    children: "Heading level 4",
    level: 4
};

export const Heading5 = {};
Heading5.args = {
    type: "heading",
    children: "Heading level 5",
    level: 5
};

export const Heading6 = {};
Heading6.args = {
    type: "heading",
    children: "Heading level 6",
    level: 6
};

