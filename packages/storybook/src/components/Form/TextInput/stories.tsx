import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextInput from 'components/Form/TextInput';

export default {
    title: 'Commons/Form/TextInput',
    component: TextInput,
    argTypes: {
        type: { control: { type: 'select', options: ['text', 'email', 'password'] } },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'story',
    type: 'text',
    label: 'Your favorite color',
    placeholder: 'emerald red'
};

export const Email = Template.bind({});
Email.args = {
    name: 'story',
    type: 'email',
    label: 'Your email address',
};

export const Password = Template.bind({});
Email.args = {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '*******'
};


export const Inline = Template.bind({});
Inline.args = {
    name: 'inline-input',
    label: 'Your favorite color',
    type: 'text',
    inline: true,
    labelSeparator: ''
};

export const Required = Template.bind({});
Required.args = {
    name: 'story',
    type: 'text',
    label: 'Your favorite color',
    required: true,
};