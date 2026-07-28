import type { Meta, StoryObj } from "@storybook/react";
import AdminDashboard from "./AdminDashboard";
import "./stories.scss";

const meta = {
    title: "Examples/Admin Dashboard",
    component: AdminDashboard,
} as Meta<typeof AdminDashboard>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
