import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "../custom/sidebar/appSidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "4rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
