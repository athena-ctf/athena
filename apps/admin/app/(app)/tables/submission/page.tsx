import { client } from "@repo/api";
import { SubmissionCreateDialog } from "@/components/admin";
import { submissionColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/submission", {
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
        columns={submissionColumns}
        actionButton={<SubmissionCreateDialog />}
        data={data}
        filters={[
          {
            title: "Status",
            colName: "status",
            options: [
              {
                label: "Pass",
                value: "pass",
              },
              {
                label: "Fail",
                value: "fail",
              },
            ],
          },
        ]}
        searchableColumns={["challenge_id", "player_id", "id"]}
      />
    </div>
  );
}
