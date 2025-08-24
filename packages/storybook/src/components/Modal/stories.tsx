import { Meta, StoryObj } from '@storybook/react';
import Modal from 'components/Modal';

const meta = {
    title: 'Commons/Modal',
    component: Modal,
    argTypes: {
        title: { control: 'text' },
        visible: { control: 'boolean' },
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
} as Meta<typeof Modal >;

type Story = StoryObj<typeof meta>;

export default meta;
export const Default: Story = {};
Default.args = {
    title: 'test',
    visible: true,
    children: <div>Lorem ipsum</div>,
};