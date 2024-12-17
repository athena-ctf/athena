import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { DeploymentTable as Component } from "@/components/tables/deployment";
import { genExports } from "@/utils/gen-exports";
import { openapiHttp } from "@/utils/msw";
import { HttpResponse } from "msw";

const meta = {
  title: "Components/Tables/DeploymentTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const deployments = Array(100)
  .fill(0)
  .map(() => ({
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    updated_at: faker.date.anytime().toISOString(),
    challenge_id: faker.string.uuid(),
    expires_at: faker.date.anytime().toISOString(),
    player_id: faker.helpers.maybe(() => faker.string.uuid()),
  }));

const exports = genExports("deployment", deployments);

export const DeploymentTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/deployment", ({ response }) => response(200).json(deployments)),
        openapiHttp.post("/admin/deployment", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/deployment/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/deployment/{id}", ({ response }) => response(204).empty()),
        openapiHttp.post("/admin/deployment/import", ({ response }) =>
          response(200).json({ message: "successfully imported" }),
        ),
        openapiHttp.get("/admin/deployment/export", ({ response, query }) =>
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
