import type { Meta, StoryObj } from "@storybook/react";

import { Filter as Component } from "@/components/challenge/filter";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/Filter",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filter: Story = {
  args: {
    tags: faker.lorem.words(3).split(" "),
    onChange(tags, difficulties, status) {
      console.log("changed: ", tags, difficulties, status);
    },
  },
};
