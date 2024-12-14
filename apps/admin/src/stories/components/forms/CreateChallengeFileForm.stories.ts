import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreateChallengeFileForm as Component } from "@/components/forms/challenge_file";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/CreateChallengeFileForm",
  component: Component,
  decorators: [cardDecorator("Create challenge file form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateChallengeFileForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/challenge_file", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(3) })),
          ),
        ),
        openapiHttp.get("/admin/file/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), name: faker.system.commonFileName() })),
          ),
        ),
      ],
    },
  },
};
