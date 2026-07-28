import type { Meta, StoryObj } from "@storybook/react";
import ShopArchive from "./ShopArchive";
import "./stories.scss";

const meta = {
    title: "Examples/Shop Archive",
    component: ShopArchive,
} as Meta<typeof ShopArchive>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
