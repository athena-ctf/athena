import { client } from "@repo/api";
import { AchievementCreateDialog } from "@/components/admin";
import { achievementColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/achievement", {
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
        columns={achievementColumns}
        actionButton={<AchievementCreateDialog />}
        data={data}
        filters={[]}
        searchableColumns={["value", "id", "challenge_id", "player_id", "team_id"]}
      />
    </div>
  );
}
