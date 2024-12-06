import type { Meta, StoryObj } from "@storybook/react";

import { ProfileCard as Component } from "@/components/profile/card";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Profile/Card",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerCard: Story = {
  args: {
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
    extra: { kind: "player", avatarUrl: faker.image.avatar() },
    email: faker.internet.email(),
    name: faker.person.fullName(),
    rank: 0,
    score: 0,
  },
};

export const TeamCard: Story = {
  args: {
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
    extra: { kind: "team", memberCount: 3 },
    email: faker.internet.email(),
    name: faker.person.fullName(),
    rank: 0,
    score: 0,
  },
};
