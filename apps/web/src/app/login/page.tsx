import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/components/global/navbar";
import { LoginClient } from "./login-client";

export default async function LoginPage() {
  const user = await getLoggedInUser();

  if (user) {
    // If the user lands here but is already logged in, send them straight to the dashboard
    redirect("/dashboard");
  }

  return <LoginClient />;
}
