import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { NotificationForm as Component } from "@/components/table/forms/notification";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/NotificationForm",
  component: Component,
  decorators: [cardDecorator("Create notification form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/notification", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            player_id: faker.string.uuid(),
            read_at: faker.date.anytime().toISOString(),
            content: faker.lorem.sentence(5),
            title: faker.lorem.word(2),
          }),
        ),
        openapiHttp.get("/admin/player/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), username: faker.internet.username() })),
          ),
        ),
      ],
    },
  },
};
