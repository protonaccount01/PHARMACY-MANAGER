import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Search, Pill, AlertTriangle, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

// Mock inventory data
const STORAGE_KEY = "pharmacy_inventory";

type InventoryStatus = "in-stock" | "low-stock" | "out-of-stock";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  expiryDate: string;
  status: InventoryStatus;
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    stock: 150,
    minStock: 50,
    maxStock: 200,
    unit: "capsules",
    expiryDate: "2025-06-15",
    status: "in-stock"
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    stock: 25,
    minStock: 30,
    maxStock: 150,
    unit: "tablets",
    expiryDate: "2024-12-01",
    status: "low-stock"
  },
  {
    id: 3,
    name: "Insulin Injection",
    category: "Diabetes",
    stock: 0,
    minStock: 20,
    maxStock: 100,
    unit: "vials",
    expiryDate: "2024-08-30",
    status: "out-of-stock"
  },
  {
    id: 4,
    name: "Bandages 2\"",
    category: "First Aid",
    stock: 75,
    minStock: 25,
    maxStock: 100,
    unit: "pieces",
    expiryDate: "2026-01-15",
    status: "in-stock"
  },
  {
    id: 5,
    name: "Blood Pressure Monitor",
    category: "Medical Equipment",
    stock: 8,
    minStock: 5,
    maxStock: 20,
    unit: "units",
    expiryDate: "N/A",
    status: "in-stock"
  }
];

