import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@repo/ui/columns";
import { DataTable } from "@repo/ui/data-table";
import { UserNav } from "@repo/ui/user-nav";
import { ticketSchema } from "/data/schema";

export const metadata: Metadata = {
  title: "tickets",
  description: "A ticket and issue tracker build using Tanstack Table.",
};
async function gettickets() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(app)/examples/tickets/data/tickets.json"),
  );

  const tickets = JSON.parse(data.toString());

  return z.array(ticketSchema).parse(tickets);
}

export default async function Page() {
  const tickets = await gettickets();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tickets-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tickets-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tickets for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tickets} columns={columns} />
      </div>
    </>
  );
}
