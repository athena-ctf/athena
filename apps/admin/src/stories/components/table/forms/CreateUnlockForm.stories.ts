import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreateUnlockForm as Component } from "@/components/table/forms/unlock";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/CreateUnlockForm",
  component: Component,
  decorators: [cardDecorator("Create unlock form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateUnlockForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/unlock", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
            player_id: faker.string.uuid(),
            hint_id: faker.string.uuid(),
          }),
        ),
        openapiHttp.get("/admin/player/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), username: faker.internet.username() })),
          ),
        ),
        openapiHttp.get("/admin/hint/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), description: faker.lorem.words(5) })),
          ),
        ),
      ],
    },
  },
};
