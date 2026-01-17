import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full"> {/* Add w-full here */}
                <AppSidebar />
                <main className="flex-1 w-full"> {/* Add flex-1 and w-full */}
                    <SidebarTrigger />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}