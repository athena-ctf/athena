import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { TeamForm as Component } from "@/components/forms/team";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/TeamForm",
  component: Component,
  decorators: [cardDecorator("Create team form")],
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
        openapiHttp.post("/admin/team", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
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
      updated_at: faker.date.anytime().toISOString(),
      email: faker.internet.email(),
      name: faker.internet.username(),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/team/{id}", async ({ request, response, params: { id } }) =>
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
