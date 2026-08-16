import { redirect } from "next/navigation";
import { UserRole } from "@/entities/user";
import { getCurrentUser } from "@/entities/user/api";
import { AdminPanel } from "@/features/admin/AdminPanel";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== UserRole.ADMIN) redirect("/dashboard");
  return <AdminPanel />;
}
