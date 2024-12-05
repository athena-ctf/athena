import type { Meta, StoryObj } from "@storybook/react";

import { SolvedChallenge as Component } from "@/components/profile/solved-challenge";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Profile/SolvedChallenge",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    challenges: [],
    className: "max-w-md",
  },
};

export const Filled: Story = {
  args: {
    challenges: Array(6)
      .fill(0)
      .map(() => ({
        author_name: faker.person.fullName(),
        created_at: faker.date.anytime().toISOString(),
        description: faker.lorem.lines(),
        id: faker.string.uuid(),
        kind: "static_flag",
        level: 0,
        points: faker.number.int(100),
        title: faker.lorem.sentence(4),
        updated_at: faker.date.anytime().toISOString(),
      })),
    className: "max-w-md",
  },
};
