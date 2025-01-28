import { HintTable } from "@/components/tables/hint";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/hint")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HintTable />;
}
