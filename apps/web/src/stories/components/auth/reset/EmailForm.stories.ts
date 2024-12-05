import type { Meta, StoryObj } from "@storybook/react";

import { EmailForm as Component } from "@/components/auth/reset/email-form";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Auth/Reset/EmailForm",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailForm: Story = {
  args: {
    next() {
      console.log("pressed next");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/auth/player/reset-password/send-token", ({ response }) =>
          response(200).json({
            message: "successfully sent token",
          }),
        ),
      ],
    },
  },
};
