import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../custom/sidebar/appSidebar";
import { CreatePanelProvider } from "../custom/sidebar/createPanelContext";

export default function TrendingLayout({ children }: { children: React.ReactNode }) {
  return (
    <CreatePanelProvider token="">
      <SidebarProvider style={{ "--sidebar-width": "4rem" } as React.CSSProperties}>
        <AppSidebar />
        <main className="flex-1" style={{ marginLeft: "var(--sidebar-width)" }}>
          {children}
        </main>
      </SidebarProvider>
    </CreatePanelProvider>
  );
}
