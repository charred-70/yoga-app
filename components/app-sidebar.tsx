import Link from 'next/link';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Routine 1",
        url: "#",
    },
    {
        title: "Routine 2",
        url: "#",
    },
    {
        title: "Routine 3",
        url: "#",
    },
    {
        title: "Routine 4",
        url: "#",
    },
    {
        title: "Routine 5",
        url: "#",
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <Link href="/">
                        <div className="text-2xl font-bold bg-linear-to-r from-pink-300 to-red-400 bg-clip-text text-transparent">
                            website name
                        </div>
                    </Link>
                    <SidebarGroupLabel>Saved Routines</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}