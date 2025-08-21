import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from 'components/Form/Select';

export default {
    title: 'Commons/Form/Select',
    component: Select,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Choose your favorite cuisine',
    options: [
        {
            element: "Italian cuisine",
            value: "italian"
        },
        {
            element: "Japanese cuisine",
            value: "japanese"
        },
        {
            element: "Mexican cuisine",
            value: "mexican"
        },
        {
            element: "Indian cuisine",
            value: "indian"
        }
    ]
};
