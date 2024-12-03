import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { DetailsForm } from "@/components/auth/register/details-form";
import { routerDecorator } from "@/utils/routerDecorator";

const meta = {
  title: "Components/Auth/Register/DetailsForm",
  component: DetailsForm,
  decorators: [routerDecorator],
} satisfies Meta<typeof DetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    next() {
      console.log("pressed next");
    },
  },
  parameters: {
    msw: {
      handlers: [
        http.post("https://static.athena.io/upload/local", () => {
          return HttpResponse.json({
            url: "https://static.athena.io/download/0000-000000-0000-000000",
          });
        }),
        http.get("https://api.athena.io/auth/player/register/verify/email", () => {
          return HttpResponse.json({
            message: "Player exists",
          });
        }),
      ],
    },
  },
};
