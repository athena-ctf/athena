import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { TicketForm as Component } from "@/components/forms/ticket";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/TicketForm",
  component: Component,
  decorators: [cardDecorator("Create ticket form")],
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
        openapiHttp.post("/admin/ticket", async ({ request, response }) =>
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
        openapiHttp.get("/admin/admin/ids", ({ response }) =>
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
      console.log("updted");
    },
    kind: "update",
    defaultValues: {
      created_at: faker.date.anytime().toISOString(),
      id: faker.string.uuid(),
      updated_at: faker.date.anytime().toISOString(),
      assigned_to: faker.string.uuid(),
      opened_by: faker.string.uuid(),
      status: "closed",
      title: faker.lorem.sentence(5),
      description: faker.lorem.paragraph(5),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/ticket/{id}", async ({ request, response, params: { id } }) =>
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
        openapiHttp.get("/admin/admin/ids", ({ response }) =>
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
