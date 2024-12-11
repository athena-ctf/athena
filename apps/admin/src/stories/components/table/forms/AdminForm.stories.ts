import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AdminForm as Component } from "@/components/table/forms/admin";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/AdminForm",
  component: Component,
  decorators: [cardDecorator("Create admin form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
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
