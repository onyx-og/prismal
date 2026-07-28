import type { Meta, StoryObj } from "@storybook/react";
import TodoApp from "./TodoApp";
import "./stories.scss";

const meta = {
    title: "Examples/Todo App",
    component: TodoApp,
} as Meta<typeof TodoApp>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
