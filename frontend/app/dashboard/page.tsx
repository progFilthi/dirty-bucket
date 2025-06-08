// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>This is the dashboard page</h1>
    </div>
  );
}
