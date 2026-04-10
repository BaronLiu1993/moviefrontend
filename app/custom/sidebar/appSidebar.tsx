"use client";

import { Home, Bookmark, TrendingUp, Settings, List, Film, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", icon: <Home className="!size-8 stroke-[1.5px]" />, href: "/home" },
  { title: "Trending", icon: <LayoutDashboard className="!size-8 stroke-[1.5px]" />, href: "/trending" },
  { title: "Bookmarks", icon: <Bookmark className="!size-8 stroke-[1.5px]" />, href: "/bookmarks" },
  { title: "Settings", icon: <Settings className="!size-8 stroke-[1.5px]" />, href: "/settings" },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className = "py-5">
                  <SidebarMenuButton asChild>
                    <a className = "h-10 w-10" href={item.href}>
                      {item.icon}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
