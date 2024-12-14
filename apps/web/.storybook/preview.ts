import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "@repo/ui/globals.css";

initialize();

export const parameters = {
  msw: {},
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
