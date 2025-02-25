import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreatePlayerAwardForm as Component } from "@/components/forms/player_award";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/CreatePlayerAwardForm",
  component: Component,
  decorators: [cardDecorator("Create player award form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreatePlayerAwardForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/player_award", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.get("/admin/player/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), username: faker.internet.username() })),
          ),
        ),
        openapiHttp.get("/admin/award/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), value: faker.lorem.word() })),
          ),
        ),
      ],
    },
  },
};
