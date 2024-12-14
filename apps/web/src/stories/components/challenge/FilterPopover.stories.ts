import type { Meta, StoryObj } from "@storybook/react";

import { FilterPopover as Component } from "@/components/challenge/filter-popover";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/FilterPopover",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterPopover: Story = {
  args: {
    open: true,
    setOpen(open) {
      console.log("action: ", open);
    },
    options: Array(5)
      .fill(0)
      .map(() => ({
        value: faker.string.uuid(),
        label: faker.lorem.word(),
      })),
    selected: [],
    onSelect(value: string) {
      console.log("selected: ", value);
    },
    placeholder: "Select tag ...",
    title: "Tags",
  },
};
