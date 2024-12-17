import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { BanTable as Component } from "@/components/tables/ban";
import { genExports } from "@/utils/gen-exports";
import { openapiHttp } from "@/utils/msw";
import { HttpResponse } from "msw";

const meta = {
  title: "Components/Tables/BanTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const bans = Array(100)
  .fill(0)
  .map(() => ({
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    updated_at: faker.date.anytime().toISOString(),
    duration: faker.number.int({ min: 0, max: 7 }),
    reason: faker.lorem.sentence(),
  }));

const exports = genExports("ban", bans);

export const BanTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/ban", ({ response }) => response(200).json(bans)),
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
        openapiHttp.delete("/admin/ban/{id}", ({ response }) => response(204).empty()),
        openapiHttp.post("/admin/ban/import", ({ response }) =>
          response(200).json({ message: "successfully imported" }),
        ),
        openapiHttp.get("/admin/ban/export", ({ response, query }) =>
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
