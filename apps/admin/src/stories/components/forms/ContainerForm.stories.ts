import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";

import { ContainerForm as Component } from "@/components/forms/container";
import { cardDecorator } from "@/utils/decorators";
import { openapiHttp } from "@/utils/msw";

const meta = {
  title: "Components/Forms/ContainerForm",
  component: Component,
  decorators: [cardDecorator("Create container form")],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateForm: Story = {
  args: {
    onSuccess() {
      console.log("created");
    },
    kind: "create",
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.post("/admin/container", ({ response }) =>
          response(201).json({
            created_at: faker.date.anytime().toISOString(),
            id: faker.string.uuid(),
            updated_at: faker.date.anytime().toISOString(),
            challenge_id: faker.string.uuid(),
            command: [],
            depends_on: [],
            environment: [],
            image: faker.lorem.word(),
            internal: false,
            memory_limit: faker.number.int(500),
            name: faker.lorem.word(),
            networks: [],
            ports: [],
          }),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(3) })),
          ),
        ),
      ],
    },
  },
};

export const UpdateForm: Story = {
  args: {
    onSuccess() {
      console.log("updated");
    },
    kind: "update",
    defaultValues: {
      created_at: faker.date.anytime().toISOString(),
      id: faker.string.uuid(),
      updated_at: faker.date.anytime().toISOString(),
      challenge_id: faker.string.uuid(),
      command: [],
      depends_on: [],
      environment: [],
      image: faker.lorem.word(),
      internal: false,
      memory_limit: faker.number.int(500),
      name: faker.lorem.word(),
      networks: [],
      ports: [],
    },
  },
  parameters: {
    msw: {
      handlers: [
        openapiHttp.put("/admin/container/{id}", async ({ request, response, params: { id } }) =>
          response(200).json({
            ...(await request.json()),
            id,
            updated_at: faker.date.anytime().toISOString(),
            created_at: faker.date.anytime().toISOString(),
          }),
        ),
        openapiHttp.get("/admin/challenge/ids", ({ response }) =>
          response(200).json(
            Array(10)
              .fill(0)
              .map(() => ({ id: faker.string.uuid(), title: faker.lorem.words(3) })),
          ),
        ),
      ],
    },
  },
};
