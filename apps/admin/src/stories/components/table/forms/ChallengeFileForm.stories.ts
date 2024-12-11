import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeFileForm as Component } from "@/components/table/forms/challenge_file";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/ChallengeFileForm",
  component: Component,
  decorators: [cardDecorator("Create challenge file form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeFileForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/challenge_file", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
            challenge_id: faker.string.uuid(),
            file_id: faker.string.uuid(),
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
