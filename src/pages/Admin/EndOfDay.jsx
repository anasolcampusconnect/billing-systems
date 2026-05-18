import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IndianRupee, CreditCard, QrCode, Calculator, 
  FileText, AlertCircle, CheckCircle2, Lock, Printer, Calendar, Loader2 
} from 'lucide-react';

const EndOfDay = () => {
  // --- MOCK DAILY AGGREGATES ---
  const todayDate = new Date();
  const todayFormatted = todayDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const dailyStats = {
    grossSales: 145250.00,
    refunds: 2500.00,
    netSales: 142750.00,
    totalTransactions: 128,
  };

  const expectedPayments = {
    cash: 45200.00,
    upi: 65050.00,
    card: 32500.00
  };

  // --- COMPONENT STATE ---
  const [actualCash, setActualCash] = useState(expectedPayments.cash.toString());
  const [notes, setNotes] = useState('');
  
  // Status States
  const [registerStatus, setRegisterStatus] = useState('OPEN'); // 'OPEN' or 'CLOSED'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- CALCULATIONS ---
  const parsedActualCash = parseFloat(actualCash) || 0;
  const cashDifference = parsedActualCash - expectedPayments.cash;
  const isBalanced = cashDifference === 0;

  // --- BUTTON 1: DOWNLOAD X-REPORT ---
  const handleDownloadXReport = () => {
    const reportContent = `
=========================================
          X-REPORT (MID-DAY)
=========================================
Date: ${todayFormatted}
Time: ${new Date().toLocaleTimeString('en-IN')}
Status: ${registerStatus}

--- SALES METRICS ---
Gross Sales : ₹${dailyStats.grossSales.toFixed(2)}
Refunds     : -₹${dailyStats.refunds.toFixed(2)}
Net Sales   : ₹${dailyStats.netSales.toFixed(2)}
Total Txns  : ${dailyStats.totalTransactions}

--- EXPECTED TENDERS ---
Cash in Till: ₹${expectedPayments.cash.toFixed(2)}
UPI / Wallet: ₹${expectedPayments.upi.toFixed(2)}
Card (POS)  : ₹${expectedPayments.card.toFixed(2)}

=========================================
* X-Report is a snapshot and does not 
  close the batch or zero the terminal.
=========================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `X_Report_${todayDate.toISOString().split('T')[0]}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- BUTTON 2: CLOSE REGISTER & BATCH ---
  const handleCloseRegister = async () => {
    // 1. Validation
    setErrorMsg('');
    if (!isBalanced && notes.trim() === '') {
      setErrorMsg("Cash discrepancy detected. You must provide a reason in the notes before closing.");
      return;
    }

    // 2. Set Loading State
    setIsSubmitting(true);

    // 3. Construct Payload for Backend
    const payload = {
      date: todayDate.toISOString(),
      expectedCash: expectedPayments.cash,
      actualCash: parsedActualCash,
      discrepancy: cashDifference,
      notes: notes,
      netSales: dailyStats.netSales
    };

    try {
      // ==========================================
      // REPLACE THIS SETTIMEOUT WITH YOUR API CALL
      // Example: await axios.post('/api/reports/z-report', payload);
      // ==========================================
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating 2-second network request
      
      // 4. Handle Success
      setRegisterStatus('CLOSED');
      
    } catch (error) {
      // 5. Handle Failure
      setErrorMsg("Failed to connect to the server. Please try again.");
      console.error("Z-Report Submission Failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-6 lg:p-10">
      
      {/* PAGE HEADER */}
      <div className="max-w-[1200px] mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FileText className="text-indigo-600" size={32} />
            End of Day Statement
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
            <Calendar size={16} /> {todayFormatted} — 
            {registerStatus === 'OPEN' ? (
               <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Register: OPEN</span>
            ) : (
               <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">Register: CLOSED</span>
            )}
          </p>
        </div>
        
        <button 
          onClick={handleDownloadXReport}
          className="bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-sm transition-all"
        >
          <Printer size={18} /> Download X-Report
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SUMMARY & DIGITAL PAYMENTS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Sales Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Gross Sales</p>
              <h3 className="text-2xl font-black font-mono text-slate-800">₹{(dailyStats.grossSales/1000).toFixed(1)}k</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Refunds</p>
              <h3 className="text-2xl font-black font-mono text-rose-500">-₹{dailyStats.refunds}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm bg-indigo-50/30">
              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-1">Net Sales</p>
              <h3 className="text-2xl font-black font-mono text-indigo-700">₹{(dailyStats.netSales/1000).toFixed(1)}k</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Txn Count</p>
              <h3 className="text-2xl font-black font-mono text-slate-800">{dailyStats.totalTransactions}</h3>
            </div>
          </div>

          {/* System Recorded Payments */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calculator size={18} className="text-slate-400" /> System Expected Tenders
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><IndianRupee size={20} className="text-emerald-600"/></div>
                  <div>
                    <p className="font-bold text-slate-800">Cash in Drawer</p>
                    <p className="text-xs text-slate-500 font-medium">Expected physical currency</p>
                  </div>
                </div>
                <span className="text-xl font-black font-mono text-slate-800">₹{expectedPayments.cash.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><QrCode size={20} className="text-indigo-600"/></div>
                  <div>
                    <p className="font-bold text-slate-800">UPI / Wallets</p>
                    <p className="text-xs text-slate-500 font-medium">Auto-reconciled</p>
                  </div>
                </div>
                <span className="text-xl font-black font-mono text-slate-800">₹{expectedPayments.upi.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><CreditCard size={20} className="text-blue-600"/></div>
                  <div>
                    <p className="font-bold text-slate-800">Card (POS)</p>
                    <p className="text-xs text-slate-500 font-medium">Auto-reconciled</p>
                  </div>
                </div>
                <span className="text-xl font-black font-mono text-slate-800">₹{expectedPayments.card.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: CASH RECONCILIATION & CLOSING */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden">
            
            {/* SUCCESS OVERLAY IF CLOSED */}
            {registerStatus === 'CLOSED' && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-emerald-100 p-4 rounded-full mb-4">
                   <CheckCircle2 size={48} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Shift Closed</h3>
                <p className="text-slate-500 font-medium mb-6">Z-Report has been generated and saved to the database.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-6 border-b border-slate-100 pb-3">
              Cash Reconciliation
            </h3>

            {/* ERROR MESSAGE DISPLAY */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium flex items-start gap-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                {errorMsg}
              </div>
            )}

            {/* Input Actual Cash */}
            <div className="mb-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Actual Cash Counted (₹)
              </label>
              <input 
                type="number" 
                value={actualCash}
                onChange={(e) => setActualCash(e.target.value)}
                disabled={isSubmitting || registerStatus === 'CLOSED'}
                className={`${inputClass} text-2xl font-black font-mono py-4 text-center ${!isBalanced ? 'bg-orange-50 border-orange-200 focus:border-orange-500 focus:ring-orange-500/20' : 'bg-emerald-50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20'}`}
                placeholder="0.00"
              />
            </div>

            {/* Discrepancy Alert */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 mb-6 ${
                isBalanced 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                  : 'bg-orange-50 border-orange-200 text-orange-800'
              }`}
            >
              {isBalanced ? <CheckCircle2 size={24} className="text-emerald-600 shrink-0"/> : <AlertCircle size={24} className="text-orange-600 shrink-0"/>}
              <div>
                <p className="font-black text-sm uppercase tracking-wide">
                  {isBalanced ? 'Till is Balanced' : 'Discrepancy Detected'}
                </p>
                <p className={`font-mono font-bold text-lg mt-1 ${isBalanced ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {isBalanced ? '₹0.00' : `${cashDifference > 0 ? '+' : ''}₹${cashDifference.toFixed(2)}`}
                </p>
                {!isBalanced && (
                  <p className="text-xs font-medium opacity-80 mt-1">
                    {cashDifference > 0 ? 'Cash overage. Check for unrecorded sales.' : 'Cash shortage. Check for missed tender or incorrect change.'}
                  </p>
                )}
              </div>
            </div>

            {/* Discrepancy Notes */}
            {!isBalanced && (
              <div className="mb-6 flex-grow">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Discrepancy Reason *
                </label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitting || registerStatus === 'CLOSED'}
                  className={`${inputClass} resize-none h-24`}
                  placeholder="Explain the shortage/overage..."
                ></textarea>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-auto pt-6 border-t border-slate-100">
              <button 
                onClick={handleCloseRegister}
                disabled={isSubmitting || registerStatus === 'CLOSED'}
                className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-black tracking-widest text-[11px] uppercase py-5 rounded-[20px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    CLOSING BATCH...
                  </>
                ) : (
                  <>
                    <Lock size={18} strokeWidth={3} />
                    CLOSE REGISTER & BATCH
                  </>
                )}
              </button>
            </div>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default EndOfDay;