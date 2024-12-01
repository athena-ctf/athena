import type { Meta, StoryObj } from "@storybook/react";

import { DetailsForm } from "@/components/auth/register/details-form";
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const meta = {
  title: "Example/DetailsForm",
  component: DetailsForm,
  decorators: [
    (Story) => {
      const router = useRouter();
      useEffect(() => {
        router.__store.setState((prev) => {
          return {
            ...prev,
            matches: [
              {
                ...prev.matches[0],
                search: { next: "" },
              },
            ],
          };
        });
      }, [router]);

      return <Story />;
    },
  ],
} satisfies Meta<typeof DetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    next() {
      console.log("pressed next");
    },
  },
};
