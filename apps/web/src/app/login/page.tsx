import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/components/global/navbar";
import { LoginClient } from "./login-client";

export const metadata = {
  title: "Login - AihKya",
  description:
    "Sign in to AihKya to save AI tools, write reviews, and get personalized recommendations.",
  robots: { index: false },
};

export default async function LoginPage() {
  const user = await getLoggedInUser();

  if (user) {
    // If the user lands here but is already logged in, send them straight to the dashboard
    redirect("/dashboard");
  }

  return <LoginClient />;
}
