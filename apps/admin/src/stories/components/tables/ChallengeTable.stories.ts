import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeTable as Component } from "@/components/tables/challenge";
import { ctf } from "@/utils/ctf-data";
import { genExports } from "@/utils/gen-exports";
import { openapiHttp } from "@/utils/msw";
import type { components } from "@repo/api";
import { HttpResponse } from "msw";

const meta = {
  title: "Components/Tables/ChallengeTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const challenges = Array(100)
  .fill(0)
  .map(() => ({
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    updated_at: faker.date.anytime().toISOString(),
    author_name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    kind: "dynamic_containerized" as components["schemas"]["ChallengeKindEnum"],
    level: faker.helpers.arrayElement(ctf.levels).value,
    points: faker.number.int(500),
    title: faker.lorem.words(3),
  }));

const exports = genExports("challenge", challenges);

export const ChallengeTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/challenge", ({ response }) => response(200).json(challenges)),
        openapiHttp.post("/admin/challenge", async ({ request, response }) =>
          response(201).json({
            ...(await request.json()),
            id: faker.string.uuid(),
            created_at: faker.date.anytime().toISOString(),
            updated_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.put("/admin/challenge/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.delete("/admin/challenge/{id}", ({ response }) => response(204).empty()),
        openapiHttp.post("/admin/challenge/import", ({ response }) =>
          response(200).json({ message: "successfully imported" }),
        ),
        openapiHttp.get("/admin/challenge/export", ({ response, query }) =>
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
