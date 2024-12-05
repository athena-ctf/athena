import type { Meta, StoryObj } from "@storybook/react";

import { ProfileDropdown as Component } from "@/components/navbar/profile-dropdown";
import { faker } from "@faker-js/faker";
import { routerDecorator } from "@/utils/router-decorator";

const meta = {
  title: "Components/Navbar/ProfileDropdown",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileDropdown: Story = {
  args: {
    playerProfile: {
      awards: [],
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
