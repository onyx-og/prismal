import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip from 'components/Tooltip';

export default {
    title: 'Commons/Tooltip',
    component: Tooltip,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <div>Hello</div>,
    text: "Did you just hover me?"
};
