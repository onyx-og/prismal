import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import List from 'components/List';
import Card from "components/Card"
import "./stories.scss";

const meta = {
  title: 'Commons/List',
  component: List,
  argTypes: {
      accent: { control: 'color' },
      accentDark: { control: 'color' },
      accentLight: { control: 'color' },
      pageSize: { control: { type: 'number', min:1, max:30, step: 1 } },
      page: { control: { type: 'number', min:1, max:5, step: 1 } },
      showPageCtrl: { control: 'boolean' },
      showExtremesCtrl: { control: 'boolean' }
  }
};

export default meta;
// export const Default: Story = {};
// Default.args = {
// };

export const ProcessedList = {};
ProcessedList.args = {
  data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
  pageSize: 5,
  page: 1,
  showPageCtrl: true,
  showExtremesCtrl: true,
  type: 'process',
  listProcessor: (list) => {
    return {
      elements: list.map((el) => <Card>{`Element ${el}`}</Card>)
    }
  }
};

export const RawList = {};
RawList.args = {
  pageSize: 5,
  page: 1,
  showPageCtrl: true,
  showExtremesCtrl: true,
  type: 'raw',
  children: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map((el) => <Card>{`Element ${el}`}</Card>)
};

export const ProcessedGrid = {};
ProcessedGrid.args = {
  data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
  view: "grid",
  pageSize: 5,
  page: 1,
  cols: 5,
  showPageCtrl: true,
  type: 'process',
  listProcessor: (list) => {
    return {
      elements: list.map((el) => <Card>{`Element ${el}`}</Card>)
    }
  }
};

export const RawGrid = {};
RawGrid.args = {
  view: "grid",
  pageSize: 5,
  page: 1,
  cols: 5,
  showPageCtrl: true,
  type: 'raw',
  children: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map((el) => <Card>{`Element ${el}`}</Card>)
};