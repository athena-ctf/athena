import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { BanTable as Component } from "@/components/tables/ban";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Tables/BanTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BanTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/ban", ({ response }) =>
          response(200).json(
            Array(100)
              .fill(0)
              .map(() => ({
                created_at: faker.date.anytime().toISOString(),
                id: faker.string.uuid(),
                updated_at: faker.date.anytime().toISOString(),
                duration: faker.number.int({ min: 0, max: 7 }),
                reason: faker.lorem.sentence(),
              })),
          ),
        ),
        openapiHttp.post("/admin/ban", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/ban/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/ban/{id}", async ({ response }) => response(204).empty()),
      ],
    },
  },
};
