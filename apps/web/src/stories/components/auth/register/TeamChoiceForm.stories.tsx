import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { TeamChoiceForm } from "@/components/auth/register/team-choice-form";
import { routerDecorator } from "@/utils/routerDecorator";

const meta = {
  title: "Components/Auth/Register/TeamChoiceForm",
  component: TeamChoiceForm,
  decorators: [routerDecorator],
} satisfies Meta<typeof TeamChoiceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    next() {
      console.log("pressed next");
    },
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
