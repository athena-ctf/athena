import { client } from "@repo/api";
import { UserCreateDialog } from "@/components/admin";
import { userColumns } from "@/components/admin/columns";
import { DataTable } from "@repo/ui/data-table";
import { cookies } from "next/headers";

async function getData() {
  const { data, error } = await client.GET("/user", {
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
        columns={userColumns}
        actionButton={<UserCreateDialog />}
        data={data}
        filters={[
          {
            title: "Role",
            colName: "role",
            options: [
              {
                label: "Manager",
                value: "manager",
              },
              {
                label: "Player",
                value: "player",
              },
            ],
          },
        ]}
        searchableColumns={["email", "id", "username"]}
      />
    </div>
  );
}
