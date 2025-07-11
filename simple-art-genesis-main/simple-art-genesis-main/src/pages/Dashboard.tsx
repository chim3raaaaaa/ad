import { LabLayout } from "@/components/lab/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const testRequestsData = [
  { name: "Jan", pending: 15, inProgress: 8, completed: 22 },
  { name: "Feb", pending: 12, inProgress: 6, completed: 28 },
  { name: "Mar", pending: 18, inProgress: 12, completed: 25 },
  { name: "Apr", pending: 14, inProgress: 9, completed: 30 },
  { name: "May", pending: 16, inProgress: 11, completed: 27 },
  { name: "Jun", pending: 10, inProgress: 7, completed: 33 }
];

const testStatusData = [
  { name: "Passed", value: 75, color: "#22c55e" },
  { name: "Failed", value: 15, color: "#ef4444" },
  { name: "Pending", value: 10, color: "#f59e0b" }
];

const monthlyTrendsData = [
  { month: "Jan", tests: 45, compliance: 92 },
  { month: "Feb", tests: 52, compliance: 95 },
  { month: "Mar", tests: 58, compliance: 89 },
  { month: "Apr", tests: 48, compliance: 97 },
  { month: "May", tests: 61, compliance: 94 },
  { month: "Jun", tests: 67, compliance: 98 }
];

const Dashboard = () => {
  return (
    <LabLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Memos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lab-status-pending">12</div>
              <p className="text-xs text-muted-foreground">-3 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">7</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-lab-status-complete">8</div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Requests Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={testRequestsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pending" fill="#f59e0b" />
                  <Bar dataKey="inProgress" fill="#3b82f6" />
                  <Bar dataKey="completed" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Results Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={testStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {testStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="tests" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Total Tests"
                />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Compliance Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
};

export default Dashboard;