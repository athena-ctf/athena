import type { Meta, StoryObj } from "@storybook/react";

import { ProfileCard as Component } from "@/components/profile/card";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Profile/Card",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    playerProfile: {
      awards: Array(4)
        .fill(0)
        .map(() => ({
          count: faker.number.int(10),
          created_at: "",
          id: faker.string.uuid(),
          logo_url: faker.image.url(),
          prize: 0,
          updated_at: "",
          value: faker.lorem.word(),
        })),
      history: [],
      player: {
        avatar_url: faker.image.avatar(),
        ban_id: undefined,
        created_at: "",
        discord_id: undefined,
        email: faker.internet.email(),
        id: "",
        team_id: "",
        updated_at: "",
        username: faker.person.fullName(),
      },
      rank: 0,
      score: 0,
      solved_challenges: [],
      tag_solves: [],
    },
  },
};
