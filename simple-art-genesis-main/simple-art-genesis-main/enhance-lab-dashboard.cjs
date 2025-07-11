const fs = require("fs");
const path = require("path");

// Helper to write file, create folders as needed
function writeFileRecursive(filePath, content) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

// 1. ConnectionStatus.tsx
writeFileRecursive(
  "src/components/ConnectionStatus.tsx",
`import React, { useEffect, useState } from "react";

type Status = "connected" | "disconnected" | "loading";

const testConnection = async (type: "azurmind" | "sharepoint") => {
  return new Promise<Status>((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.2 ? "connected" : "disconnected");
    }, 500);
  });
};

export const ConnectionStatus: React.FC = () => {
  const [azurStatus, setAzurStatus] = useState<Status>("loading");
  const [spStatus, setSpStatus] = useState<Status>("loading");

  const refreshStatus = () => {
    setAzurStatus("loading");
    setSpStatus("loading");
    testConnection("azurmind").then(setAzurStatus);
    testConnection("sharepoint").then(setSpStatus);
  };

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const dot = (status: Status) =>
    status === "loading"
      ? "🟡"
      : status === "connected"
      ? "🟢"
      : "🔴";

  return (
    <div className="flex gap-4 items-center">
      <span>
        AzurMind: <span>{dot(azurStatus)}</span>
      </span>
      <span>
        SharePoint: <span>{dot(spStatus)}</span>
      </span>
      <button
        className="ml-2 text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={refreshStatus}
      >
        Refresh
      </button>
    </div>
  );
};
`
);

// 2. Dashboard.tsx
writeFileRecursive(
  "src/pages/Dashboard.tsx",
`import React from "react";
import { ConnectionStatus } from "../components/ConnectionStatus";

const username = "Neel"; // Replace with real user logic if available

export default function Dashboard() {
  const today = new Date().toLocaleDateString();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {username}!</h1>
      <div className="text-gray-500 mb-4">Today: {today}</div>
      <ConnectionStatus />
      {/* ...rest of dashboard... */}
    </div>
  );
}
`
);

// 3. Settings.tsx
writeFileRecursive(
  "src/pages/Settings.tsx",
`import React, { useState } from "react";

// MOCK: Pretend to save/test data
const fakeTest = () => new Promise<boolean>((res) => setTimeout(() => res(Math.random() > 0.2), 700));

const defaultSites = [
  { site: "Terrarock", to: "", cc: "", bcc: "" },
  { site: "Drymix", to: "", cc: "", bcc: "" },
];

export default function Settings() {
  const [azurUrl, setAzurUrl] = useState("");
  const [azurToken, setAzurToken] = useState("");
  const [azurTest, setAzurTest] = useState<null | boolean>(null);

  const [spUrl, setSpUrl] = useState("");
  const [spUser, setSpUser] = useState("");
  const [spPass, setSpPass] = useState("");
  const [spTest, setSpTest] = useState<null | boolean>(null);

  const [presets, setPresets] = useState(defaultSites);

  const handlePresetChange = (i: number, field: "to" | "cc" | "bcc", value: string) => {
    setPresets((p) => {
      const arr = [...p];
      arr[i][field] = value;
      return arr;
    });
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-semibold">Database Connections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow space-y-2">
          <div className="font-semibold">AzurMind</div>
          <input className="input" placeholder="URL" value={azurUrl} onChange={e=>setAzurUrl(e.target.value)} />
          <input className="input" placeholder="Token/Auth" value={azurToken} onChange={e=>setAzurToken(e.target.value)} />
          <button
            className="btn"
            onClick={async()=>setAzurTest(await fakeTest())}
          >
            Test Connection
          </button>
          {azurTest !== null && (
            <div className={azurTest ? "text-green-600" : "text-red-600"}>
              {azurTest ? "Connection successful!" : "Failed to connect."}
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow space-y-2">
          <div className="font-semibold">SharePoint Excel</div>
          <input className="input" placeholder="URL" value={spUrl} onChange={e=>setSpUrl(e.target.value)} />
          <input className="input" placeholder="Username" value={spUser} onChange={e=>setSpUser(e.target.value)} />
          <input className="input" placeholder="Password" value={spPass} onChange={e=>setSpPass(e.target.value)} type="password"/>
          <button
            className="btn"
            onClick={async()=>setSpTest(await fakeTest())}
          >
            Test Connection
          </button>
          {spTest !== null && (
            <div className={spTest ? "text-green-600" : "text-red-600"}>
              {spTest ? "Connection successful!" : "Failed to connect."}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">Email Presets</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Site</th>
              <th className="text-left p-2">To</th>
              <th className="text-left p-2">CC</th>
              <th className="text-left p-2">BCC</th>
            </tr>
          </thead>
          <tbody>
            {presets.map((row, i) => (
              <tr key={row.site}>
                <td className="p-2">{row.site}</td>
                <td className="p-2"><input value={row.to} onChange={e=>handlePresetChange(i,"to",e.target.value)} className="input" /></td>
                <td className="p-2"><input value={row.cc} onChange={e=>handlePresetChange(i,"cc",e.target.value)} className="input" /></td>
                <td className="p-2"><input value={row.bcc} onChange={e=>handlePresetChange(i,"bcc",e.target.value)} className="input" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-xs text-gray-500">These will auto-fill when generating memos.</div>
      </div>
    </div>
  );
}
`
);

