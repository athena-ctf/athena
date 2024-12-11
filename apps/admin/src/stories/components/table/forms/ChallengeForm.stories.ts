import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeForm as Component } from "@/components/table/forms/challenge";
import { cardDecorator, tooltipDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/ChallengeForm",
  component: Component,
  decorators: [tooltipDecorator, cardDecorator("Create challenge form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/challenge", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            author_name: faker.person.fullName(),
            description: faker.lorem.paragraph(),
            kind: "dynamic_containerized",
            level: faker.number.int(5),
            points: faker.number.int(500),
            title: faker.lorem.words(3),
          }),
        ),
      ],
    },
  },
};
