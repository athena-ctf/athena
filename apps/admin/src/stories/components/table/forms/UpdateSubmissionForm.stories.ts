import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { UpdateSubmissionForm as Component } from "@/components/table/forms/submission";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/UpdateSubmissionForm",
  component: Component,
  decorators: [cardDecorator("Update submission form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UpdateSubmissionForm: Story = {
  args: {
    onSuccess() {
      console.log("updated");
    },
    oldModel: {
      updated_at: faker.date.anytime().toISOString(),
      created_at: faker.date.anytime().toISOString(),
      player_id: faker.string.uuid(),
      challenge_id: faker.string.uuid(),
      is_correct: true,
      flags: ["athenaCTF{hi}"],
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put(
          "/admin/submission/{challenge_id}-{player_id}",
          async ({ response, request, params: { challenge_id, player_id } }) =>
            response(200).json({
              updated_at: faker.date.anytime().toISOString(),
              created_at: faker.date.anytime().toISOString(),
              player_id,
              challenge_id,
              is_correct: (await request.json()).is_correct,
              flags: (await request.json()).flags,
            }),
        ),
      ],
    },
  },
};
