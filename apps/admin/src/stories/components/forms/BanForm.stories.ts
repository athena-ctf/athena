import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { BanForm as Component } from "@/components/forms/ban";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/BanForm",
  component: Component,
  decorators: [cardDecorator("Create ban form")],
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
        openapiHttp.post("/admin/ban", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            duration: faker.number.int({ min: 0, max: 7 }),
            reason: faker.lorem.sentence(),
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
      duration: faker.number.int({ min: 0, max: 7 }),
      reason: faker.lorem.sentence(),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/ban/{id}", async ({ request, response, params: { id } }) =>
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
