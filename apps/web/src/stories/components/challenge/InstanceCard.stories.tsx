import type { Meta, StoryObj } from "@storybook/react";

import { InstanceCard as Component } from "@/components/challenge/instance-card";
import { routerDecorator } from "@/utils/routerDecorator";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Challenge/InstanceCard",
  component: Component,
  decorators: [routerDecorator],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const instance_model = {
  container_id: faker.string.alphanumeric(10),
  container_name: faker.lorem.words(2),
  created_at: faker.date.anytime().toISOString(),
  deployment_id: faker.string.uuid(),
  id: faker.string.uuid(),
  port_mapping: ["443:3030", "5432:6000"],
  updated_at: faker.date.anytime().toISOString(),
};

export const Created: Story = {
  args: {
    instance_model,
    state: "Created",
  },
};

export const Running: Story = {
  args: {
    instance_model,
    state: "Running",
  },
};

export const Paused: Story = {
  args: {
    instance_model,
    state: "Paused",
  },
};

export const Restarting: Story = {
  args: {
    instance_model,
    state: "Restarting",
  },
};

export const Removing: Story = {
  args: {
    instance_model,
    state: "Removing",
  },
};

export const Exited: Story = {
  args: {
    instance_model,
    state: "Exited",
  },
};

export const Dead: Story = {
  args: {
    instance_model,
    state: "Dead",
  },
};
