import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeDiff as Component } from "@/components/profile/challenge-diff";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Profile/ChallengeDiff",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeDiff: Story = {
  args: {
    data: Array(8)
      .fill(0)
      .map(() => ({
        solves: faker.number.int(20),
        tag_value: faker.lorem.word(),
      })),
  },
};
