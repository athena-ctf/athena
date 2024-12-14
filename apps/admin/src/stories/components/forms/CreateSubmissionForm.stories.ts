import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreateSubmissionForm as Component } from "@/components/forms/submission";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/CreateSubmissionForm",
  component: Component,
  decorators: [cardDecorator("Create submission form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateSubmissionForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/submission", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.get("/admin/player/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), username: faker.internet.username() })),
          ),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(5) })),
          ),
        ),
      ],
    },
  },
};
