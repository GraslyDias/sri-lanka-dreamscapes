import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — Vaya Ceylon" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

// ── Mock data ──────────────────────────────────────────────────────────────────
const mockInquiries = [
  { id: "INQ-001", name: "Helena & Marcus T.", email: "helena@example.com", tour: "Beyond the Ordinary", date: "2026-07-10", status: "New" as const },
  { id: "INQ-002", name: "James A.", email: "james@example.com", tour: "Ultimate Wildlife Adventure", date: "2026-07-09", status: "Contacted" as const },
  { id: "INQ-003", name: "Priya & Arjun N.", email: "priya@example.com", tour: "Luxury Honeymoon Journey", date: "2026-07-08", status: "Quotation Sent" as const },
  { id: "INQ-004", name: "Sophie L.", email: "sophie@example.com", tour: "Tea Country Retreat", date: "2026-07-07", status: "Confirmed" as const },
  { id: "INQ-005", name: "David K.", email: "david@example.com", tour: "Cultural Triangle Experience", date: "2026-07-06", status: "Cancelled" as const },
];

const mockCustomers = [
  { id: "CUS-001", name: "Helena & Marcus T.", email: "helena@example.com", bookings: 1, totalSpent: 18450 },
  { id: "CUS-002", name: "James A.", email: "james@example.com", bookings: 2, totalSpent: 22000 },
];

const mockQuotations = [
  { id: "QT-2601", customer: "Helena & Marcus T.", tour: "Beyond the Ordinary", date: "2026-07-11", amount: 18450, status: "Sent" },
  { id: "QT-2602", customer: "James A.", tour: "Custom Safari", date: "2026-07-12", amount: 8200, status: "Draft" },
];

const mockInvoices = [
  { id: "INV-2026-089", customer: "Helena & Marcus T.", date: "2026-07-14", amount: 18450, status: "Unpaid" },
  { id: "INV-2026-088", customer: "Priya & Arjun N.", date: "2026-07-10", amount: 24500, status: "Paid" },
];

type InquiryStatus = "New" | "Contacted" | "Quotation Sent" | "Confirmed" | "Cancelled";

const STATUS_COLORS: Record<InquiryStatus, string> = {
  New: "bg-ocean/10 text-ocean",
  Contacted: "bg-sunset/15 text-amber-700",
  "Quotation Sent": "bg-jungle/10 text-jungle",
  Confirmed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-50 text-red-600",
};

