import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from 'components/Button';

export default {
  title: 'Commons/Button',
  component: Button,
  argTypes: {
    accent: { control: 'color' },
    accentDark: { control: 'color' },
    accentLight: { control: 'color' },
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Button',
};

export const Elevated = Template.bind({});
Elevated.args = {
  type: 'primary',
  children: 'Button',
  elevation: 1,
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  children: 'Button',
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'primary',
  iconName: 'info',
  shape: 'circle',
}
