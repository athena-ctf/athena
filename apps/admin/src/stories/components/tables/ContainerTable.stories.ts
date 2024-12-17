import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ContainerTable as Component } from "@/components/tables/container";
import { genExports } from "@/utils/gen-exports";
import { openapiHttp } from "@/utils/msw";
import { HttpResponse } from "msw";

const meta = {
  title: "Components/Tables/ContainerTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const containers = Array(100)
  .fill(0)
  .map(() => ({
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    updated_at: faker.date.anytime().toISOString(),
    challenge_id: faker.string.uuid(),
    command: "echo 'hello world'",
    depends_on: faker.helpers.multiple(() => faker.hacker.noun()),
    environment: faker.helpers.multiple(() =>
      faker.helpers.mustache("{{key}}={{value}}", {
        key: faker.hacker.noun().toUpperCase(),
        value: faker.hacker.noun(),
      }),
    ),
    image: faker.lorem.word(),
    internal: faker.helpers.arrayElement([true, false]),
    memory_limit: faker.number.int(500),
    name: faker.lorem.word(),
    networks: faker.helpers.multiple(() => faker.hacker.noun()),
    ports: faker.helpers.multiple(() => faker.number.int({ min: 12, max: 1024 })),
  }));

const exports = genExports("container", containers);

export const ContainerTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/container", ({ response }) => response(200).json(containers)),
        openapiHttp.post("/admin/container", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/container/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/container/{id}", ({ response }) => response(204).empty()),
        openapiHttp.post("/admin/container/import", ({ response }) =>
          response(200).json({ message: "successfully imported" }),
        ),
        openapiHttp.get("/admin/container/export", ({ response, query }) =>
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
