import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { NotificationForm as Component } from "@/components/forms/notification";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/NotificationForm",
  component: Component,
  decorators: [cardDecorator("Create notification form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/notification", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
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
      ],
    },
  },
};

export const UpdateForm: Story = {
  args: {
    onSuccess() {
      console.log("updated");
    },
    kind: "update",
    defaultValues: {
      created_at: faker.date.anytime().toISOString(),
      id: faker.string.uuid(),
      updated_at: faker.date.anytime().toISOString(),
      player_id: faker.string.uuid(),
      read_at: faker.date.anytime().toISOString(),
      content: faker.lorem.sentence(5),
      title: faker.lorem.word(2),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/notification/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
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
