import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ActionBar from 'components/ActionBar';
import Button from 'components/Button';

export default {
    title: 'Commons/ActionBar',
    component: ActionBar,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
  } as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args) => <ActionBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'primary',
  position: 'top',
  items: [
    {item: <span>Test</span>, position: 'center', key: '1'},
    {item: <Button iconName="search" type='primary'/>, position: 'right', key: '2'}
  ]
};
