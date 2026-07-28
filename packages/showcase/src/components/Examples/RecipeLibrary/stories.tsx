import type { Meta, StoryObj } from "@storybook/react";
import RecipeLibrary from "./RecipeLibrary";
import "./stories.scss";

const meta = {
    title: "Examples/Recipe Library",
    component: RecipeLibrary,
} as Meta<typeof RecipeLibrary>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
