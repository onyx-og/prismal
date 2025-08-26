import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ActionBar from 'components/ActionBar';
import Button from 'components/Button';

const meta = {
    title: 'Commons/ActionBar',
    component: ActionBar,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
  }  as Meta<typeof ActionBar >;

type Story = StoryObj<typeof meta>;

export default meta;
export const Default: Story = {};
Default.args = {
  type: 'primary',
  items: [
    {item: <span>Test</span>, position: 'center', key: '1'},
    {item: <Button iconName="search" type='primary'/>, position: 'right', key: '2'}
  ]
};

export const Wrapper: Story = {};
Wrapper.args = {
  type: 'primary',
  modalAreaId: "root",
  children: [
    <Button iconName="star" type='primary'/>,
    <span>Contact</span>,
    <Button iconName="clock-o" type='primary'/>,
    <Button iconName="inbox" type='primary'/>,
  ],
  items: [
    {item: <span>Test</span>, position: 'center', key: '1'},
    {item: <Button iconName="search" type='primary'/>, position: 'right', key: '2'}
  ]
};
