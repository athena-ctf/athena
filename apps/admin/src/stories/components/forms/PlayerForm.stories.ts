import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { PlayerForm as Component } from "@/components/forms/player";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/PlayerForm",
  component: Component,
  decorators: [cardDecorator("Create player form")],
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
        openapiHttp.post("/admin/player", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
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
      team_id: faker.string.uuid(),
      avatar_url: faker.image.avatar(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      ban_id: faker.string.uuid(),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/player/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
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
