import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from 'components/Modal';

export default {
    title: 'Commons/Modal',
    component: Modal,
    argTypes: {
        title: { control: 'text' },
        visible: { control: 'boolean' },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
  } as ComponentMeta<typeof Modal>;
  

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'test',
    visible: true,
    children: <div>Lorem ipsum</div>,
};