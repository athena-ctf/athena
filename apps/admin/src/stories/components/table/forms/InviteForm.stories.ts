import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { InviteForm as Component } from "@/components/table/forms/invite";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/InviteForm",
  component: Component,
  decorators: [cardDecorator("Create invite form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InviteForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/invite", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            team_id: faker.string.uuid(),
            expires_at: faker.date.anytime().toISOString(),
            remaining: faker.number.int(10),
          }),
        ),
        openapiHttp.get("/admin/team/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), name: faker.internet.username() })),
          ),
        ),
      ],
    },
  },
};
