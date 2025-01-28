import { FlagTable } from "@/components/tables/flag";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/flag")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FlagTable />;
}
