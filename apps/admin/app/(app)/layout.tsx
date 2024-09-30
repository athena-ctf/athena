import { getPlayerProfile } from "@/lib/actions";
import { client } from "@repo/api";
import { getConfig } from "@repo/config";
import { SiteHeader } from "@/components/navbar/site-header";
import { LogOut } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

async function getNotifications() {
  const { data, error } = await client.GET("/notification", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error);
  }

  return data;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      {cookies().has("access_token") ? (
        <SiteHeader
          notifications={await getNotifications()}
          playerProfile={await getPlayerProfile()}
          logout={
            <Link href="/auth/logout" className="flex flex-row">
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </Link>
          }
          config={await getConfig()}
        />
      ) : (
        <SiteHeader config={await getConfig()} />
      )}
      {children}
    </>
  );
}
