import type { Meta, StoryObj } from "@storybook/react";

import { VerifyTokenForm as Component } from "@/components/auth/reset/verify-token-form";
import { routerDecorator } from "@/utils/routerDecorator";

const meta = {
  title: "Components/Auth/Reset/VerifyTokenForm",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerifyTokenForm: Story = {
  args: {
    next() {
      console.log("pressed next");
    },
    prev() {
      console.log("pressed prev");
    },
  },
};
