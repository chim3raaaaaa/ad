import { LabLayout } from "@/components/lab/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Settings } from "lucide-react";
import { useState } from "react";

const testModules = [
  {
    category: "Aggregates",
    tests: [
      "Silt & Clay content - % by mass passing 75µm sieve",
      "Moisture Content",
      "Sand Equivalent",
      "Methylene Blue Value",
      "Flakiness Index",
      "Shape Index",
      "Los Angeles Value",
      "Aggregate Crushing Value",
      "Ten percent fines value",
      "Aggregate Impact Value",
      "Dry Bulk Density (Loose & Compacted)",
      "Particle density & Water Absorption",
      "Chloride Content",
      "Sulphate Content",
      "Magnesium Sulfate Soundness",
      "Compaction Tests",
      "Organic Impurities in Fine Aggregates for concrete"
    ]
  },
  {
    category: "Blocks",
    tests: [
      "Compressive Strength",
      "Dimensions",
      "Water Absorption",
      "Net and Gross Density"
    ]
  },
  {
    category: "Pavings",
    tests: [
      "Tensile Splitting Test",
      "Measurement",
      "Abrasion Resistance",
      "Water Absorption",
      "Slip Resistance"
    ]
  },
  {
    category: "Flags",
    tests: [
      "Bending Strength"
    ]
  },
  {
    category: "Kerbs",
    tests: [
      "Bending Strength"
    ]
  },
  {
    category: "Concrete",
    tests: [
      "Compressive Strength"
    ]
  },
  {
    category: "Railway Ballast",
    tests: [
      "Sieve Analysis, Fine particles & Fines content",
      "Flakiness Index",
      "Shape Index",
      "Particle length",
      "Los Angeles Value",
      "Magnesium Sulfate Soundness",
      "Particle density & Water Absorption"
    ]
  }
];

export default function TestModules() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = testModules.map(module => ({
    ...module,
    tests: module.tests.filter(test => 
      test.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(module => module.tests.length > 0);

  const totalTests = testModules.reduce((acc, module) => acc + module.tests.length, 0);

  return (
    <LabLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Test Modules</h1>
            <p className="text-muted-foreground">
              Manage and configure test modules ({totalTests} total tests)
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Test Module
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search test modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredModules.map((module, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-xl text-foreground">{module.category}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {module.tests.length} tests
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {module.tests.map((test, testIndex) => (
                    <div
                      key={testIndex}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{test}</h4>
                        <p className="text-sm text-muted-foreground">
                          {module.category} · Standard test procedure
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LabLayout>
  );
}