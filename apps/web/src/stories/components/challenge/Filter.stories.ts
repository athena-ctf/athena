import type { Meta, StoryObj } from "@storybook/react";

import { Filter as Component } from "@/components/challenge/filter";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/Filter",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filter: Story = {
  args: {
    tags: Array(5)
      .fill(0)
      .map(() => ({
        created_at: faker.date.anytime().toISOString(),
        id: faker.string.uuid(),
        value: faker.lorem.word(),
        updated_at: faker.date.anytime().toISOString(),
      })),
    difficulties: [
      {
        level: "0",
        value: "Easy",
      },
      {
        level: "1",
        value: "Medium",
      },
      {
        level: "2",
        value: "Hard",
      },
    ],
    onChange(tags, difficulties, status) {
      console.log("changed: ", tags, difficulties, status);
    },
  },
};
