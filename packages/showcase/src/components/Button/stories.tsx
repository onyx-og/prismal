import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from 'components/Button';
import 'components/Button/index.scss';

const meta = {
  title: 'Commons/Button',
  component: Button,
  argTypes: {
    accent: { control: 'color' },
    accentDark: { control: 'color' },
    accentLight: { control: 'color' },
    borderRadius: {
      control: 'select',
      options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
    }
  }
}  as Meta<typeof Button >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
  type: 'default',
  children: 'Button',
};

export const Primary: Story = {};
Primary.args = {
  type: 'primary',
  children: 'Button',
};

export const Elevated: Story = {};
Elevated.args = {
  type: 'primary',
  children: 'Button',
  elevation: 1,
};

export const Text: Story = {};
Text.args = {
  type: 'text',
  children: 'Button',
};

export const Icon: Story = {};
Icon.args = {
  type: 'primary',
  iconName: 'info',
  shape: 'circle',
}
