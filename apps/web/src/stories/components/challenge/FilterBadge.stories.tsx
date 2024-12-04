import type { Meta, StoryObj } from "@storybook/react";

import { FilterBadge } from "@/components/challenge/filter-badge";
import { routerDecorator } from "@/utils/routerDecorator";

const meta = {
  title: "Components/Challenge/FilterBadge",
  component: FilterBadge,
  decorators: [routerDecorator],
} satisfies Meta<typeof FilterBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tag: Story = {
  args: {
    label: "Tag",
    onRemove() {
      console.log("removed filter");
    },
    category: "tag",
  },
};

export const Difficulty: Story = {
  args: {
    label: "Difficulty",
    onRemove() {
      console.log("removed filter");
    },
    category: "difficulty",
  },
};

export const Status: Story = {
  args: {
    label: "Status",
    onRemove() {
      console.log("removed filter");
    },
    category: "status",
  },
};
