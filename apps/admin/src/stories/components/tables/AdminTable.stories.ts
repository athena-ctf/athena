import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { AdminTable as Component } from "@/components/tables/admin";
import { genExports } from "@/utils/gen-exports";
import { openapiHttp } from "@/utils/msw";
import type { components } from "@repo/api";
import { HttpResponse } from "msw";

const meta = {
  title: "Components/Tables/AdminTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const admins = Array(100)
  .fill(0)
  .map(() => ({
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    role: "analyst" as components["schemas"]["RoleEnum"],
    updated_at: faker.date.anytime().toISOString(),
    username: faker.internet.username(),
  }));

const exports = genExports("admin", admins);

export const AdminTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/admin", ({ response }) => response(200).json(admins)),
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
        openapiHttp.delete("/admin/admin/{id}", ({ response }) => response(204).empty()),
        openapiHttp.post("/admin/admin/import", ({ response }) =>
          response(200).json({ message: "successfully imported" }),
        ),
        openapiHttp.get("/admin/admin/export", ({ response, query }) =>
          response.untyped(
            HttpResponse.arrayBuffer(new TextEncoder().encode(exports[query.get("format")]), {
              headers: {
                "Content-Type": "application/octet-stream",
              },
            }),
          ),
        ),
      ],
    },
  },
};
