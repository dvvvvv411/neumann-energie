import { useState } from "react";
import { LayoutDashboard, MessageSquare, ShoppingCart, Mail, Settings, Bot, ChevronDown, Send, Phone } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Anfragen", url: "/admin/anfragen", icon: MessageSquare },
  { title: "Bestellungen", url: "/admin/bestellungen", icon: ShoppingCart },
  { title: "Emails", url: "/admin/emails", icon: Mail },
];

const settingsItems = [
  { title: "Telefonnummer", url: "/admin/telefonnummer", icon: Phone },
  { title: "Telegram", url: "/admin/telegram", icon: Bot },
  { title: "Resend", url: "/admin/resend", icon: Send },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  // Check if any settings route is active to keep dropdown open
  const isSettingsActive = settingsItems.some(item => currentPath === item.url);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar>
      <div className="flex items-center justify-center p-4 border-b border-border">
        <img 
          src="/lovable-uploads/neumannlogo.png.png" 
          alt="Neumann Energie" 
          className={isCollapsed ? "h-8 w-auto" : "h-10 w-auto"}
        />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Verwaltung</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Main items */}
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Settings dropdown */}
              <Collapsible 
                open={settingsOpen || isSettingsActive} 
                onOpenChange={setSettingsOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={isSettingsActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span>Einstellungen</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {settingsItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink to={item.url} className={getNavCls}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}