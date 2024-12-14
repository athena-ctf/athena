import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ChallengeTable as Component } from "@/components/tables/challenge";
import { openapiHttp } from "@/utils/msw";
import { ctf } from "@/utils/ctf-data";

const meta = {
  title: "Components/Tables/ChallengeTable",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChallengeTable: Story = {
  parameters: {
    msw: {
      handlers: [
        openapiHttp.get("/admin/challenge", ({ response }) =>
          response(200).json(
            Array(100)
              .fill(0)
              .map(() => ({
                created_at: faker.date.anytime().toISOString(),
                id: faker.string.uuid(),
                updated_at: faker.date.anytime().toISOString(),
                author_name: faker.person.fullName(),
                description: faker.lorem.paragraph(),
                kind: "dynamic_containerized",
                level: faker.helpers.arrayElement(ctf.levels).value,
                points: faker.number.int(500),
                title: faker.lorem.words(3),
              })),
          ),
        ),
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
        openapiHttp.delete("/admin/challenge/{id}", async ({ response }) => response(204).empty()),
      ],
    },
  },
};
