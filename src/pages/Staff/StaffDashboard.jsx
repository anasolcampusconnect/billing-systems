import React, { useState, useEffect } from 'react';
import StaffNavbar from '../../components/Navbars/StaffNavbar';


const MOCK_INVENTORY = {
  "12345": { itemName: "Premium Basmati Rice 1kg", hsnCode: "1006", unitPrice: 120.00, discountAmount: 10.00, gstPercent: 5 },
  "67890": { itemName: "Organic Sunflower Oil 1L", hsnCode: "1512", unitPrice: 180.00, discountAmount: 15.00, gstPercent: 12 },
  "11111": { itemName: "Dairy Fresh Milk 500ml", hsnCode: "0401", unitPrice: 30.00, discountAmount: 0.00, gstPercent: 0 },
  "22222": { itemName: "Whole Wheat Bread", hsnCode: "1905", unitPrice: 45.00, discountAmount: 2.00, gstPercent: 5 }
};


const emptyProduct = (id) => ({
  id,
  barcode: '',
  qty: 1,
  loading: false,
  confirmed: false,
  details: undefined
});

// --- థర్మల్ రిసీప్ట్ టెక్స్ట్ జెనరేటర్ ---
const generateThermalReceipt = (data) => {
  const width = 42;
  const line = '-'.repeat(width);

  const padLeft = (str, len) => (' '.repeat(len) + str).slice(-len);
  const padRight = (str, len) => (str + ' '.repeat(len)).slice(0, len);

  let txt = '';
  txt += `Bill No : ${data.billNumber}\n`;
  txt += `Date    : ${data.billTime}\n`;
  txt += `Payment : ${data.paymentMethod}\n`;
  txt += `${line}\n`;
  txt += `Item                Qty    Rate   Amount\n`;
  txt += `${line}\n`;

  data.items.forEach((item) => {
    const name = item.itemName;
    const nameWidth = 19;
    let printName = name.length > nameWidth ? name.substring(0, nameWidth) : name;
    let remainderName = name.length > nameWidth ? name.substring(nameWidth) : "";

    const qtyStr = padLeft(item.quantity.toString(), 4);
    const rateStr = padLeft(item.unitPrice.toFixed(2), 8);
    const amtStr = padLeft(item.lineTotal.toFixed(2), 9);

    txt += `${padRight(printName, nameWidth)} ${qtyStr} ${rateStr} ${amtStr}\n`;
    if (remainderName) txt += `${remainderName}\n`;

    txt += `HSN: ${item.hsnCode}   GST @ ${item.gstPercent} %   GST: ${item.gstAmount.toFixed(2)}\n`;
  });

  txt += `${line}\n`;
  txt += `${padRight("Subtotal", 20)}${padLeft(data.subtotalAmount.toFixed(2), 22)}\n`;
  if (data.totalDiscount > 0) {
    txt += `${padRight("Discount", 20)}${padLeft(data.totalDiscount.toFixed(2), 22)}\n`;
  }
  txt += `${padRight("GST Total", 20)}${padLeft(data.totalGst.toFixed(2), 22)}\n`;
  txt += `${line}\n`;
  txt += `${padRight("Grand Total", 20)}${padLeft(data.grandTotal.toFixed(2), 22)}\n`;

  return txt;
};

