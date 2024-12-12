import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { TeamForm as Component } from "@/components/table/forms/team";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/TeamForm",
  component: Component,
  decorators: [cardDecorator("Create team form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/team", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            email: faker.internet.email(),
            name: faker.internet.username(),
          }),
        ),
      ],
    },
  },
};
