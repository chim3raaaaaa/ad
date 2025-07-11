import { LabLayout } from "@/components/lab/LabLayout";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Batch BC-3205 requires attention",
    message: "Sample type is pending verification",
    time: "2 minutes ago",
    icon: AlertTriangle,
    color: "text-destructive"
  },
  {
    id: 2,
    type: "info",
    title: "New test results available",
    message: "Batch BC-3201 analysis completed",
    time: "15 minutes ago",
    icon: Info,
    color: "text-blue-600"
  },
  {
    id: 3,
    type: "success",
    title: "QC verification completed",
    message: "Batch BC-3202 passed all quality checks",
    time: "1 hour ago",
    icon: CheckCircle,
    color: "text-lab-status-complete"
  }
];

const Notifications = () => {
  return (
    <LabLayout>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-card border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <notification.icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                <div className="flex-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LabLayout>
  );
};

export default Notifications;