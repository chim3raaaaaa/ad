import { LabLayout } from "@/components/lab/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Mail, Server, Settings, CheckCircle, XCircle, AlertCircle, Send } from "lucide-react";

export default function Integrations() {
  return (
    <LabLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">SMTP Integrations</h1>
            <p className="text-muted-foreground">
              Configure email settings and SMTP connections
            </p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure SMTP
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Status</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-lg font-semibold">Connected</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent Today</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Email</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">2 hours ago</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Port</Label>
                  <Input id="smtpPort" defaultValue="587" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="lab@ubpmauritius.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input id="fromEmail" defaultValue="noreply@ubpmauritius.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" defaultValue="UBP Mauritius Lab" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Use SSL/TLS</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable secure connection
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentication Required</Label>
                  <p className="text-sm text-muted-foreground">
                    SMTP server requires authentication
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "Test Completion Notification", status: "Active", lastUsed: "2 hours ago" },
                  { name: "Test Request Confirmation", status: "Active", lastUsed: "1 day ago" },
                  { name: "Weekly Report Summary", status: "Active", lastUsed: "3 days ago" },
                  { name: "System Alert Notification", status: "Inactive", lastUsed: "1 week ago" }
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">Last used: {template.lastUsed}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={template.status === "Active" 
                          ? "bg-green-500/20 text-green-700 border-green-500/30"
                          : "bg-gray-500/20 text-gray-700 border-gray-500/30"
                        }
                      >
                        {template.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Add New Template
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  recipient: "john.smith@client.com",
                  subject: "Test Results - AGG-001",
                  status: "Delivered",
                  timestamp: "2024-01-15 14:30",
                  type: "Test Completion"
                },
                {
                  recipient: "sarah.johnson@ubpmauritius.com",
                  subject: "Weekly Lab Report",
                  status: "Delivered",
                  timestamp: "2024-01-15 12:15",
                  type: "Report"
                },
                {
                  recipient: "mike.davis@contractor.com",
                  subject: "Test Request Confirmation",
                  status: "Failed",
                  timestamp: "2024-01-15 10:45",
                  type: "Confirmation"
                },
                {
                  recipient: "admin@ubpmauritius.com",
                  subject: "System Alert - High Volume",
                  status: "Delivered",
                  timestamp: "2024-01-15 09:20",
                  type: "Alert"
                }
              ].map((email, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{email.subject}</h4>
                      <Badge variant="outline" className="text-xs">
                        {email.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To: {email.recipient} • {email.timestamp}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {email.status === "Delivered" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : email.status === "Failed" ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <Badge 
                      className={
                        email.status === "Delivered" 
                          ? "bg-green-500/20 text-green-700 border-green-500/30"
                          : email.status === "Failed"
                          ? "bg-red-500/20 text-red-700 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                      }
                    >
                      {email.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button variant="outline">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
}