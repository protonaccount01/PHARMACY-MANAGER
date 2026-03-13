import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Search, Users, Calendar, Pill, Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const PATIENTS_STORAGE_KEY = "pharmacy_patients";

// Mock patient data
const initialPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main St, Anytown, USA",
    insurance: "Blue Cross Blue Shield",
    allergies: ["Penicillin", "Sulfa drugs"],
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    prescriptions: [
      {
        id: 101,
        medication: "Lisinopril 10mg",
        dosage: "1 tablet daily",
        prescribedDate: "2024-01-15",
        refillsRemaining: 3,
        prescribingDoctor: "Dr. Sarah Johnson"
      },
      {
        id: 102,
        medication: "Metformin 500mg",
        dosage: "2 tablets twice daily",
        prescribedDate: "2024-01-15",
        refillsRemaining: 2,
        prescribingDoctor: "Dr. Sarah Johnson"
      }
    ]
  },
  {
    id: 2,
    name: "Mary Johnson",
    age: 32,
    gender: "Female",
    phone: "(555) 234-5678",
    email: "mary.johnson@email.com",
    address: "456 Oak Ave, Somewhere, USA",
    insurance: "Aetna",
    allergies: ["None reported"],
    medicalConditions: ["Asthma"],
    prescriptions: [
      {
        id: 201,
        medication: "Albuterol Inhaler",
        dosage: "2 puffs as needed",
        prescribedDate: "2024-02-01",
        refillsRemaining: 1,
        prescribingDoctor: "Dr. Michael Chen"
      }
    ]
  },
  {
    id: 3,
    name: "Robert Davis",
    age: 67,
    gender: "Male",
    phone: "(555) 345-6789",
    email: "robert.davis@email.com",
    address: "789 Pine Rd, Elsewhere, USA",
    insurance: "Medicare",
    allergies: ["Aspirin", "Codeine"],
    medicalConditions: ["Arthritis", "High Cholesterol"],
    prescriptions: [
      {
        id: 301,
        medication: "Ibuprofen 600mg",
        dosage: "1 tablet every 8 hours as needed",
        prescribedDate: "2024-01-20",
        refillsRemaining: 5,
        prescribingDoctor: "Dr. Emily Rodriguez"
      },
      {
        id: 302,
        medication: "Atorvastatin 20mg",
        dosage: "1 tablet daily",
        prescribedDate: "2024-01-20",
        refillsRemaining: 3,
        prescribingDoctor: "Dr. Emily Rodriguez"
      }
    ]
  },
  {
    id: 4,
    name: "Lisa Wilson",
    age: 28,
    gender: "Female",
    phone: "(555) 456-7890",
    email: "lisa.wilson@email.com",
    address: "321 Elm St, Nowhere, USA",
    insurance: "United Healthcare",
    allergies: ["Latex"],
    medicalConditions: ["Migraine"],
    prescriptions: [
      {
        id: 401,
        medication: "Sumatriptan 50mg",
        dosage: "1 tablet at onset of migraine",
        prescribedDate: "2024-02-10",
        refillsRemaining: 2,
        prescribingDoctor: "Dr. David Kim"
      }
    ]
  }
];

