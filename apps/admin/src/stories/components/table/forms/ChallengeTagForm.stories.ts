import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import { ChallengeTagForm as Component } from "@/components/table/forms/challenge_tag";
import { openapiHttp } from "@/utils/msw";
import { cardDecorator } from "@/utils/decorators";

const meta = {
  title: "Components/Table/Forms/ChallengeTagForm",
  component: Component,
  decorators: [cardDecorator("Create challenge tag form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeTagForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/challenge_tag", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
            challenge_id: faker.string.uuid(),
            tag_id: faker.string.uuid(),
          }),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(3) })),
          ),
        ),
        openapiHttp.get("/admin/tag/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), value: faker.lorem.word() })),
          ),
        ),
      ],
    },
  },
};
