import { client } from "@repo/api";
import { HintCreateDialog } from "@/components/admin";
import { hintColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/hint", {
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
        columns={hintColumns}
        actionButton={<HintCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["id", "challenge_id"]}
      />
    </div>
  );
}
