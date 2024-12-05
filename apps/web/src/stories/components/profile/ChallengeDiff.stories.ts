import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeDiff as Component } from "@/components/profile/challenge-diff";

const meta = {
  title: "Components/Profile/ChallengeDiff",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeDiff: Story = {
  args: {
    data: [
      {
        solves: 10,
        tag_value: "web",
      },
      {
        solves: 5,
        tag_value: "osint",
      },
      {
        solves: 15,
        tag_value: "malware",
      },
      {
        solves: 7,
        tag_value: "forensics",
      },
      {
        solves: 2,
        tag_value: "crypto",
      },
      {
        solves: 13,
        tag_value: "game",
      },
      {
        solves: 8,
        tag_value: "hardware",
      },
    ],
  },
};
