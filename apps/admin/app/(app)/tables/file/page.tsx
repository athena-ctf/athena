import { client } from "@repo/api";
import { FileCreateDialog } from "@/components/admin";
import { fileColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/file", {
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
        columns={fileColumns}
        actionButton={<FileCreateDialog />}
        data={data}
        filters={[
          {
            title: "Backend",
            colName: "backend",
            options: [
              {
                label: "S3 Bucket",
                value: "s3bucket",
              },
              {
                label: "Static File Server",
                value: "server",
              },
            ],
          },
        ]}
        searchableColumns={["id", "challenge_id", "name"]}
      />
    </div>
  );
}
