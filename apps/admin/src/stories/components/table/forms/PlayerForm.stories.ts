import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { PlayerForm as Component } from "@/components/table/forms/player";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/PlayerForm",
  component: Component,
  decorators: [cardDecorator("Create player form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/player", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            team_id: faker.string.uuid(),
            avatar_url: faker.image.avatar(),
            email: faker.internet.email(),
            username: faker.internet.username(),
            ban_id: faker.string.uuid(),
          }),
        ),
        openapiHttp.get("/admin/team/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), name: faker.internet.username() })),
          ),
        ),
        openapiHttp.get("/admin/ban/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), reason: faker.lorem.sentence() })),
          ),
        ),
      ],
    },
  },
};
