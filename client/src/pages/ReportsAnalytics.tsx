import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, Pill, Users, Calendar, Download } from "lucide-react";
import { useLocation } from "wouter";

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalRevenue: 125430.50,
    monthlyRevenue: 15420.75,
    totalPrescriptions: 1247,
    monthlyPrescriptions: 156,
    activePatients: 342,
    newPatientsThisMonth: 23,
    averageOrderValue: 87.50,
    inventoryTurnover: 4.2
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 12500, prescriptions: 142 },
    { month: "Feb", revenue: 13200, prescriptions: 138 },
    { month: "Mar", revenue: 14100, prescriptions: 152 },
    { month: "Apr", revenue: 13800, prescriptions: 149 },
    { month: "May", revenue: 15200, prescriptions: 165 },
    { month: "Jun", revenue: 15800, prescriptions: 172 },
    { month: "Jul", revenue: 16200, prescriptions: 178 },
    { month: "Aug", revenue: 15900, prescriptions: 171 },
    { month: "Sep", revenue: 14500, prescriptions: 158 },
    { month: "Oct", revenue: 13800, prescriptions: 152 },
    { month: "Nov", revenue: 14200, prescriptions: 156 },
    { month: "Dec", revenue: 15420, prescriptions: 164 }
  ],
  topMedications: [
    { name: "Lisinopril 10mg", prescriptions: 89, revenue: 1246.00, percentage: 15.2 },
    { name: "Metformin 500mg", prescriptions: 76, revenue: 988.00, percentage: 13.1 },
    { name: "Amlodipine 5mg", prescriptions: 68, revenue: 884.00, percentage: 11.7 },
    { name: "Omeprazole 20mg", prescriptions: 62, revenue: 806.00, percentage: 10.7 },
    { name: "Simvastatin 20mg", prescriptions: 55, revenue: 715.00, percentage: 9.5 },
    { name: "Levothyroxine 50mcg", prescriptions: 48, revenue: 624.00, percentage: 8.3 },
    { name: "Ibuprofen 600mg", prescriptions: 42, revenue: 546.00, percentage: 7.2 },
    { name: "Albuterol Inhaler", prescriptions: 38, revenue: 494.00, percentage: 6.5 },
    { name: "Warfarin 5mg", prescriptions: 32, revenue: 416.00, percentage: 5.5 },
    { name: "Furosemide 40mg", prescriptions: 28, revenue: 364.00, percentage: 4.8 }
  ],
  inventoryAlerts: [
    { medication: "Amoxicillin 500mg", currentStock: 25, minStock: 50, status: "Low Stock" },
    { medication: "Insulin Injection", currentStock: 0, minStock: 20, status: "Out of Stock" },
    { medication: "Blood Pressure Monitor", currentStock: 8, minStock: 5, status: "Good" },
    { medication: "Bandages 2\"", currentStock: 75, minStock: 25, status: "Good" },
    { medication: "Ibuprofen 200mg", currentStock: 25, minStock: 30, status: "Low Stock" }
  ],
  patientDemographics: {
    ageGroups: [
      { range: "18-30", count: 45, percentage: 13.2 },
      { range: "31-45", count: 78, percentage: 22.8 },
      { range: "46-60", count: 112, percentage: 32.7 },
      { range: "61-75", count: 89, percentage: 26.0 },
      { range: "75+", count: 18, percentage: 5.3 }
    ],
    insuranceTypes: [
      { type: "Private Insurance", count: 156, percentage: 45.6 },
      { type: "Medicare", count: 98, percentage: 28.7 },
      { type: "Medicaid", count: 67, percentage: 19.6 },
      { type: "Self-Pay", count: 21, percentage: 6.1 }
    ]
  }
};

