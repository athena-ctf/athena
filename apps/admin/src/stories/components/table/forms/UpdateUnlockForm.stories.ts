import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { CreateUnlockForm as Component } from "@/components/table/forms/unlock";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/CreateUnlockForm",
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
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put(
          "/admin/unlock/{player_id}-{hint_id}",
          ({ response, params: { player_id, hint_id } }) =>
            response(200).json({
              created_at: faker.date.anytime().toISOString(),
              updated_at: faker.date.anytime().toISOString(),
              player_id,
              hint_id,
            }),
        ),
      ],
    },
  },
};