// --- ఇన్-లైన్ SVG ఐకాన్స్ ---
const Icon = ({ name }) => {
  if (name === "whatsapp") {
    return (
      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.966 0c3.179.001 6.169 1.24 8.414 3.486 2.245 2.246 3.481 5.233 3.48 8.413-.003 6.557-5.338 11.907-11.91 11.907-2.013-.001-3.99-.51-5.733-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.63-1.019-5.101-2.871-6.956C16.548 1.951 14.074 1.9 11.967 1.9c-5.439 0-9.864 4.414-9.867 9.85-.001 1.767.461 3.494 1.34 5.034L2.43 21.46l4.217-1.306z"/>
      </svg>
    );
  }
  if (name === "account-outline") {
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
};


// ఈ మార్పు చేయండి
const POSInput = ({ icon, value, onChange, placeholder, keyboardType, onSubmit }) => (
  <div className="flex-1 mb-0">
    <label className="block text-xs text-gray-500 font-bold mb-1.5 uppercase tracking-wider pl-1">
      {placeholder}
    </label>
    <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 h-12 overflow-hidden">
      <div className="pl-3 pr-2 border-r border-gray-200">
        <Icon name={icon} />
      </div>
      <input
        type={keyboardType === "phone-pad" ? "tel" : "text"}
        value={value}
        // ఇక్కడ e.target.value ని పంపాలి
        onChange={(e) => onChange(e.target.value)} 
        onKeyDown={(e) => e.key === 'Enter' && onSubmit && onSubmit()}
        placeholder={placeholder}
        className="flex-1 px-3 bg-transparent text-gray-800 text-base font-bold outline-none h-full"
      />
      {String(value || '').length > (placeholder === "WhatsApp Number" ? 2 : 0) && (
        <button 
          onClick={() => onChange(placeholder === "WhatsApp Number" ? '91' : '')} 
          className="pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

const StaffDashboard = () => {
  const cashierName = "DUMMY_CASHIER"; 
  const currentDate = new Date().toLocaleDateString('en-GB');


  const [products, setProducts] = useState([emptyProduct(String(Date.now()))]);
  const [isLoading, setIsLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [receiptText, setReceiptText] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [customerName, setCustomerName] = useState("Rajesh");
  const [phoneNumber, setPhoneNumber] = useState("91");
  const [activeBarcodeDropdown, setActiveBarcodeDropdown] = useState(null);

  const updateProduct = (id, patch) => {
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const addProduct = () => {
    setProducts((list) => [emptyProduct(String(Date.now())), ...list]);
  };

  const removeProduct = (id) => {
    setProducts((list) => {
      const filtered = list.filter((p) => p.id !== id);
      return filtered.length === 0 ? [emptyProduct(String(Date.now()))] : filtered;
    });
  };

 const handleConfirmScan = (productId, selectedBarcode) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const barcode = (selectedBarcode || product.barcode)?.trim();
  if (!barcode) {
    alert('Please enter a barcode before confirming.');
    return;
  }

    updateProduct(productId, { loading: true });

    setTimeout(() => {
      const matchedItem = MOCK_INVENTORY[barcode];

      if (!matchedItem) {
        alert('Barcode not found! Try: 12345, 67890, 11111, or 22222');
        updateProduct(productId, { loading: false });
        return;
      }

      const existingIndex = products.findIndex(
        p => p.barcode === barcode && p.confirmed && p.id !== productId
      );

      if (existingIndex !== -1) {
  
        setProducts((list) => {
          const newList = [...list];
          const existing = { ...newList[existingIndex] };
          const ed = { ...existing.details };

          // కొత్త క్వాంటిటీని యాడ్ చేయడం
          const newQty = ed.quantity + product.qty;
          const priceAfterDiscount = ed.unitPrice - ed.discountAmount;
          
          // మొత్తం వాల్యూస్‌ని తిరిగి లెక్కించడం
          ed.quantity = newQty;
          ed.gstAmount = (priceAfterDiscount * newQty * ed.gstPercent) / 100;
          ed.lineTotal = (priceAfterDiscount * newQty) + ed.gstAmount;
          ed.savedAmount = ed.discountAmount * newQty;

          existing.details = ed;
          newList[existingIndex] = existing;

          // ఇప్పుడు మనం ఎంటర్ చేసిన తాత్కాలిక రో (Input Row) ని డిలీట్ చేస్తాము
          return newList.filter(p => p.id !== productId);
        });
      } else {
        // ఒకవేళ కొత్త ఐటమ్ అయితే, నార్మల్‌గా యాడ్ చేస్తాము
        const itemDetails = {
          itemName: matchedItem.itemName,
          hsnCode: matchedItem.hsnCode,
          quantity: product.qty,
          unitPrice: matchedItem.unitPrice,
          discountAmount: matchedItem.discountAmount,
          priceAfterDiscount: matchedItem.unitPrice - matchedItem.discountAmount,
          gstPercent: matchedItem.gstPercent,
          gstAmount: ((matchedItem.unitPrice - matchedItem.discountAmount) * product.qty * matchedItem.gstPercent) / 100,
          lineTotal: ((matchedItem.unitPrice - matchedItem.discountAmount) * product.qty) * (1 + matchedItem.gstPercent / 100),
          savedAmount: matchedItem.discountAmount * product.qty
        };

        updateProduct(productId, {
          details: itemDetails,
          confirmed: true,
          loading: false
        });
      }
    }, 400);
  };

  const summary = products.reduce(
    (acc, p) => {
      if (p.confirmed && p.details) {
        acc.subtotal += p.details.unitPrice * p.details.quantity;
        acc.totalDiscount += p.details.discountAmount * p.details.quantity;
        acc.totalGst += p.details.gstAmount;
      }
      return acc;
    },
    { subtotal: 0, totalDiscount: 0, totalGst: 0 }
  );
  const grandTotal = summary.subtotal + summary.totalGst - summary.totalDiscount;

  // సేవ్ అండ్ ప్రింట్ క్లిక్ చేసినప్పుడు డమ్మీ రెస్పాన్స్ క్రియేషన్
  const handleGenerateBill = () => {
    const validItems = products.filter(p => p.confirmed && p.details);

    if (validItems.length === 0) {
      alert("Please add and ENTER at least one valid item before generating a bill.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const dummyResponse = {
        billNumber: "QB-" + Math.floor(100000 + Math.random() * 900000),
        billTime: new Date().toLocaleString('en-GB'),
        paymentMethod: "CASH",
        subtotalAmount: summary.subtotal,
        totalDiscount: summary.totalDiscount,
        totalGst: summary.totalGst,
        grandTotal: grandTotal,
        items: validItems.map(p => p.details)
      };

      const textFormatted = generateThermalReceipt(dummyResponse);
      setReceiptData(dummyResponse);
      setReceiptText(textFormatted);
      setShowReceiptModal(true);
      setIsLoading(false);
    }, 600);
  };


  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppInvoice = () => {
    if (!customerName || !phoneNumber || phoneNumber.length < 12) {
      alert("Please enter a valid Customer Name and 10-digit WhatsApp Number.");
      return;
    }
    setInvoiceLoading(true);

    setTimeout(() => {
      alert(`[MOCK SUCCESS] Invoice successfully generated & triggered via WhatsApp to ${customerName} (${phoneNumber})`);
      setInvoiceLoading(false);
      setShowInvoiceModal(false);
      setProducts([emptyProduct(String(Date.now()))]);
      setActiveBarcodeDropdown(null);
      setCustomerName('Rajesh');
      setPhoneNumber('91');
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-200 text-gray-800 font-sans overflow-hidden">
      <StaffNavbar />
      {/*<header className="bg-slate-900 px-4 py-2 flex justify-between items-center shadow-md select-none">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-white tracking-widest">
            Retail<span className="text-yellow-400">Master</span>
          </h1>
          <span className="text-gray-400 text-xs hidden sm:inline">Date: {currentDate}</span>
          <span className="text-gray-400 text-xs hidden md:inline">Bill No: Auto (Static Demo)</span>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setProducts([emptyProduct(String(Date.now()))]);
              setReceiptData(null);
              setReceiptText('');
              setShowReceiptModal(false);
              setShowInvoiceModal(false);
            }} 
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-xs font-bold text-white uppercase border border-red-800 shadow-sm transition"
          >
            Clear All
          </button>
          <div className="flex items-center border-l border-gray-600 pl-4">
            <span className="text-gray-300 text-xs mr-1">Cashier:</span>
            <span className="text-yellow-400 font-bold text-sm uppercase">{cashierName}</span>
          </div>
        </div>
      </header>*/}

      {/* --- 2. మెయిన్ కంటెంట్ ఏరియా --- */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* ఎడమ వైపు భాగాలు (గ్రిడ్ మరియు ఇన్‌పుట్స్) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* యాక్టివ్ ఇన్‌పుట్ బార్ */}
          <div className="bg-gray-200 p-2 border-b border-gray-300">
            {products.filter(p => !p.confirmed).map((p, index) => (
              <div key={p.id} className="bg-gray-100 p-2 border border-gray-300 rounded flex flex-wrap items-center gap-3">
                <span className="text-gray-500 font-bold text-xs">#{products.indexOf(p) + 1}</span>
                
                <div className="flex-1 min-w-[150px] relative">
  <label className="block text-[10px] text-gray-500 font-bold uppercase mb-0.5">
    Item Code / Barcode (Try: 12345)
  </label>

  <input
    type="text"
    value={p.barcode}
    onFocus={() => setActiveBarcodeDropdown(p.id)}
    onClick={() => setActiveBarcodeDropdown(p.id)}
    onBlur={() => setTimeout(() => setActiveBarcodeDropdown(null), 150)}
    onChange={(e) => updateProduct(p.id, { barcode: e.target.value })}
    onKeyDown={(e) => e.key === 'Enter' && handleConfirmScan(p.id)}
    className="w-full bg-white border border-gray-400 px-2 py-1 rounded font-semibold text-gray-800 h-8 text-sm focus:outline-none focus:border-blue-500"
    placeholder="Search barcode or product"
  />

  {activeBarcodeDropdown === p.id && (
    <div className="absolute left-0 right-0 top-full z-20 mt-1 bg-white border border-gray-300 rounded shadow max-h-52 overflow-auto">
      {Object.entries(MOCK_INVENTORY)
        .filter(([code, item]) => {
          const query = p.barcode.trim().toLowerCase();
          return (
            !query ||
            code.includes(query) ||
            item.itemName.toLowerCase().includes(query)
          );
        })
        .slice(0, 6)
        .map(([code, item]) => (
          <button
            key={code}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              updateProduct(p.id, { barcode: code });
              handleConfirmScan(p.id, code);
            }}
            className="w-full text-left px-3 py-2 hover:bg-slate-100"
          >
            <div className="font-semibold text-sm">{code}</div>
            <div className="text-xs text-gray-500">{item.itemName}</div>
          </button>
      ))}
    </div>
  )}
</div>

                <div className="w-20">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase mb-0.5">Qty</label>
                  <input
                    type="number"
                    value={p.qty}
                    onChange={(e) => updateProduct(p.id, { qty: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full bg-white border border-gray-400 px-2 py-1 rounded font-bold text-gray-800 h-8 text-center text-sm focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleConfirmScan(p.id)}
                    disabled={p.loading}
                    className="h-8 px-4 bg-slate-700 text-white font-bold text-xs rounded hover:bg-slate-800 border border-slate-900 flex items-center justify-center min-w-[70px]"
                  >
                    {p.loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "ENTER"}
                  </button>
                </div>
              </div>
            ))}
            
            {products.every(p => p.confirmed) && (
              <button 
                onClick={addProduct} 
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs p-2 rounded transition mt-1"
              >
                + SCAN NEW ITEM
              </button>
            )}
          </div>

          {/* బిల్లింగ్ ఐటమ్స్ టేబుల్ (డేటా గ్రిడ్) */}
          <div className="flex-1 bg-white border border-gray-400 m-2 flex flex-col overflow-hidden shadow-inner">
            <div className="flex bg-gray-200 border-b border-gray-400 py-1.5 px-2 font-bold text-xs text-slate-800 select-none">
              <div className="w-10">S.No</div>
              <div className="flex-1">Item Description</div>
              <div className="w-16 text-right">Qty</div>
              <div className="w-20 text-right">Rate</div>
              <div className="w-16 text-right">Disc</div>
              <div className="w-16 text-right">GST%</div>
              <div className="w-24 text-right">Value</div>
              <div className="w-12 text-center">Del</div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {products.filter(p => p.confirmed && p.details).length === 0 ? (
                <div className="p-10 text-center text-gray-400 font-medium">No items confirmed in cart. Type barcode above and click ENTER.</div>
              ) : (
                products.filter(p => p.confirmed && p.details).map((p, idx, arr) => {
                  const d = p.details;
                  const isLastRow = idx === arr.length - 1;
                  return (
                    <div 
                      key={p.id} 
                      className={`flex py-2 px-2 items-center text-xs border-b border-gray-100 transition-colors ${isLastRow ? 'bg-blue-50 text-blue-900 font-semibold' : 'bg-white hover:bg-gray-50'}`}
                    >
                      <div className="w-10 font-mono">{idx + 1}</div>
                      <div className="flex-1 truncate pr-2">{d.itemName}</div>
                      <div className="w-16 text-right font-mono">{d.quantity}</div>
                      <div className="w-20 text-right font-mono">{d.unitPrice.toFixed(2)}</div>
                      <div className="w-16 text-right font-mono text-red-600">-{d.discountAmount.toFixed(2)}</div>
                      <div className="w-16 text-right font-mono">{d.gstPercent}%</div>
                      <div className="w-24 text-right font-bold font-mono">{d.lineTotal.toFixed(2)}</div>
                      <div className="w-12 text-center">
                        <button 
                          onClick={() => removeProduct(p.id)} 
                          className="text-red-600 hover:text-red-800 font-bold focus:outline-none text-sm"
                          title="Delete Item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* కీబోర్డ్ షార్ట్‌కట్ బార్ (విజువల్ మాత్రమే) */}
          <div className="bg-slate-800 p-1.5 flex justify-around text-white text-[10px] tracking-wider select-none">
            <span>F1 Help</span>
            <span>F5 Save</span>
            <span>F9 Qty</span>
            <span>Alt+F2 Pay</span>
          </div>
        </div>

        {/* కుడి వైపు భాగం (పేమెంట్ సమ్మరీ) */}
        <div className="w-full md:w-[320px] bg-slate-100 border-t md:border-t-0 md:border-l border-gray-400 p-4 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="bg-white border border-gray-300 p-3 rounded shadow-sm">
              <h3 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Bill Summary</h3>
              <div className="h-[1px] bg-gray-200 mb-2"/>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-mono font-bold">{summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">GST Total</span>
                <span className="font-mono font-bold">{summary.totalGst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Total Discount</span>
                <span className="font-mono font-bold text-red-600">-{summary.totalDiscount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-950 p-4 rounded text-center shadow-md select-none border border-blue-900">
              <span className="text-blue-300 text-xs font-bold uppercase tracking-widest block mb-1">Grand Total</span>
              <span className="text-white text-3xl font-black font-mono">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <button
              onClick={handleGenerateBill}
              disabled={isLoading}
              className={`w-full py-3 rounded text-white font-bold text-sm tracking-widest border border-emerald-800 shadow transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {isLoading ? "PROCESSING..." : "SAVE & PRINT"}
            </button>

            <button
              onClick={() => {
                const validItems = products.filter(p => p.confirmed && p.details);
                if (validItems.length === 0) {
                  alert("Please add items before creating a WhatsApp invoice.");
                  return;
                }
                setShowInvoiceModal(true);
              }}
              className="w-full py-3 rounded text-white font-bold text-sm tracking-widest bg-slate-700 hover:bg-slate-800 border border-slate-900 transition-colors shadow"
            >
              WHATSAPP BILL
            </button>
          </div>
        </div>
      </main>

      {/* --- 3. థర్మల్ రిసీప్ట్ మోడల్ (ప్రింట్ ప్రివ్యూ) --- */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            <div className="bg-slate-800 p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg">Bill Generated Successfully</h2>
              <button onClick={() => setShowReceiptModal(false)} className="text-gray-400 hover:text-white font-bold text-xl focus:outline-none">✕</button>
            </div>
            
            <div className="p-4 bg-gray-100 flex-1 overflow-y-auto">
              <div id="print-area" className="bg-white p-4 shadow-sm border border-gray-300 rounded font-mono text-xs whitespace-pre overflow-x-auto leading-relaxed text-black">
                {receiptText}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200 flex space-x-3">
              <button 
                onClick={() => setShowReceiptModal(false)} 
                className="flex-1 bg-white hover:bg-gray-100 border border-gray-300 py-2.5 rounded font-bold text-gray-700 transition"
              >
                Close
              </button>
              <button 
                onClick={handlePrint} 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded font-bold text-white transition flex items-center justify-center gap-1 shadow-md"
              >
                🖨️ Open Print Dialog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. వాట్సాప్ ఇన్వాయిస్ మోడల్ --- */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3 flex items-center justify-center">
                  <Icon name="whatsapp" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Send WhatsApp Bill</h2>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <POSInput
                icon="account-outline"
                placeholder="Customer Name"
                value={customerName}
                onChange={setCustomerName}
              />
              <POSInput
                icon="phone-outline"
                placeholder="WhatsApp Number"
                value={phoneNumber.startsWith('91') ? phoneNumber.slice(2) : phoneNumber}
                onChange={(t) => {
                  const digits = (t || '').replace(/\D/g, '').slice(0, 10);
                  setPhoneNumber('91' + digits);
                }}
                keyboardType="phone-pad"
                onSubmit={handleWhatsAppInvoice}
              />
            </div>

            <button
              onClick={handleWhatsAppInvoice}
              disabled={invoiceLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center"
            >
              {invoiceLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Trigger Mock WhatsApp Message"
              )}
            </button>
          </div>
        </div>
      )}

      {/* ప్రింట్ కోసం నిర్దేశించిన కేవలం CSS శైలులు */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; border: none; padding: 0; box-shadow: none; }
        }
        .animate-fadeIn { animation: fIn 0.2s ease-out forwards; }
        @keyframes fIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default StaffDashboard;