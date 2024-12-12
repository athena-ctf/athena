import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { UpdatePlayerAwardForm as Component } from "@/components/forms/player_award";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/UpdatePlayerAwardForm",
  component: Component,
  decorators: [cardDecorator("Update player award form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UpdatePlayerAwardForm: Story = {
  args: {
    onSuccess() {
      console.log("updated");
    },
    kind: "update",
    oldModel: {
      created_at: faker.date.anytime().toISOString(),
      updated_at: faker.date.anytime().toISOString(),
      player_id: faker.string.uuid(),
      award_id: faker.string.uuid(),
      count: faker.number.int(10),
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put(
          "/admin/player_award/{player_id}-{award_id}",
          async ({ request, response, params: { player_id, award_id } }) =>
            response(200).json({
              created_at: faker.date.anytime().toISOString(),
              updated_at: faker.date.anytime().toISOString(),
              player_id,
              award_id,
              count: (await request.json()).count,
            }),
        ),
      ],
    },
  },
};
