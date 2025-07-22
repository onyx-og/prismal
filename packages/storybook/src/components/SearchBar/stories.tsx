import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchBar from 'components/SearchBar';

export default {
    title: 'Commons/SearchBar',
    component: SearchBar,
    argTypes: {
        placeholder: { control: 'text' },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
  } as ComponentMeta<typeof SearchBar>;
  

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'test',
};
