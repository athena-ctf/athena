import { client } from "@repo/api";
import { InviteCreateDialog } from "@/components/admin";
import { inviteColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/invite", {
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
        columns={inviteColumns}
        actionButton={<InviteCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["id", "team_id"]}
      />
    </div>
  );
}
