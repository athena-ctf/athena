import { client } from "@repo/api";
import { playerTeamColumns } from "@repo/ui/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/team/points", {
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
        columns={playerTeamColumns}
        data={data}
        filters={[]}
        searchableColumns={[]}
      />
    </div>
  );
}
