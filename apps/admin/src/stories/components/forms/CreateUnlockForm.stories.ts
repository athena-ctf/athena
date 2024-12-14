import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreateUnlockForm as Component } from "@/components/forms/unlock";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/CreateUnlockForm",
  component: Component,
  decorators: [cardDecorator("Create unlock form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateUnlockForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/unlock", async ({ request, response }) =>
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
        openapiHttp.get("/admin/hint/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), description: faker.lorem.words(5) })),
          ),
        ),
      ],
    },
  },
};
