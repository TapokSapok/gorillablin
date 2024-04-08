import AdminSidebar from "@/components/layout/admin-sidebar/AdminSidebar";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminSidebar />
      {children}
    </>
  );
}
