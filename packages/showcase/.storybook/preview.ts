import type { Preview } from "@storybook/react";

// Import global styles here
import '@prismal/react/lib/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Examples", "*"],
      },
    },
  },
};

export default preview;