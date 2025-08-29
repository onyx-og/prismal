import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Pie from '../../../../../src/components/Pie';

const meta = {
  title: 'Commons/Pie',
  component: Pie,
  argTypes: {
    accent: { control: 'color' },
    accentDark: { control: 'color' },
    accentLight: { control: 'color' },
    borderRadius: {
      control: 'select',
      options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
    }
  }
}  as Meta<typeof Pie >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
  data: [
    {label: "Strawberry pie lovers", name: "strawberry", percentage: 30, color: "red"},
    {label: "Supporters of cheesecakes", name:"cheesecakes", percentage: 35, color: "yellow"},
    {label: "Apple-pie nobles", name:"apple-pie", percentage: 20, color: "green"},
    {label: "Tiramisu believers", name:"tiramisu", percentage: 15, color: "darkblue"},
  ]
};