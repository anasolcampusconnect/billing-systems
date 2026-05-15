import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Printer, IndianRupee, Store, Plus, Trash2, Search } from 'lucide-react';
import StaffNavbar from '../../components/Navbars/StaffNavbar';

const StaffDashboard = () => {
  // --- MOCK INVENTORY DATA (Retail Items) ---
  const inventoryData = [
    { id: 'SKU-1001', name: 'Premium Basmati Rice 5kg', category: 'Grocery', price: 850.00, hsn: '1006' },
    { id: 'SKU-2005', name: 'Sunflower Oil 1L', category: 'Grocery', price: 145.00, hsn: '1512' },
    { id: 'SKU-1045', name: 'Wireless Mouse', category: 'Electronics', price: 499.00, hsn: '8471' },
    { id: 'SKU-2010', name: 'Almonds 500g', category: 'Dry Fruits', price: 450.00, hsn: '0802' },
    { id: 'SKU-1088', name: 'Washing Powder 2kg', category: 'Household', price: 320.00, hsn: '3402' },
    { id: 'SKU-2099', name: 'Dark Chocolate Bar', category: 'Snacks', price: 99.00, hsn: '1806' }
  ];

  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState([]); 
  
  // Custom Searchable Dropdown States
  const [productSearch, setProductSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Item Details States
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Grocery');
  const [hsn, setHsn] = useState('');

  // Customer & Payment Details States
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');

  // Calculation Input States
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [discount, setDiscount] = useState('');

  // --- LIVE PREVIEW CALCULATIONS (For current form inputs) ---
  const p = parseFloat(price) || 0;
  const q = parseFloat(quantity) || 1;
  const d = parseFloat(discount) || 0;

  const baseAmount = p * q;
  let itemTaxableAmount = baseAmount - d;
  if (itemTaxableAmount < 0) itemTaxableAmount = 0;

  // --- ADD ITEM TO CART LOGIC ---
  const handleAddItem = () => {
    if (!productName || !price || !quantity) {
      alert("Please enter Product Name, Price and Quantity!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      productId,
      productName,
      category,
      hsn,
      price: p,
      quantity: q,
      discount: d,
      baseAmount,
      taxableAmount: itemTaxableAmount
    };

    setCart([...cart, newItem]);

    // Clear form inputs for next product
    setProductId('');
    setProductSearch('');
    setProductName('');
    setPrice('');
    setQuantity('1');
    setDiscount('');
    setHsn('');
  };

  // --- REMOVE ITEM FROM CART ---
  const removeCartItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // --- CART TOTALS AGGREGATION ---
  const totals = cart.reduce((acc, item) => {
    acc.baseAmount += item.baseAmount;
    acc.discount += item.discount;
    acc.taxableAmount += item.taxableAmount;
    return acc;
  }, {
    baseAmount: 0, discount: 0, taxableAmount: 0
  });

  const totalGstAmt = totals.taxableAmount * 0.05; // 5% Standard GST for retail example
  const grandTotal = totals.taxableAmount + totalGstAmt;

  // =========================================================
  // --- BULLETPROOF ELECTRON PRINT FUNCTION (IFRAME METHOD) ---
  // =========================================================
  const handlePrint = () => {
    if (cart.length === 0) {
      alert("Please add at least one item to the bill before printing!");
      return;
    }

    // Creating thermal receipt HTML dynamically
    const htmlContent = `
      <div style="text-align: center; margin-bottom: 8px; line-height: 1.2;">
        <h1 style="font-size: 18px; font-weight: bold; margin: 0 0 4px 0;">RETAIL MASTER</h1>
        <p style="margin: 0; font-size: 12px;">Main Road, Hyderabad, TS</p>
        <p style="margin: 0; font-size: 12px;">GSTIN: 36ABCDE1234F1Z5</p>
        <p style="margin: 0; font-size: 12px;">Ph: +91 9876543210</p>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="margin-bottom: 8px; line-height: 1.2; font-size: 12px;">
        <p style="margin: 2px 0;">Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        <p style="margin: 2px 0;">Bill: INV-${Math.floor(1000 + Math.random() * 9000)}</p>
        <p style="margin: 2px 0;">Cust: ${customerName || 'Cash Sale'} ${mobile && `(${mobile})`}</p>
        <p style="margin: 2px 0; font-weight: bold;">Pay Mode: ${paymentMode}</p>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 4px; font-size: 12px;">
        <span>ITEM DETAILS</span>
        <span>AMT(Rs)</span>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      ${cart.map(item => `
        <div style="margin-bottom: 8px; font-size: 12px;">
          <p style="font-weight: bold; text-transform: uppercase; margin: 0 0 4px 0;">
            ${item.productName}
          </p>
          <div style="display: flex; justify-content: space-between;">
            <span>Qty: ${item.quantity} x ₹${item.price.toFixed(2)}</span>
            <span>${item.baseAmount.toFixed(2)}</span>
          </div>
          ${item.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #555;">
            <span>Discount Applied</span>
            <span>-${item.discount.toFixed(2)}</span>
          </div>` : ''}
        </div>
      `).join('')}

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="line-height: 1.4; font-size: 12px;">
        <div style="display: flex; justify-content: space-between;">
          <span>Sub Total</span>
          <span>${totals.baseAmount.toFixed(2)}</span>
        </div>
        ${totals.discount > 0 ? `
        <div style="display: flex; justify-content: space-between;">
          <span>Total Savings</span>
          <span>-${totals.discount.toFixed(2)}</span>
        </div>` : ''}
        
        <div style="border-top: 1px solid black; margin: 4px 0; padding-top: 4px; display: flex; justify-content: space-between; font-weight: bold;">
          <span>Taxable Amount</span>
          <span>${totals.taxableAmount.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>CGST (2.5%)</span>
          <span>${(totalGstAmt / 2).toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>SGST (2.5%)</span>
          <span>${(totalGstAmt / 2).toFixed(2)}</span>
        </div>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-bottom: 8px;">
        <span>GRAND TOTAL</span>
        <span>Rs ${grandTotal.toFixed(2)}</span>
      </div>

      <div style="border-top: 1px dashed black; margin: 8px 0;"></div>

      <div style="margin-top: 16px; text-align: center; line-height: 1.2;">
        <p style="font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">*** THANK YOU ***</p>
        <p style="margin: 0 0 8px 0; font-size: 12px;">Visit Again</p>
        <p style="font-size: 10px; margin: 0;">Computer generated invoice</p>
      </div>
    `;
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '-9999px';
    iframe.style.bottom = '-9999px';
    iframe.style.width = '80mm';
    iframe.style.height = '100vh';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @page { margin: 0; size: auto; }
            body {
              margin: 0;
              padding: 5mm;
              font-family: 'Courier New', Courier, monospace;
              background-color: white;
              color: black;
              width: 80mm;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    iframeDoc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans relative">
      
      {/* --- MAIN UI --- */}
      <div>
        <StaffNavbar />

        <div className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANEL: PRODUCT & CALCULATION INPUTS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Top Controls */}
            <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-lg flex justify-between items-center">
              <h2 className="text-blue-500 font-bold text-lg flex items-center gap-2">
                <Calculator size={20} /> POINT OF SALE
              </h2>
            </div>

            {/* Form Grid */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
              
              {/* Row 1: Item Details */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Item Details</h3>
              <div className="grid grid-cols-4 gap-4 mb-6 relative">
                
                {/* Searchable Custom Dropdown */}
                <div className="relative">
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Search Product</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none pl-8" 
                      placeholder="Search SKU or Name..." 
                    />
                    <Search className="absolute left-2.5 top-2.5 text-gray-500" size={16} />
                  </div>
                  
                  {/* Dropdown Options */}
                  {showDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-gray-700 rounded shadow-2xl max-h-48 overflow-y-auto">
                      {inventoryData
                        .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.id.toLowerCase().includes(productSearch.toLowerCase()))
                        .map(item => (
                        <div 
                          key={item.id} 
                          className="p-2.5 hover:bg-blue-600 hover:text-white cursor-pointer text-sm transition-colors text-gray-300 border-b border-gray-800 last:border-0"
                          onClick={() => {
                            setProductId(item.id);
                            setProductName(item.name);
                            setProductSearch(`${item.id} - ${item.name}`);
                            setCategory(item.category);
                            setPrice(item.price.toString());
                            setQuantity('1');
                            setHsn(item.hsn);
                            setShowDropdown(false);
                          }}
                        >
                          <span className="font-bold text-blue-400">{item.id}</span> - {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Product Name</label>
                  <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" placeholder="e.g. Rice 5kg" />
                </div>
                <div>
                  <label className="block text-[11px] text-blue-500 mb-1 uppercase tracking-wide font-bold">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none font-bold"
                  >
                    <option value="Grocery">Grocery</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">HSN / SAC</label>
                  <input type="text" value={hsn} onChange={(e)=>setHsn(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" placeholder="e.g. 1006" />
                </div>
              </div>

              {/* Row 2: Pricing & Quantity */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Pricing & Quantity</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] text-blue-400 mb-1 uppercase tracking-wide">Unit Price (₹)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Quantity</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                    placeholder="1" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-green-400 mb-1 uppercase tracking-wide">Discount (₹)</label>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-green-200 focus:border-green-500 outline-none" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-white mb-1 uppercase tracking-wide font-bold">Net Amount (₹)</label>
                  <input 
                    type="text" 
                    value={itemTaxableAmount.toFixed(2)}
                    disabled 
                    className="w-full bg-black border border-gray-800 rounded p-2.5 text-white outline-none font-mono font-bold" 
                  />
                </div>
              </div>

              {/* Add Item Button */}
              <button 
                onClick={handleAddItem}
                className="w-full bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 hover:text-white text-blue-400 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all mb-6 shadow-lg shadow-blue-500/5"
              >
                <Plus size={20} /> ADD ITEM TO BILL
              </button>

              {/* Row 3: Customer Details & Payment Mode */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Customer & Payment Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Customer Name</label>
                  <input type="text" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1 uppercase tracking-wide">Mobile Number</label>
                  <input type="text" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-[11px] text-blue-500 mb-1 uppercase tracking-wide font-bold">Payment Mode</label>
                  <select 
                    value={paymentMode} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none font-bold"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card / POS</option>
                    <option value="UPI">UPI / QR Code</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT PANEL: SUMMARY & BILLING */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col h-full"
          >
            {/* Final Summary Card */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                  <IndianRupee size={18} className="text-blue-500"/> BILL SUMMARY
                </h3>
                <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300 font-bold">{cart.length} Items</span>
              </div>
              
              {/* CART ITEMS LIST */}
              {cart.length > 0 ? (
                <div className="mb-4 max-h-[300px] overflow-y-auto space-y-2 pr-2">
                  {cart.map((item, idx) => (
                    <div key={item.id} className="bg-[#121212] p-3 rounded border border-gray-800 flex justify-between items-center group">
                      <div>
                        <p className="text-sm font-bold text-gray-200 line-clamp-1">{idx + 1}. {item.productName}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">
                          Qty: {item.quantity} x ₹{item.price.toFixed(2)} {item.discount > 0 && `(Disc: ₹${item.discount})`}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-bold text-white">₹{item.taxableAmount.toFixed(2)}</span>
                        <button onClick={() => removeCartItem(item.id)} className="text-red-500 hover:text-red-400 p-1 opacity-70 hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 text-center py-10 text-gray-600 border border-dashed border-gray-800 rounded bg-[#121212]/50 flex-grow flex flex-col items-center justify-center">
                  <Store size={40} className="mb-3 opacity-20" />
                  <p className="text-sm">Scan or add items to generate bill.</p>
                </div>
              )}

              <div className="space-y-3 flex-grow mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sub Total</span>
                  <span className="font-mono text-gray-200">₹ {totals.baseAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Discount</span>
                  <span className="font-mono text-green-400">- ₹ {totals.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-800 pt-3">
                  <span className="text-gray-300 font-bold">Taxable Amount</span>
                  <span className="font-mono text-gray-200 font-bold">₹ {totals.taxableAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">GST (5%)</span>
                  <span className="font-mono text-blue-400">+ ₹ {totalGstAmt.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-[#121212] rounded-lg p-4 mt-6 border border-blue-500/30 text-center">
                 <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Grand Total</p>
                 <h2 className="text-blue-500 text-3xl font-bold font-mono">₹ {grandTotal.toFixed(2)}</h2>
              </div>

              {/* Print Button */}
              <button 
                onClick={handlePrint}
                className={`w-full mt-4 font-extrabold tracking-widest py-4 rounded-lg flex items-center justify-center gap-3 transition-all ${cart.length > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_5px_20px_rgba(37,99,235,0.3)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                disabled={cart.length === 0}
              >
                <Printer size={20} />
                PRINT INVOICE
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default StaffDashboard;