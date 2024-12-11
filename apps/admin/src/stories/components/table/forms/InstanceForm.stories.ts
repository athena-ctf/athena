import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { InstanceForm as Component } from "@/components/table/forms/instance";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Table/Forms/InstanceForm",
  component: Component,
  decorators: [cardDecorator("Create instance form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InstanceForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/instance", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            container_id: faker.string.alphanumeric(8),
            container_name: faker.lorem.words(2).replace(" ", "_"),
            deployment_id: faker.string.uuid(),
            port_mapping: [],
          }),
        ),
        openapiHttp.get("/admin/deployment/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid() })),
          ),
        ),
      ],
    },
  },
};
