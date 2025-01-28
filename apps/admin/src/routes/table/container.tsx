import { ContainerTable } from "@/components/tables/container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/container")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContainerTable />;
}
