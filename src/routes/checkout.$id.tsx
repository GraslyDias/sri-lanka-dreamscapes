import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/checkout/$id")({
  head: () => ({
    meta: [{ title: "Secure Checkout — Vaya Ceylon" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutRoute,
});

// Mock invoice data
const mockInvoices: Record<string, any> = {
  "INV-2026-089": {
    id: "INV-2026-089",
    date: "2026-07-14",
    dueDate: "2026-07-21",
    customer: {
      name: "Helena & Marcus T.",
      email: "helena@example.com",
      address: "Zurich, Switzerland",
    },
    tourName: "Beyond the Ordinary Sri Lanka",
    travelDates: "10 Jan 2027 – 21 Jan 2027",
    guests: "2 Adults",
    items: [
      { description: "12-Day Private Expedition (2 Guests)", amount: 16800 },
      { description: "Helicopter Transfer Upgrade (Colombo to Sigiriya)", amount: 1200 },
      { description: "Private Blue Whale Charter", amount: 450 },
    ],
    subtotal: 18450,
    tax: 0,
    total: 18450,
    status: "Pending",
  }
};

function CheckoutRoute() {
  const { id } = Route.useParams();
  const invoice = mockInvoices[id] || mockInvoices["INV-2026-089"]; // Default for demo

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-paper flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-secondary border border-ink/5 p-10 rounded-3xl text-center">
          <div className="size-16 rounded-full bg-jungle/10 text-jungle grid place-items-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 className="font-display text-4xl mb-3">Payment Successful</h1>
          <p className="text-ink/60 mb-8">Thank you, {invoice.customer.name}. Your journey is confirmed.</p>
          <div className="p-4 bg-paper rounded-xl border border-ink/5 mb-8 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink/50">Amount Paid</span><span className="font-medium">${invoice.total.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-ink/50">Receipt #</span><span className="font-medium uppercase">RCP-{Math.random().toString(36).slice(2,8)}</span></div>
          </div>
          <a href="/" className="inline-block px-8 py-3 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-ink transition-colors">
            Return to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper py-12 px-6 font-sans text-ink">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl mb-2">VAYA CEYLON</h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Secure Checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Invoice Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-secondary rounded-3xl p-8 border border-ink/5">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="font-display text-3xl mb-1">Invoice {invoice.id}</h2>
                  <p className="text-sm text-ink/50">Due by {invoice.dueDate}</p>
                </div>
                <div className="text-right text-sm text-ink/70">
                  <p className="font-medium text-ink mb-1">{invoice.customer.name}</p>
                  <p>{invoice.customer.email}</p>
                </div>
              </div>

              <div className="p-5 bg-paper rounded-xl border border-ink/5 mb-8">
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-ocean font-semibold mb-3">Journey Details</h3>
                <p className="font-medium mb-1">{invoice.tourName}</p>
                <p className="text-sm text-ink/60">{invoice.travelDates} · {invoice.guests}</p>
              </div>

              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-ink/10 text-ink/50">
                    <th className="text-left font-normal pb-3">Description</th>
                    <th className="text-right font-normal pb-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {invoice.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="py-4 text-ink/80">{item.description}</td>
                      <td className="py-4 text-right">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="space-y-3 text-sm border-t border-ink/10 pt-6 text-right">
                <div className="flex justify-between text-ink/60"><span>Subtotal</span><span>${invoice.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-ink/60"><span>Taxes</span><span>${invoice.tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-xl font-display mt-2 pt-2 border-t border-ink/10 text-ink">
                  <span>Total Due</span>
                  <span>${invoice.total.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-5">
            <div className="bg-ink text-paper rounded-3xl p-8 sticky top-8">
              <h3 className="font-display text-3xl mb-6">Payment</h3>

              <div className="flex gap-2 mb-8 bg-paper/5 p-1 rounded-xl">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-2.5 rounded-lg text-xs uppercase tracking-[0.1em] font-medium transition-colors ${paymentMethod === "card" ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"}`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("transfer")}
                  className={`flex-1 py-2.5 rounded-lg text-xs uppercase tracking-[0.1em] font-medium transition-colors ${paymentMethod === "transfer" ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"}`}
                >
                  Bank Transfer
                </button>
              </div>

              {paymentMethod === "card" ? (
                <form onSubmit={handlePay} className="space-y-4">
                  <label className="block space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">Name on Card</span>
                    <input required type="text" defaultValue={invoice.customer.name} className="w-full bg-transparent border border-paper/20 rounded-lg p-3 text-sm focus:outline-none focus:border-sunset" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">Card Number</span>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border border-paper/20 rounded-lg p-3 text-sm focus:outline-none focus:border-sunset" />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">Expiry</span>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-transparent border border-paper/20 rounded-lg p-3 text-sm focus:outline-none focus:border-sunset" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">CVC</span>
                      <input required type="text" placeholder="123" className="w-full bg-transparent border border-paper/20 rounded-lg p-3 text-sm focus:outline-none focus:border-sunset" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 px-6 py-4 bg-sunset text-ink font-semibold rounded-full text-xs uppercase tracking-[0.2em] hover:bg-paper transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : `Pay $${invoice.total.toLocaleString()}`}
                  </button>
                  <p className="text-center text-[10px] text-paper/40 mt-4 flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Payments are secure and encrypted
                  </p>
                </form>
              ) : (
                <div className="space-y-6 text-sm text-paper/80">
                  <p>Please transfer the total amount to the following account. Your booking will be confirmed upon receipt of funds.</p>
                  <div className="bg-paper/5 rounded-xl p-5 border border-paper/10 space-y-3">
                    <div className="flex justify-between"><span className="text-paper/50">Bank</span><span>Standard Chartered</span></div>
                    <div className="flex justify-between"><span className="text-paper/50">Account Name</span><span>Vaya Ceylon Travels</span></div>
                    <div className="flex justify-between"><span className="text-paper/50">Account No.</span><span className="font-mono text-paper">012 345 6789</span></div>
                    <div className="flex justify-between"><span className="text-paper/50">SWIFT</span><span className="font-mono text-paper">SCBLXXXX</span></div>
                    <div className="flex justify-between"><span className="text-paper/50">Reference</span><span className="font-mono text-sunset">{invoice.id}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
