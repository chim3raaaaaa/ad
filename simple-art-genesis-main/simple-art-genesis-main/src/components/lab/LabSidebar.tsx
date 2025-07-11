import { 
  LayoutDashboard, 
  Bell, 
  Package, 
  FileText, 
  Grid3x3,
  AlertTriangle,
  FileBarChart,
  BarChart3,
  Users,
  Zap,
  TrendingUp,
  Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Package, label: "Memo Management", path: "/" },
  { icon: FileText, label: "Test Requests", path: "/test-requests" },
  { icon: Grid3x3, label: "Test Modules", path: "/test-modules" },
  { icon: FileBarChart, label: "Report Designer", path: "/report-designer" },
  { icon: BarChart3, label: "Generate Reports", path: "/reports" },
  { icon: Users, label: "User & Roles", path: "/users" },
  { icon: Zap, label: "SMTP Integrations", path: "/integrations" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function LabSidebar() {
  return (
    <div className="w-64 bg-lab-sidebar-bg text-lab-sidebar-text h-screen flex flex-col">
      <div className="p-6 border-b border-lab-sidebar-hover">
        <h1 className="text-xl font-semibold">UBP Mauritius Lab App</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-lab-sidebar-active text-white"
                      : "hover:bg-lab-sidebar-hover"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}