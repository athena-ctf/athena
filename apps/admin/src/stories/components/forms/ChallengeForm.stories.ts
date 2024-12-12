import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeForm as Component } from "@/components/forms/challenge";
import { cardDecorator, tooltipDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/ChallengeForm",
  component: Component,
  decorators: [tooltipDecorator, cardDecorator("Create challenge form")],
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
      author_name: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      kind: "dynamic_containerized",
      level: faker.number.int(5),
      points: faker.number.int(500),
      title: faker.lorem.words(3),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/challenge/{id}", async ({ request, response, params: { id } }) =>
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
