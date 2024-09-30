import { client } from "@repo/api";
import { TagCreateDialog } from "@/components/admin";
import { tagColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/tag", {
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
        columns={tagColumns}
        actionButton={<TagCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["id", "value"]}
      />
    </div>
  );
}
