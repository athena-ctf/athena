import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import { BanForm as Component } from "@/components/table/forms/ban";
import { openapiHttp } from "@/utils/msw";
import { cardDecorator } from "@/utils/decorators";

const meta = {
  title: "Components/Table/Forms/BanForm",
  component: Component,
  decorators: [cardDecorator("Create ban form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BanForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
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
