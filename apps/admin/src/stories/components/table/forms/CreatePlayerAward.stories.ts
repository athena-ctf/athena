import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreatePlayerAwardForm as Component } from "@/components/table/forms/player_award";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/CreatePlayerAwardForm",
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
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/player_award", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
            player_id: faker.string.uuid(),
            award_id: faker.string.uuid(),
            count: faker.number.int(10),
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
