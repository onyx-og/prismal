import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TextInput from 'components/Form/TextInput';

const meta = {
    title: 'Commons/Form/TextInput',
    component: TextInput,
    argTypes: {
        htmlType: { control: { htmlType: 'select', options: ['text', 'email', 'password'] } },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
}  as Meta<typeof TextInput >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    name: 'story',
    htmlType: 'text',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Primary: Story = {};
Primary.args = {
    name: 'story',
    htmlType: 'text',
    type: 'primary',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Password: Story = {};
Password.args = {
    name: 'password',
    htmlType: 'password',
    label: 'Password',
    placeholder: '*******'
};


export const Inline: Story = {};
Inline.args = {
    name: 'inline-input',
    label: 'Your favorite color',
    htmlType: 'text',
    inline: true,
    labelSeparator: ''
};

export const Required: Story = {};
Required.args = {
    name: 'story',
    htmlType: 'text',
    label: 'Your favorite color',
    required: true,
};