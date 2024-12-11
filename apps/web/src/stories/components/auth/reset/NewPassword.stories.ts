import type { Meta, StoryObj } from "@storybook/react";

import { NewPasswordForm as Component } from "@/components/auth/reset/new-password-form";
import { openapiHttp } from "@/utils/msw";
import { routerDecorator } from "@/utils/router-decorator";

const meta = {
  title: "Components/Auth/Reset/NewPasswordForm",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewPasswordForm: Story = {
  args: {
    prev() {
      console.log("pressed prev");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/auth/player/reset-password", ({ response }) =>
          response(200).json({
            message: "successfully sent token",
          }),
        ),
      ],
    },
  },
};
