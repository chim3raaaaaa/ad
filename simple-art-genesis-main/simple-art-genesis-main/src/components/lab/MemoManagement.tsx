import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen, Download, Upload, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BatchData {
  batchNo: string;
  material: string;
  sampleType: string;
  status: string;
  retestDate?: string;
}

const batchData: BatchData[] = [
  { batchNo: "BC-3201", material: "Blended Cement", sampleType: "STD", status: "Pending" },
  { batchNo: "BC-3202", material: "Blended Cement", sampleType: "STD", status: "Pending" },
  { batchNo: "BC-3203", material: "Blended Cement", sampleType: "STD", status: "Pending" },
  { batchNo: "BC-3204", material: "Blended Cement", sampleType: "STD", status: "Pending" },
  { batchNo: "BC-3205", material: "Blended Cement", sampleType: "Pending", status: "Pending" },
  { batchNo: "BC-3206", material: "Ordinary Portland Cement", sampleType: "Unknown", status: "11/01/2024" },
];

function TreeNode({ 
  label, 
  children, 
  isExpanded, 
  onToggle, 
  hasChildren = false,
  level = 0 
}: {
  label: string;
  children?: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  hasChildren?: boolean;
  level?: number;
}) {
  return (
    <div>
      <div 
        className={cn(
          "flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer",
          level > 0 && "ml-4"
        )}
        onClick={onToggle}
      >
        {hasChildren ? (
          isExpanded ? (
            <>
              <ChevronDown className="h-4 w-4" />
              <FolderOpen className="h-4 w-4 text-blue-600" />
            </>
          ) : (
            <>
              <ChevronRight className="h-4 w-4" />
              <Folder className="h-4 w-4 text-blue-600" />
            </>
          )
        ) : (
          <>
            <div className="w-4 h-4" />
            <div className="w-4 h-4 border rounded border-gray-300" />
          </>
        )}
        <span className="text-sm">{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4">
          {children}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-lab-status-pending text-white';
      case 'complete':
        return 'bg-lab-status-complete text-white';
      default:
        return 'bg-lab-status-unknown text-white';
    }
  };

  // If status is a date, don't show as badge
  if (status.includes('/')) {
    return <span className="text-sm">{status}</span>;
  }

  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      getStatusColor(status)
    )}>
      {status}
    </span>
  );
}

export function MemoManagement() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    traich: true,
    curepipe: true,
    blendedCement: true
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleImport = () => {
    console.log("Import functionality");
  };

  const handleExport = () => {
    console.log("Export functionality");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Memo Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
      
      {/* Header Info */}
      <div className="bg-card border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">Site</span>
            <div className="font-semibold">Curepipe</div>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Memo Ref</span>
            <div className="font-semibold">BM-2024-045</div>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Date</span>
            <div className="font-semibold">10/24/2024</div>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Retest Date</span>
            <div className="font-semibold">11/07/2024</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Tree View */}
        <div className="col-span-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium mb-4">Traich</h3>
            <TreeNode
              label="Curepipe"
              hasChildren
              isExpanded={expandedNodes.curepipe}
              onToggle={() => toggleNode('curepipe')}
            >
              <TreeNode
                label="Blended Cement"
                hasChildren
                isExpanded={expandedNodes.blendedCement}
                onToggle={() => toggleNode('blendedCement')}
                level={1}
              >
                <TreeNode label="BC-3201" level={2} />
              </TreeNode>
              <TreeNode label="BC-3202" level={1} />
            </TreeNode>
          </div>
        </div>

        {/* Batch Table */}
        <div className="col-span-8">
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-lab-table-header">
                <tr>
                  <th className="text-left p-3 font-medium">Batch No</th>
                  <th className="text-left p-3 font-medium">Material</th>
                  <th className="text-left p-3 font-medium">Sample Type</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {batchData.map((batch, index) => (
                  <tr 
                    key={batch.batchNo}
                    className={cn(
                      "border-t hover:bg-gray-50",
                      index % 2 === 0 ? "bg-lab-table-row-even" : "bg-lab-table-row-odd"
                    )}
                  >
                    <td className="p-3 font-medium">{batch.batchNo}</td>
                    <td className="p-3">{batch.material}</td>
                    <td className="p-3">{batch.sampleType}</td>
                    <td className="p-3">
                      <StatusBadge status={batch.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}