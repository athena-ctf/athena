import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AwardTable as Component } from "@/components/tables/award";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Tables/AwardTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AwardTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/award", ({ response }) =>
          response(200).json(
            Array(100)
              .fill(0)
              .map(() => ({
                created_at: faker.date.anytime().toISOString(),
                id: faker.string.uuid(),
                updated_at: faker.date.anytime().toISOString(),
                logo_url: faker.image.url(),
                value: faker.lorem.word(),
                prize: faker.number.int(100),
              })),
          ),
        ),
        openapiHttp.post("/admin/award", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/award/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/award/{id}", async ({ response }) => response(204).empty()),
      ],
    },
  },
};
