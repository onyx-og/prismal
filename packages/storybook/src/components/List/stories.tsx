import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import List from 'components/List';
import Card from "components/Card"
import "./stories.scss";

export default {
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
  } as ComponentMeta<typeof List>;
  

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

// export const Default = Template.bind({});
// Default.args = {
// };

export const Processed = Template.bind({});
Processed.args = {
  data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
  pageSize: 5,
  page: 1,
  showPageCtrl: true,
  showExtremesCtrl: true,
  listProcessor: (list) => {
    return {
      processed: null,
      elements: list.map((el) => <Card>{`Element ${el}`}</Card>)
    }
  }
};