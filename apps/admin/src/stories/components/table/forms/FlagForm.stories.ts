import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { FlagForm as Component } from "@/components/table/forms/flag";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/FlagForm",
  component: Component,
  decorators: [cardDecorator("Create flag form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlagForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/flag", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            value: `athenaCTF{${faker.string.alphanumeric(8)}}`,
            challenge_id: faker.string.uuid(),
            ignore_case: false,
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
