import { client } from "@repo/api";
import { InstanceCreateDialog } from "@/components/admin";
import { instanceColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/instance", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={instanceColumns}
        actionButton={<InstanceCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["challenge_id", "player_id", "id"]}
      />
    </div>
  );
}
