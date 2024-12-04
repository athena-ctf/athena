import type { Meta, StoryObj } from "@storybook/react";

import { ChallengesFilter as Component } from "@/components/challenge/filter";
import { routerDecorator } from "@/utils/routerDecorator";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/Filter",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filter: Story = {
  args: {
    tags: [
      {
        created_at: faker.date.anytime().toISOString(),
        id: faker.string.uuid(),
        value: faker.lorem.word(),
        updated_at: faker.date.anytime().toISOString(),
      },
      {
        created_at: faker.date.anytime().toISOString(),
        id: faker.string.uuid(),
        value: faker.lorem.word(),
        updated_at: faker.date.anytime().toISOString(),
      },
      {
        created_at: faker.date.anytime().toISOString(),
        id: faker.string.uuid(),
        value: faker.lorem.word(),
        updated_at: faker.date.anytime().toISOString(),
      },
    ],
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
