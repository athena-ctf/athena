import { BanCreateDialog } from "@/components/admin";
import { banColumns } from "@/components/admin/columns";
import { client } from "@repo/api";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/ban", {
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
        columns={banColumns}
        actionButton={<BanCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["id", "reason"]}
      />
    </div>
  );
}