export default function ReportsAnalytics() {
  const [, setLocation] = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState("12months");
  const [selectedReport, setSelectedReport] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Reports & Analytics</h1>
                  <p className="text-sm text-gray-600">Generate reports and analyze pharmacy performance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>Total Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(mockAnalytics.overview.totalRevenue)}</div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-500">vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <Pill className="h-4 w-4" />
                <span>Total Prescriptions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.totalPrescriptions.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+8.3%</span>
                <span className="text-gray-500">vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Active Patients</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.activePatients}</div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{mockAnalytics.overview.newPatientsThisMonth}</span>
                <span className="text-gray-500">new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>Avg Order Value</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(mockAnalytics.overview.averageOrderValue)}</div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-red-600">-2.1%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "revenue", label: "Revenue Trends" },
                { id: "medications", label: "Top Medications" },
                { id: "inventory", label: "Inventory Status" },
                { id: "patients", label: "Patient Demographics" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedReport(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedReport === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Report Content */}
        {selectedReport === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Revenue and prescription trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Month Revenue</span>
                    <span className="text-lg font-bold">{formatCurrency(mockAnalytics.overview.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Month Prescriptions</span>
                    <span className="text-lg font-bold">{mockAnalytics.overview.monthlyPrescriptions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Inventory Turnover Ratio</span>
                    <span className="text-lg font-bold">{mockAnalytics.overview.inventoryTurnover}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Patient Retention Rate</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">On-Time Delivery</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">98.7%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">4.8/5.0</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedReport === "revenue" && (
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and prescription data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Prescriptions</TableHead>
                      <TableHead>Avg per Prescription</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.monthlyRevenue.map((data, index) => {
                      const prevData = index > 0 ? mockAnalytics.monthlyRevenue[index - 1] : null;
                      const revenueGrowth = prevData ? ((data.revenue - prevData.revenue) / prevData.revenue) * 100 : 0;
                      const avgPerRx = data.revenue / data.prescriptions;

                      return (
                        <TableRow key={data.month}>
                          <TableCell className="font-medium">{data.month} 2024</TableCell>
                          <TableCell>{formatCurrency(data.revenue)}</TableCell>
                          <TableCell>{data.prescriptions}</TableCell>
                          <TableCell>{formatCurrency(avgPerRx)}</TableCell>
                          <TableCell>
                            <div className={`flex items-center space-x-1 ${
                              revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {revenueGrowth >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span>{revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedReport === "medications" && (
          <Card>
            <CardHeader>
              <CardTitle>Top Medications</CardTitle>
              <CardDescription>Most prescribed medications by volume and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Prescriptions</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>% of Total</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.topMedications.map((med) => (
                      <TableRow key={med.name}>
                        <TableCell className="font-medium">{med.name}</TableCell>
                        <TableCell>{med.prescriptions}</TableCell>
                        <TableCell>{formatCurrency(med.revenue)}</TableCell>
                        <TableCell>{formatPercentage(med.percentage)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            +{Math.floor(Math.random() * 15) + 5}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedReport === "inventory" && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status Report</CardTitle>
              <CardDescription>Current stock levels and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Minimum Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.inventoryAlerts.map((item) => (
                      <TableRow key={item.medication}>
                        <TableCell className="font-medium">{item.medication}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.status === "Out of Stock" ? "destructive" :
                                   item.status === "Low Stock" ? "secondary" : "secondary"}
                            className={item.status === "Good" ? "bg-green-100 text-green-800" :
                                     item.status === "Low Stock" ? "bg-orange-100 text-orange-800" : ""}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.status !== "Good" && (
                            <Button variant="outline" size="sm">
                              {item.status === "Out of Stock" ? "Order Now" : "Restock"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedReport === "patients" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Age Demographics</CardTitle>
                <CardDescription>Patient distribution by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.patientDemographics.ageGroups.map((group) => (
                    <div key={group.range} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{group.range} years</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{formatPercentage(group.percentage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Distribution</CardTitle>
                <CardDescription>Patient insurance coverage breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.patientDemographics.insuranceTypes.map((insurance) => (
                    <div key={insurance.type} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{insurance.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${insurance.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{formatPercentage(insurance.percentage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}