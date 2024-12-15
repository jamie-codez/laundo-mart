import * as React from "react"
import {AudioWaveform, BuildingIcon, Command, GalleryVerticalEnd, LayoutDashboard, PieChart, TicketsIcon, UsersIcon, WalletIcon,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
    },
    {
      title: "Tickets",
      url: "/tickets",
      icon: TicketsIcon,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: WalletIcon,
    },
    {
      title: "Role",
      url: "/roles",
      icon: BuildingIcon,
    },
    {
      title: "Service",
      url: "/services",
      icon: PieChart,
    }
  ],
  settings: [
    {
      name: "Role",
      url: "/roles",
      icon: BuildingIcon,
    },
    {
      name: "Service",
      url: "/services",
      icon: PieChart,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.settings} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
