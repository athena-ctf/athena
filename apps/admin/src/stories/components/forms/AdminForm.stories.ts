import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AdminForm as Component } from "@/components/forms/admin";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/AdminForm",
  component: Component,
  decorators: [cardDecorator("Create admin form")],
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
        openapiHttp.post("/admin/admin", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            role: "analyst",
            updated_at: faker.date.anytime().toISOString(),
            username: faker.internet.username(),
          }),
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
      role: "analyst",
      updated_at: faker.date.anytime().toISOString(),
      username: faker.internet.username(),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/admin/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
      ],
    },
  },
};
