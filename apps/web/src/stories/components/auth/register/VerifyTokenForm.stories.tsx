import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { VerifyTokenForm } from "@/components/auth/register/verify-token-form";
import { routerDecorator } from "@/utils/routerDecorator";

const meta = {
  title: "Components/Auth/Register/VerifyTokenForm",
  component: VerifyTokenForm,
  decorators: [routerDecorator],
} satisfies Meta<typeof VerifyTokenForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prev() {
      console.log("pressed prev");
    },
  },
  parameters: {
    msw: {
      handlers: [
        http.post("https://api.athena.io/auth/player/register/send-token", () => {
          return HttpResponse.json({
            message: "Successfully sent mail",
          });
        }),
        http.get("https://api.athena.io/auth/player/register/verify/invite", () => {
          return HttpResponse.json({
            invite_id: "0000-000000-0000-000000",
            team_id: "0000-000000-0000-000000",
          });
        }),
      ],
    },
  },
};
