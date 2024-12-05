import type { Meta, StoryObj } from "@storybook/react";

import { ScoreChart as Component } from "@/components/profile/score-chart";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Profile/ScoreChart",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScoreChart: Story = {
  args: {
    data: Array(10)
      .fill(0)
      .map(() => ({
        points: faker.number.int({ min: -20, max: 100 }),
        timestamp: faker.date.past().getUTCMilliseconds(),
      })),
  },
};
