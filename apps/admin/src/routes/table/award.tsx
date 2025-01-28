import { AwardTable } from "@/components/tables/award";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/award")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AwardTable />;
}
