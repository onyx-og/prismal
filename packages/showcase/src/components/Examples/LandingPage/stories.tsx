import type { Meta, StoryObj } from "@storybook/react";
import LandingPage from "./LandingPage";
import "./stories.scss";

const meta = {
    title: "Examples/Landing Page",
    component: LandingPage,
} as Meta<typeof LandingPage>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
