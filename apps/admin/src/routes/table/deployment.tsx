import { DeploymentTable } from "@/components/tables/deployment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/deployment")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DeploymentTable />;
}
