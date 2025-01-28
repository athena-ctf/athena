import { BanTable } from "@/components/tables/ban";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/ban")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BanTable />;
}
