import type { Meta, StoryObj } from "@storybook/react";

import { FilterPopover as Component } from "@/components/challenge/filter-popover";

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
    options: [
      {
        id: "web",
        value: "Web",
      },
      {
        id: "osint",
        value: "OSINT",
      },
      {
        id: "malware",
        value: "Malware",
      },
      {
        id: "forensics",
        value: "Forensics",
      },
    ],
    selected: [],
    onSelect(value: string) {
      console.log("selected: ", value);
    },
    placeholder: "Select tag ...",
    buttonText: "Tags",
  },
};
