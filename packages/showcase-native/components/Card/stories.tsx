import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { View, Text } from "react-native";
import {Card} from "@prismal/react-native";

const meta = {
    title: "Commons/Card",
    component: Card,
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
        children: [<View>
            <Text>Example</Text>
        </View>]
        //onPress: fn(),
    },
};