const navItems = [
  { icon: "⊞", label: "Dashboard", id: "overview" },
  { icon: "✦", label: "Tours", id: "tours" },
  { icon: "◎", label: "Destinations", id: "destinations" },
  { icon: "⌂", label: "Hotels", id: "hotels" },
  { icon: "✉", label: "Inquiries", id: "inquiries" },
  { icon: "◷", label: "Customers", id: "customers" },
  { icon: "◈", label: "Quotations", id: "quotations" },
  { icon: "◉", label: "Invoices", id: "invoices" },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(navItems[0].id);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white font-sans flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 bg-[#161921] border-r border-white/5 flex flex-col transition-all duration-300`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          {sidebarOpen && <span className="font-display text-lg text-white tracking-tight">VAYA ADMIN</span>}
          <button onClick={() => setSidebarOpen(v => !v)} className="ml-auto size-8 rounded-lg bg-white/5 grid place-items-center text-white/50 hover:text-white transition-colors shrink-0">
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === item.id ? "bg-ocean/20 text-ocean" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            >
              <span className="text-base w-5 shrink-0 text-center">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors`}>
            <span className="text-base w-5 shrink-0 text-center">⬡</span>
            {sidebarOpen && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-[#161921] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-ocean/20 text-ocean grid place-items-center text-sm font-semibold">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <DashboardHome activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ activeTab }: { activeTab: string }) {
  const [inquiries, setInquiries] = useState(mockInquiries);

  const stats = [
    { label: "Total Tours", value: tours.length, icon: "✦", color: "text-ocean", bg: "bg-ocean/10" },
    { label: "Destinations", value: destinations.length, icon: "◎", color: "text-jungle", bg: "bg-jungle/10" },
    { label: "Inquiries (30d)", value: 42, icon: "✉", color: "text-sunset", bg: "bg-sunset/10" },
    { label: "Confirmed Bookings", value: 18, icon: "✓", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  const updateStatus = (id: string, status: InquiryStatus) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-reveal">
      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#161921] border border-white/5 rounded-2xl p-5">
                <div className={`size-10 rounded-xl ${s.bg} grid place-items-center text-lg mb-4 ${s.color}`}>{s.icon}</div>
                <div className={`font-display text-4xl ${s.color} mb-1`}>{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-white font-semibold">Recent Inquiries</h2>
            </div>
            <InquiryTable inquiries={inquiries.slice(0, 4)} onStatusChange={updateStatus} />
          </div>
        </>
      )}

      {activeTab === "tours" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white font-semibold">Tour Packages ({tours.length})</h2>
            <button className="px-4 py-2 bg-ocean/20 text-ocean text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-ocean hover:text-white transition-colors">+ New Tour</button>
          </div>
          <div className="divide-y divide-white/5">
            {tours.map((t) => (
              <div key={t.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                <img src={t.coverImage} alt={t.title} className="size-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t.title}</p>
                  <p className="text-[11px] text-white/40">{t.category} · {t.duration}</p>
                </div>
                <span className="text-ocean font-display text-lg">${t.startingPrice.toLocaleString()}</span>
                <div className="flex gap-2">
                  {["Edit", "Duplicate", "Archive"].map((a) => (
                    <button key={a} className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] bg-white/5 text-white/50 rounded hover:bg-white/10 hover:text-white transition-colors">{a}</button>
                  ))}
                  <button className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "destinations" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white font-semibold">Destinations ({destinations.length})</h2>
            <button className="px-4 py-2 bg-ocean/20 text-ocean text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-ocean hover:text-white transition-colors">+ New Destination</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {destinations.map((d) => (
              <div key={d.slug} className="bg-white/3 rounded-xl overflow-hidden border border-white/5 group hover:border-ocean/30 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={d.coverImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-white">{d.name}</p>
                    <p className="text-[11px] text-white/40 mb-3">{d.region}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="py-1 px-3 text-[10px] uppercase tracking-[0.15em] bg-ocean/15 text-ocean rounded hover:bg-ocean hover:text-white transition-colors">Edit</button>
                    <button className="py-1 px-3 text-[10px] uppercase tracking-[0.15em] bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">Del</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "inquiries" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-white font-semibold">All Inquiries</h2>
          </div>
          <InquiryTable inquiries={inquiries} onStatusChange={updateStatus} />
        </div>
      )}

      {activeTab === "hotels" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl p-8 text-center text-white/50">
          <div className="text-4xl mb-4">⌂</div>
          <h2 className="text-white font-semibold mb-2">Hotel Management</h2>
          <p className="text-sm mb-6">Manage properties, contracts, and allotments.</p>
          <button className="px-6 py-2 bg-ocean text-white text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-ocean/80 transition-colors">+ Add Hotel</button>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-white font-semibold">Customer Database</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-[0.2em] text-white/30">
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Bookings</th>
                <th className="px-5 py-3 font-semibold text-right">LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockCustomers.map(c => (
                <tr key={c.id} className="hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{c.name}</td>
                  <td className="px-5 py-4 text-white/50">{c.email}</td>
                  <td className="px-5 py-4 text-white/50">{c.bookings}</td>
                  <td className="px-5 py-4 text-right text-ocean font-mono">${c.totalSpent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "quotations" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-white font-semibold">Quotations</h2>
            <button className="px-4 py-2 bg-ocean/20 text-ocean text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-ocean hover:text-white transition-colors">+ Create Quote</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-[0.2em] text-white/30">
                <th className="px-5 py-3 font-semibold">Quote ID</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockQuotations.map(q => (
                <tr key={q.id} className="hover:bg-white/5">
                  <td className="px-5 py-4 font-mono text-white/50">{q.id}</td>
                  <td className="px-5 py-4 text-white">{q.customer}</td>
                  <td className="px-5 py-4 text-white/50">${q.amount.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest ${q.status === 'Sent' ? 'bg-ocean/20 text-ocean' : 'bg-white/10 text-white/50'}`}>{q.status}</span></td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button className="text-[10px] uppercase tracking-widest text-ocean">Export PDF</button>
                    <button className="text-[10px] uppercase tracking-widest text-white/40">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="bg-[#161921] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-white font-semibold">Invoices</h2>
            <button className="px-4 py-2 bg-ocean/20 text-ocean text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-ocean hover:text-white transition-colors">+ Generate Invoice</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-[0.2em] text-white/30">
                <th className="px-5 py-3 font-semibold">Invoice ID</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockInvoices.map(i => (
                <tr key={i.id} className="hover:bg-white/5">
                  <td className="px-5 py-4 font-mono text-white/50">{i.id}</td>
                  <td className="px-5 py-4 text-white">{i.customer}</td>
                  <td className="px-5 py-4 text-white/50">${i.amount.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest ${i.status === 'Paid' ? 'bg-jungle/20 text-jungle' : 'bg-sunset/20 text-sunset'}`}>{i.status}</span></td>
                  <td className="px-5 py-4 text-right space-x-3">
                    <button className="text-[10px] uppercase tracking-widest text-ocean">Send Email</button>
                    <Link to={`/checkout/${i.id}`} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white" target="_blank">Payment Link</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InquiryTable({ inquiries, onStatusChange }: {
  inquiries: typeof mockInquiries;
  onStatusChange: (id: string, status: InquiryStatus) => void;
}) {
  const statuses: InquiryStatus[] = ["New", "Contacted", "Quotation Sent", "Confirmed", "Cancelled"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold">ID</th>
            <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold">Guest</th>
            <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold hidden md:table-cell">Tour</th>
            <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold hidden lg:table-cell">Date</th>
            <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold">Status</th>
            <th className="text-right px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/30 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/3">
          {inquiries.map((inq) => (
            <tr key={inq.id} className="hover:bg-white/2 transition-colors">
              <td className="px-5 py-4 font-mono text-[11px] text-white/40">{inq.id}</td>
              <td className="px-5 py-4">
                <p className="text-white font-medium">{inq.name}</p>
                <p className="text-white/40 text-[11px]">{inq.email}</p>
              </td>
              <td className="px-5 py-4 text-white/60 hidden md:table-cell">{inq.tour}</td>
              <td className="px-5 py-4 text-white/40 text-[11px] hidden lg:table-cell">{inq.date}</td>
              <td className="px-5 py-4">
                <select
                  value={inq.status}
                  onChange={(e) => onStatusChange(inq.id, e.target.value as InquiryStatus)}
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[inq.status]} bg-transparent`}
                >
                  {statuses.map(s => <option key={s} className="bg-[#161921] text-white normal-case tracking-normal">{s}</option>)}
                </select>
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] bg-ocean/15 text-ocean rounded hover:bg-ocean hover:text-white transition-colors">Quote</button>
                  <button className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] bg-white/5 text-white/50 rounded hover:bg-white/10 hover:text-white transition-colors">View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