export default function Inventory() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as InventoryItem[]) : [...mockInventory];
    } catch {
      return [...mockInventory];
    }
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [restockingItem, setRestockingItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState(0);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    expiryDate: "",
  });

  const [editItem, setEditItem] = useState({
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    expiryDate: "",
  });

  const resetNewItem = () =>
    setNewItem({
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "",
      expiryDate: "",
    });

  const resetEditItem = () =>
    setEditItem({
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "",
      expiryDate: "",
    });

  const filteredInventory = inventory.filter((item: InventoryItem) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Out of Stock
      </Badge>;
    } else if (stock <= minStock) {
      return <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800">
        <AlertTriangle className="h-3 w-3" />
        Low Stock
      </Badge>;
    } else {
      return <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3" />
        In Stock
      </Badge>;
    }
  };

  const getStockAlerts = () => {
    const lowStock = inventory.filter((item: InventoryItem) => item.stock <= item.minStock && item.stock > 0);
    const outOfStock = inventory.filter((item: InventoryItem) => item.stock === 0);
    return { lowStock: lowStock.length, outOfStock: outOfStock.length };
  };

  // Persist inventory changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    } catch {
      // ignore storage errors
    }
  }, [inventory]);

  const alerts = getStockAlerts();

  const computeStatus = (stock: number, minStock: number): InventoryStatus => {
    if (stock === 0) return "out-of-stock";
    if (stock <= minStock) return "low-stock";
    return "in-stock";
  };

  const handleAddItem = () => {
    const trimmedName = newItem.name.trim();
    if (!trimmedName) return;

    const nextId = Math.max(0, ...inventory.map((item: InventoryItem) => item.id)) + 1;
    const itemToAdd = {
      id: nextId,
      name: trimmedName,
      category: newItem.category.trim() || "Uncategorized",
      stock: Number(newItem.stock),
      minStock: Number(newItem.minStock),
      maxStock: Number(newItem.maxStock),
      unit: newItem.unit.trim() || "units",
      expiryDate: newItem.expiryDate || "N/A",
      status: computeStatus(Number(newItem.stock), Number(newItem.minStock)),
    };

    setInventory((prev: InventoryItem[]) => {
      const next = [itemToAdd, ...prev];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });

    resetNewItem();
    setAddDialogOpen(false);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setEditItem({
      name: item.name,
      category: item.category,
      stock: item.stock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      unit: item.unit,
      expiryDate: item.expiryDate,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    const trimmedName = editItem.name.trim();
    if (!trimmedName) return;

    const updatedItem = {
      ...editingItem,
      name: trimmedName,
      category: editItem.category.trim() || "Uncategorized",
      stock: Number(editItem.stock),
      minStock: Number(editItem.minStock),
      maxStock: Number(editItem.maxStock),
      unit: editItem.unit.trim() || "units",
      expiryDate: editItem.expiryDate || "N/A",
      status: computeStatus(Number(editItem.stock), Number(editItem.minStock)),
    };

    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) => item.id === editingItem.id ? updatedItem : item)
    );

    resetEditItem();
    setEditingItem(null);
    setEditDialogOpen(false);
  };

  const handleRestockItem = (item: InventoryItem) => {
    setRestockingItem(item);
    setRestockAmount(0);
    setRestockDialogOpen(true);
  };

  const handleSaveRestock = () => {
    if (!restockingItem || restockAmount <= 0) return;

    const updatedItem = {
      ...restockingItem,
      stock: restockingItem.stock + restockAmount,
      status: computeStatus(restockingItem.stock + restockAmount, restockingItem.minStock),
    };

    setInventory((prev: InventoryItem[]) =>
      prev.map((item: InventoryItem) => item.id === restockingItem.id ? updatedItem : item)
    );

    setRestockingItem(null);
    setRestockAmount(0);
    setRestockDialogOpen(false);
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
                <Pill className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Inventory Management</h1>
                  <p className="text-sm text-gray-600">Track medications, supplies, and stock levels</p>
                </div>
              </div>
            </div>
            <Button className="flex items-center space-x-2" onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new medication or supply item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Stock"
              value={newItem.stock}
              onChange={(e) => setNewItem((prev) => ({ ...prev, stock: Number(e.target.value) }))}
            />
            <Input
              type="number"
              placeholder="Minimum stock"
              value={newItem.minStock}
              onChange={(e) => setNewItem((prev) => ({ ...prev, minStock: Number(e.target.value) }))}
            />
            <Input
              type="number"
              placeholder="Maximum stock"
              value={newItem.maxStock}
              onChange={(e) => setNewItem((prev) => ({ ...prev, maxStock: Number(e.target.value) }))}
            />
            <Input
              placeholder="Unit (e.g., tablets)"
              value={newItem.unit}
              onChange={(e) => setNewItem((prev) => ({ ...prev, unit: e.target.value }))}
            />
            <Input
              placeholder="Expiry date (YYYY-MM-DD)"
              value={newItem.expiryDate}
              onChange={(e) => setNewItem((prev) => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the details of the selected inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Item name"
              value={editItem.name}
              onChange={(e) => setEditItem((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Category"
              value={editItem.category}
              onChange={(e) => setEditItem((prev) => ({ ...prev, category: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Stock"
              value={editItem.stock}
              onChange={(e) => setEditItem((prev) => ({ ...prev, stock: Number(e.target.value) }))}
            />
            <Input
              type="number"
              placeholder="Minimum stock"
              value={editItem.minStock}
              onChange={(e) => setEditItem((prev) => ({ ...prev, minStock: Number(e.target.value) }))}
            />
            <Input
              type="number"
              placeholder="Maximum stock"
              value={editItem.maxStock}
              onChange={(e) => setEditItem((prev) => ({ ...prev, maxStock: Number(e.target.value) }))}
            />
            <Input
              placeholder="Unit (e.g., tablets)"
              value={editItem.unit}
              onChange={(e) => setEditItem((prev) => ({ ...prev, unit: e.target.value }))}
            />
            <Input
              placeholder="Expiry date (YYYY-MM-DD)"
              value={editItem.expiryDate}
              onChange={(e) => setEditItem((prev) => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Item</DialogTitle>
            <DialogDescription>
              Add stock to {restockingItem?.name}. Current stock: {restockingItem?.stock} {restockingItem?.unit}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              type="number"
              placeholder="Amount to add"
              value={restockAmount}
              onChange={(e) => setRestockAmount(Number(e.target.value))}
              min="1"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setRestockDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRestock} disabled={restockAmount <= 0}>
              Restock
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{inventory.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                  {inventory.filter(item => item.stock > item.minStock).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{alerts.lowStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{alerts.outOfStock}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>Search and manage your pharmacy inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item: InventoryItem) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          item.stock === 0 ? 'text-red-600' :
                          item.stock <= item.minStock ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {item.stock} {item.unit}
                        </span>
                      </TableCell>
                      <TableCell>{item.minStock}/{item.maxStock}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.stock, item.minStock)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>Edit</Button>
                          <Button variant="outline" size="sm" onClick={() => handleRestockItem(item)}>Restock</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}