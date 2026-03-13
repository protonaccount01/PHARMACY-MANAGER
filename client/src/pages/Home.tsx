import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Users, BarChart3, MapPin, Phone, Mail } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Pharmacy Management System - Home Page
 * Main dashboard for pharmacy operations
 */
export default function Home() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Pill className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PharmaCare</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              MVP Version
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to PharmaCare
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your comprehensive pharmacy management solution. Streamline operations,
            manage inventory, and provide better patient care.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-blue-600" />
                <span>Inventory Management</span>
              </CardTitle>
              <CardDescription>
                Track medications, supplies, and stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setLocation("/inventory")}>Manage Inventory</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Patient Records</span>
              </CardTitle>
              <CardDescription>
                Access patient information and prescription history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setLocation("/patients")}>View Patients</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Reports & Analytics</span>
              </CardTitle>
              <CardDescription>
                Generate reports and analyze pharmacy performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setLocation("/reports")}>View Reports</Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Inventory Tracking</h4>
                  <p className="text-gray-600">Monitor stock levels and receive low-stock alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Prescription Management</h4>
                  <p className="text-gray-600">Process and track prescriptions efficiently</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Patient Safety</h4>
                  <p className="text-gray-600">Built-in checks for drug interactions and allergies</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Compliance Ready</h4>
                  <p className="text-gray-600">Meets regulatory requirements and standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Mobile Access</h4>
                  <p className="text-gray-600">Access system from any device, anywhere</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">24/7 Support</h4>
                  <p className="text-gray-600">Round-the-clock technical support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Contact Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">123 Pharmacy Street</span>
              <span className="text-sm text-gray-600">Medical District, MD 12345</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Phone className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">(555) 123-4567</span>
              <span className="text-sm text-gray-600">Emergency: (555) 911-PHARMA</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">support@pharmacare.com</span>
              <span className="text-sm text-gray-600">Mon-Fri 9AM-6PM</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 PharmaCare Management System. All rights reserved.</p>
            <p className="mt-1">Licensed healthcare software solution.</p>
            <p className="mt-1">Developed by - Muhammed Taher Khan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
