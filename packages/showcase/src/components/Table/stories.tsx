import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Table from 'components/Table';

const meta = {
    title: 'Commons/Table',
    component: Table,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        borderRadius: {
            control: 'select',
            options: ["none", "extra-small", "small", "medium", "large", "extra-large", "full"]
        }
    }
}  as Meta<typeof Table >;

type Story = StoryObj<typeof meta>;

export default meta;
export const Default: Story = {};
Default.args = {
    data: {
        "Q1 2023": {
            "Product A Sales": 15000,
            "Product B Sales": 8000,
            "New Customers": 120,
            "Region Focus": "North"
        },
        "Q2 2023": {
            "Product A Sales": 18500,
            "Product B Sales": 9200,
            "New Customers": 155,
            "Region Focus": "East"
        },
        "Q3 2023": {
            "Product A Sales": 17000,
            "Product B Sales": 8500,
            "New Customers": 130,
            "Region Focus": "South"
        },
        "Q4 2023": {
            "Product A Sales": 22000,
            "Product B Sales": 11000,
            "New Customers": 210,
            "Region Focus": "West"
        }
    }
};