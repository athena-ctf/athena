import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { TagForm as Component } from "@/components/table/forms/tag";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/TagForm",
  component: Component,
  decorators: [cardDecorator("Create tag form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/tag", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            value: faker.lorem.word(),
          }),
        ),
      ],
    },
  },
};
