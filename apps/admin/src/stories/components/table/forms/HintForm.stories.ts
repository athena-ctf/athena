import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { HintForm as Component } from "@/components/table/forms/hint";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/HintForm",
  component: Component,
  decorators: [cardDecorator("Create hint form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HintForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/hint", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            challenge_id: faker.string.uuid(),
            cost: faker.number.int(100),
            description: faker.lorem.sentence(),
          }),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(3) })),
          ),
        ),
      ],
    },
  },
};
