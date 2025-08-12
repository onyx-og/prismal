import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toggle from 'components/Form/Toggle';

export default {
    title: 'Commons/Form/Toggle',
    component: Toggle,
    argTypes: {
        type: { control: { type: 'select', options: ['switch', 'checkbox'] } },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    }
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 'default',
    name: 'default',
    type: 'switch',
    label: 'Puffed rice',
};
