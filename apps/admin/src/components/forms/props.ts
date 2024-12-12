import type { components } from "@repo/api";

export const buttonText = {
  create: "Create",
  update: "Update",
} as const;

type SchemaKeys = {
  [K in keyof components["schemas"]]: K extends `${string}Model`
    ? K extends `${string}_${string}`
      ? never
      : K
    : never;
}[keyof components["schemas"]];

interface _FormProps<K extends SchemaKeys> {
  single: {
    onSuccess: (model: components["schemas"][K]) => void;
  } & (
    | { kind: "create"; defaultValues?: undefined }
    | { kind: "update"; defaultValues: components["schemas"][K] }
  );
  join_create: {
    onSuccess: (model: components["schemas"][K]) => void;
    kind: "create";
  };
  join_update: {
    onSuccess: (model: components["schemas"][K]) => void;
    kind: "update";
    oldModel: components["schemas"][K];
  };
}

export type FormProps<
  K extends SchemaKeys,
  T extends keyof _FormProps<K> = "single",
> = _FormProps<K>[T];