// 4. SMTPIntegrations.tsx
writeFileRecursive(
  "src/pages/SMTPIntegrations.tsx",
`import React, { useState } from "react";

const fakeTest = () => new Promise<boolean>((res) => setTimeout(() => res(Math.random() > 0.2), 700));

export default function SMTPIntegrations() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [sender, setSender] = useState("");
  const [result, setResult] = useState<null|boolean>(null);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">SMTP Server Settings</h2>
      <input className="input" placeholder="SMTP Host" value={host} onChange={e=>setHost(e.target.value)} />
      <input className="input" placeholder="Port" value={port} onChange={e=>setPort(e.target.value)} />
      <input className="input" placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} />
      <input className="input" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} type="password"/>
      <input className="input" placeholder="Sender Address" value={sender} onChange={e=>setSender(e.target.value)} />
      <button className="btn" onClick={async()=>setResult(await fakeTest())}>Test SMTP Connection</button>
      {result !== null && (
        <div className={result ? "text-green-600" : "text-red-600"}>
          {result ? "SMTP connection works!" : "SMTP connection failed."}
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">Settings will be stored securely.</div>
    </div>
  );
}
`
);

// 5. Reports.tsx
writeFileRecursive(
  "src/pages/Reports.tsx",
`import React, { useState } from "react";

const templates = [
  { name: "Standard Report", id: 1 },
  { name: "Detailed Analysis", id: 2 },
];

const sitePresets = {
  Terrarock: { to: "lab@terrarock.com", cc: "manager@terrarock.com", bcc: "" },
  Drymix: { to: "lab@drymix.com", cc: "", bcc: "admin@drymix.com" },
};

export default function Reports() {
  const [selectedSite, setSelectedSite] = useState<keyof typeof sitePresets>("Terrarock");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [mail, setMail] = useState({ to: "", cc: "", bcc: "" });
  const [mailModal, setMailModal] = useState(false);

  const handleGenerate = () => {
    const preset = sitePresets[selectedSite];
    setMail(preset);
    setMailModal(true);
  };

  const handleSend = () => {
    alert("Sent via Outlook integration (simulated)");
    setMailModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Generate Report</h2>
      <div className="flex gap-4 mb-4">
        <select className="input" value={selectedSite} onChange={e => setSelectedSite(e.target.value as any)}>
          {Object.keys(sitePresets).map(site => <option key={site}>{site}</option>)}
        </select>
        <select className="input" value={selectedTemplate} onChange={e => setSelectedTemplate(Number(e.target.value))}>
          {templates.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
        </select>
        <button className="btn" onClick={handleGenerate}>Generate Mail</button>
      </div>
      {mailModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="font-bold mb-2">Send Report Email</h3>
            <div className="space-y-2">
              <input className="input" value={mail.to} onChange={e=>setMail({...mail,to:e.target.value})} placeholder="To"/>
              <input className="input" value={mail.cc} onChange={e=>setMail({...mail,cc:e.target.value})} placeholder="CC"/>
              <input className="input" value={mail.bcc} onChange={e=>setMail({...mail,bcc:e.target.value})} placeholder="BCC"/>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn" onClick={handleSend}>Send via Outlook</button>
              <button className="btn bg-gray-400 hover:bg-gray-500" onClick={()=>setMailModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`
);

// 6. Tailwind helpers in index.css (append if not present)
const cssPath = "src/index.css";
const cssHelpers = `
.input { @apply border px-2 py-1 rounded w-full mb-2; }
.btn { @apply bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-2; }
`;
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, "utf8");
  if (!cssContent.includes(".input {")) {
    fs.appendFileSync(cssPath, cssHelpers, "utf8");
  }
} else {
  writeFileRecursive(cssPath, cssHelpers);
}

console.log("✅ Enhancement files created! You can now upload these files to StackBlitz.");
