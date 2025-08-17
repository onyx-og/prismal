import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput from 'components/Form/TextInput';

export default {
    title: 'Commons/Form/TextInput',
    component: TextInput,
    argTypes: {
        htmlType: { control: { htmlType: 'select', options: ['text', 'email', 'password'] } },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'story',
    htmlType: 'text',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'story',
    htmlType: 'text',
    type: 'primary',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Password = Template.bind({});
Password.args = {
    name: 'password',
    htmlType: 'password',
    label: 'Password',
    placeholder: '*******'
};


export const Inline = Template.bind({});
Inline.args = {
    name: 'inline-input',
    label: 'Your favorite color',
    htmlType: 'text',
    inline: true,
    labelSeparator: ''
};

export const Required = Template.bind({});
Required.args = {
    name: 'story',
    htmlType: 'text',
    label: 'Your favorite color',
    required: true,
};