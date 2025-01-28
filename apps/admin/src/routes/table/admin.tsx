import { AdminTable } from "@/components/tables/admin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminTable />;
}
