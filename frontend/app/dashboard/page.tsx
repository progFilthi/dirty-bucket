// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UploadPage from "./upload/page";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/login");
  }

  return (
    <div>
      <UploadPage />
    </div>
  );
}
