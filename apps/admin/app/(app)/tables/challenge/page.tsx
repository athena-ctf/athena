import { ChallengeCreateDialog } from "@/components/admin";
import { client } from "@repo/api";
import { challengeColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/challenge", {
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
        columns={challengeColumns}
        actionButton={<ChallengeCreateDialog />}
        data={data}
        filters={[
          {
            title: "Difficulty",
            colName: "difficulty",
            options: [
              {
                label: "Easy",
                value: "easy",
              },
              {
                label: "Medium",
                value: "medium",
              },
              {
                label: "Hard",
                value: "hard",
              },
              {
                label: "Extreme",
                value: "extreme",
              },
            ],
          },
          {
            title: "Status",
            colName: "status",
            options: [
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Maintenance",
                value: "maintenance",
              },
              {
                label: "Scheduled",
                value: "scheduled",
              },
            ],
          },
        ]}
        searchableColumns={["id", "author_name", "description", "title"]}
      />
    </div>
  );
}
