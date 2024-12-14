import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AdminTable as Component } from "@/components/tables/admin";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Tables/AdminTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/admin", ({ response }) =>
          response(200).json(
            Array(100)
              .fill(0)
              .map(() => ({
                created_at: faker.date.anytime().toISOString(),
                id: faker.string.uuid(),
                role: "analyst",
                updated_at: faker.date.anytime().toISOString(),
                username: faker.internet.username(),
              })),
          ),
        ),
        openapiHttp.post("/admin/admin", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/admin/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/admin/{id}", async ({ response }) => response(204).empty()),
      ],
    },
  },
};
