import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AwardForm as Component } from "@/components/table/forms/award";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/AwardForm",
  component: Component,
  decorators: [cardDecorator("Create award form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AwardForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/award", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            value: faker.internet.username(),
            logo_url: faker.image.avatar(),
            prize: faker.number.int(100),
          }),
        ),
      ],
    },
  },
};
