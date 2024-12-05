import type { Meta, StoryObj } from "@storybook/react";

import { Notification as Component } from "@/components/navbar/notification";
import { openapiHttp } from "@/utils/msw";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Navbar/Notification",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/player/notifications", ({ response }) => response(200).json([])),
      ],
    },
  },
};

export const Full: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/player/notifications", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({
                content: faker.lorem.lines(1),
                created_at: faker.date.anytime().toISOString(),
                id: faker.string.uuid(),
                title: faker.lorem.words(3),
                updated_at: faker.date.anytime().toISOString(),
              })),
          ),
        ),
      ],
    },
  },
};
