import {type LucideIcon} from "lucide-react"

import {Collapsible, CollapsibleContent,} from "@/components/ui/collapsible"
import {
    SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom";

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const navigate = useNavigate()
    return (<SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (<Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={item.title} onClick={()=>navigate(item.url)}>
                                {item.icon && <item.icon/>}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (<SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>))}
            </SidebarMenu>
        </SidebarGroup>)
}