export default function PatientRecords() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(() => {
    try {
      const stored = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialPatients;
    } catch {
      return initialPatients;
    }
  });
  const [selectedPatient, setSelectedPatient] = useState<typeof initialPatients[0] | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    insurance: "",
    allergies: "",
    medicalConditions: ""
  });

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
    } catch {
      // ignore storage errors
    }
  }, [patients]);

  const handleAddPatient = () => {
    const nextId = Math.max(0, ...patients.map((p) => p.id)) + 1;
    const newPatientEntry = {
      id: nextId,
      name: newPatient.name || "New Patient",
      age: Number(newPatient.age) || 0,
      gender: newPatient.gender || "",
      phone: newPatient.phone || "",
      email: newPatient.email || "",
      address: newPatient.address || "",
      insurance: newPatient.insurance || "",
      allergies: newPatient.allergies
        ? newPatient.allergies.split(",").map((s) => s.trim())
        : ["None reported"],
      medicalConditions: newPatient.medicalConditions
        ? newPatient.medicalConditions.split(",").map((s) => s.trim())
        : [],
      prescriptions: []
    };

    setPatients((prev) => {
      const next = [newPatientEntry, ...prev];
      try {
        window.localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });

    setNewPatient({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      insurance: "",
      allergies: "",
      medicalConditions: ""
    });
    setIsAddOpen(false);
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
                <Users className="h-6 w-6 text-green-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Patient Records</h1>
                  <p className="text-sm text-gray-600">Access patient information and prescription history</p>
                </div>
              </div>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Patient</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <DialogDescription>
                    Create a new patient record to track prescriptions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Age</label>
                      <Input
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                        placeholder="e.g. 35"
                        type="number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gender</label>
                      <Input
                        value={newPatient.gender}
                        onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                        placeholder="e.g. Female"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <Input
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Insurance</label>
                    <Input
                      value={newPatient.insurance}
                      onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
                      placeholder="e.g. Blue Cross Blue Shield"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allergies (comma separated)</label>
                    <Input
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                      placeholder="e.g. Penicillin, Sulfa drugs"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Medical Conditions (comma separated)</label>
                    <Input
                      value={newPatient.medicalConditions}
                      onChange={(e) => setNewPatient({ ...newPatient, medicalConditions: e.target.value })}
                      placeholder="e.g. Hypertension, Diabetes"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPatient}>Save Patient</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{patients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {patients.reduce((total, patient) => total + patient.prescriptions.length, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Low Refills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {patients.reduce((total, patient) =>
                  total + patient.prescriptions.filter(p => p.refillsRemaining <= 1).length, 0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Directory</CardTitle>
            <CardDescription>Search and manage patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Patient Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Active Prescriptions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age} / {patient.gender}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{patient.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.insurance}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {patient.prescriptions.length} active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <span>{patient.name} - Patient Details</span>
                              </DialogTitle>
                              <DialogDescription>
                                Complete patient information and prescription history
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* Basic Info */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Age</label>
                                    <p className="text-sm">{patient.age} years</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Gender</label>
                                    <p className="text-sm">{patient.gender}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                                      <Phone className="h-3 w-3" />
                                      <span>Phone</span>
                                    </label>
                                    <p className="text-sm">{patient.phone}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                                      <Mail className="h-3 w-3" />
                                      <span>Email</span>
                                    </label>
                                    <p className="text-sm">{patient.email}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>Address</span>
                                    </label>
                                    <p className="text-sm">{patient.address}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-600">Insurance</label>
                                    <p className="text-sm">{patient.insurance}</p>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Medical Info */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Medical Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Allergies</label>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {patient.allergies.map((allergy, index) => (
                                        <Badge key={index} variant="destructive" className="text-xs">
                                          {allergy}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {patient.medicalConditions.map((condition, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {condition}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Prescriptions */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg flex items-center space-x-2">
                                    <Pill className="h-5 w-5" />
                                    <span>Active Prescriptions</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {patient.prescriptions.map((prescription) => (
                                      <div key={prescription.id} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                                            <p className="text-sm text-gray-600">{prescription.dosage}</p>
                                          </div>
                                          <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                              <Calendar className="h-4 w-4 text-gray-400" />
                                              <span className="text-sm">Prescribed: {prescription.prescribedDate}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Badge
                                                variant={prescription.refillsRemaining <= 1 ? "destructive" : "secondary"}
                                                className="text-xs"
                                              >
                                                {prescription.refillsRemaining} refills remaining
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-2 pt-2 border-t">
                                          <p className="text-sm text-gray-600">
                                            Prescribing Doctor: {prescription.prescribingDoctor}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No patients found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}