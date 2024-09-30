import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  redirect("/auth/login");

  return <></>;
}
