import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeCard as Component } from "@/components/challenge/card";
import { routerDecorator } from "@/utils/routerDecorator";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/Card",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    challengeSummary: {
      challenge: {
        author_name: faker.person.fullName(),
        created_at: faker.date.anytime().toISOString(),
        description: faker.lorem.lines(),
        id: faker.string.uuid(),
        kind: "static_flag",
        level: 0,
        points: faker.number.int(),
        title: faker.lorem.sentence(4),
        updated_at: faker.date.anytime().toISOString(),
      },
      solves: 0,
      state: "solved",
      tags: [
        {
          created_at: faker.date.anytime().toISOString(),
          id: faker.string.uuid(),
          value: faker.lorem.word(),
          updated_at: faker.date.anytime().toISOString(),
        },
      ],
    },
  },
};
