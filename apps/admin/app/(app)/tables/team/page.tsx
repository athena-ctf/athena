import { client } from "@repo/api";
import { TeamCreateDialog } from "@/components/admin";
import { teamColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/team", {
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
        columns={teamColumns}
        actionButton={<TeamCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["name", "id", "email", "ban_id"]}
      />
    </div>
  );
}
