import { client } from "@repo/api";
import { FlagCreateDialog } from "@/components/admin";
import { flagColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/flag", {
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
        columns={flagColumns}
        actionButton={<FlagCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["id", "player_id", "challenge_id", "value"]}
      />
    </div>
  );
}
