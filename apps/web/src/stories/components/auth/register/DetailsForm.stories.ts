import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

import { DetailsForm as Component } from "@/components/auth/register/details-form";
import { routerDecorator } from "@/utils/router-decorator";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Auth/Register/DetailsForm",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DetailsForm: Story = {
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
            url: `https://static.athena.io/download/${faker.string.uuid()}`,
          });
        }),
        openapiHttp.get("/auth/player/register/verify/email", ({ response }) =>
          response(200).json({ message: "verified email successfully" }),
        ),
      ],
    },
  },
};
