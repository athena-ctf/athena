import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeCard as Component } from "@/components/challenge/card";
import { routerDecorator } from "@/utils/router-decorator";
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
        tags: faker.lorem.words(3).split(" "),
      },
      solves: 0,
      state: "solved",
    },
  },
};
