import type { Meta, StoryObj } from "@storybook/react";

import { TeamChoiceForm as Component } from "@/components/auth/register/team-choice-form";
import { openapiHttp } from "@/utils/msw";
import { routerDecorator } from "@/utils/router-decorator";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Auth/Register/TeamChoiceForm",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamChoiceForm: Story = {
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
        openapiHttp.post("/auth/player/register/send-token", ({ response }) =>
          response(200).json({ message: "Successfully send email" }),
        ),
        openapiHttp.get("/auth/player/register/verify/invite", ({ response }) =>
          response(200).json({
            invite_id: faker.string.uuid(),
            team_id: faker.string.uuid(),
          }),
        ),
      ],
    },
  },
};
