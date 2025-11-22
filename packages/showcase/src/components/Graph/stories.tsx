import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Graph, GraphType} from '@prismal/react';

const meta = {
  title: 'Commons/Graph',
  component: Graph,
  argTypes: {
    // accent: { control: 'color' },
    // accentDark: { control: 'color' },
    // accentLight: { control: 'color' },
    // borderRadius: {
    //   control: 'select',
    //   options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
    // }
  }
}  as Meta<typeof Graph >;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
  type: GraphType.LINE,
  keys: { x: 'month', y: 'value' },
  title: "Monthly Revenue",
  data: [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 4500 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 5500 },
  { month: 'Jul', value: 7000 },
]
};
