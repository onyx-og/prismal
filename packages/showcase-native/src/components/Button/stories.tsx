import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import {Button} from "@prismal/react-native";

const meta = {
  title: "commons/Button",
  component: Button,
  args: {
    title: 'Hi',
    // title: "Hello world",
    onPress: () => console.log("Pressed!")
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Hi",
  },
};
