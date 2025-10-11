import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import {Tabs} from "@prismal/react-native";

const meta = {
    title: "Commons/Tabs",
    component: Tabs,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        data: [
            {name: "tab1", label: "Tab 1"},
            {name: "tab2", label: "Tab 2"},
            {name: "tab3", label: "Tab 3"},
        ]
    },
};
