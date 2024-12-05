import type { Meta, StoryObj } from "@storybook/react";

import { VerifyTokenForm as Component } from "@/components/auth/register/verify-token-form";
import { routerDecorator } from "@/utils/router-decorator";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Auth/Register/VerifyTokenForm",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerifyTokenForm: Story = {
  args: {
    prev() {
      console.log("pressed prev");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/auth/player/register", ({ response }) =>
          response(200).json({
            message: "Successfully sent mail",
          }),
        ),
      ],
    },
  },
};
