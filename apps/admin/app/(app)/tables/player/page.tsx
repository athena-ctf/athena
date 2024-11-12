import { client } from "@repo/api";
import { PlayerCreateDialog } from "@/components/admin";
import { playerColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/player", {
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
        columns={playerColumns}
        actionButton={<PlayerCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["display_name", "id", "team_id", "user_id", "ban_id"]}
      />
    </div>
  );
}
