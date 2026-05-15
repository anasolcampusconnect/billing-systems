import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Printer, IndianRupee, Store, Plus, Trash2, Search, 
  X, Check, QrCode, Phone, User, CreditCard, Wallet, 
  Smartphone, Download, FileText, AlertCircle, ShoppingBag,
  DollarSign, Percent, Tag, Hash, Package, Users, Clock, RefreshCw
} from 'lucide-react';
import StaffNavbar from '../../components/Navbars/StaffNavbar';

const StaffDashboard = () => {
  // --- DUMMY INVENTORY DATA ---
  const inventoryData = [
    { id: 'SKU-1001', name: 'Premium Basmati Rice 5kg', category: 'Grocery', price: 850.00, hsn: '1006', gst: 5, stock: 50 },
    { id: 'SKU-1002', name: 'Premium Basmati Rice 10kg', category: 'Grocery', price: 1650.00, hsn: '1006', gst: 5, stock: 30 },
    { id: 'SKU-2005', name: 'Sunflower Oil 1L', category: 'Grocery', price: 145.00, hsn: '1512', gst: 5, stock: 100 },
    { id: 'SKU-2006', name: 'Sunflower Oil 5L', category: 'Grocery', price: 680.00, hsn: '1512', gst: 5, stock: 45 },
    { id: 'SKU-1045', name: 'Wireless Mouse', category: 'Electronics', price: 499.00, hsn: '8471', gst: 18, stock: 25 },
    { id: 'SKU-1046', name: 'Wireless Keyboard', category: 'Electronics', price: 1299.00, hsn: '8471', gst: 18, stock: 15 },
    { id: 'SKU-2010', name: 'Almonds 500g', category: 'Dry Fruits', price: 450.00, hsn: '0802', gst: 5, stock: 40 },
    { id: 'SKU-2011', name: 'Cashews 500g', category: 'Dry Fruits', price: 550.00, hsn: '0802', gst: 5, stock: 35 },
    { id: 'SKU-1088', name: 'Washing Powder 2kg', category: 'Household', price: 320.00, hsn: '3402', gst: 12, stock: 60 },
    { id: 'SKU-2099', name: 'Dark Chocolate Bar', category: 'Snacks', price: 99.00, hsn: '1806', gst: 18, stock: 120 },
    { id: 'SKU-2100', name: 'Potato Chips 50g', category: 'Snacks', price: 20.00, hsn: '1905', gst: 12, stock: 200 },
    { id: 'SKU-3001', name: 'T-Shirt (Cotton)', category: 'Clothing', price: 599.00, hsn: '6109', gst: 12, stock: 80 },
    { id: 'SKU-3002', name: 'Jeans (Blue)', category: 'Clothing', price: 1499.00, hsn: '6203', gst: 12, stock: 40 },
  ];

  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Grocery');
  const [hsn, setHsn] = useState('');
  const [gstPercent, setGstPercent] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [discount, setDiscount] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentBillData, setCurrentBillData] = useState(null);
  const [cashierName, setCashierName] = useState('John Doe');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const searchInputRef = useRef(null);

  // --- CALCULATIONS ---
  const p = parseFloat(price) || 0;
  const q = parseFloat(quantity) || 1;
  const d = parseFloat(discount) || 0;
  const baseAmount = p * q;
  let itemTaxableAmount = baseAmount - d;
  if (itemTaxableAmount < 0) itemTaxableAmount = 0;
  const itemGstAmount = itemTaxableAmount * (gstPercent / 100);
  const itemTotal = itemTaxableAmount + itemGstAmount;

  // --- CART TOTALS ---
  const totals = cart.reduce((acc, item) => {
    acc.baseAmount += item.baseAmount;
    acc.discount += item.discount;
    acc.taxableAmount += item.taxableAmount;
    acc.gstAmount += item.gstAmount;
    acc.totalAmount += item.totalAmount;
    return acc;
  }, { baseAmount: 0, discount: 0, taxableAmount: 0, gstAmount: 0, totalAmount: 0 });

  // GST breakdown by percentage
  const gstBreakdown = cart.reduce((acc, item) => {
    const gst = item.gstPercent;
    if (!acc[gst]) acc[gst] = { taxable: 0, cgst: 0, sgst: 0 };
    acc[gst].taxable += item.taxableAmount;
    acc[gst].cgst += item.gstAmount / 2;
    acc[gst].sgst += item.gstAmount / 2;
    return acc;
  }, {});

  // --- RESET FORM FUNCTION (for new bill) ---
  const resetFormForNewBill = () => {
    setCart([]);
    setCustomerName('');
    setMobile('');
    setProductSearch('');
    setProductName('');
    setProductId('');
    setPrice('');
    setQuantity('1');
    setDiscount('');
    setHsn('');
    setGstPercent(5);
    setCategory('Grocery');
    setPaymentMode('Cash');
    
    // Focus on search input for next bill
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // --- ADD ITEM TO CART ---
  const handleAddItem = () => {
    if (!productName || !price || !quantity) {
      alert("Please enter Product Name, Price and Quantity!");
      return;
    }

    if (parseFloat(quantity) <= 0) {
      alert("Quantity must be greater than 0!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      productId,
      productName,
      category,
      hsn,
      gstPercent,
      price: p,
      quantity: q,
      discount: d,
      baseAmount,
      taxableAmount: itemTaxableAmount,
      gstAmount: itemGstAmount,
      totalAmount: itemTotal
    };

    setCart([...cart, newItem]);

    // Clear product specific inputs but keep cart items
    setProductId('');
    setProductSearch('');
    setProductName('');
    setPrice('');
    setQuantity('1');
    setDiscount('');
    setHsn('');
    setGstPercent(5);
    
    // Focus back to search
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // --- REMOVE ITEM FROM CART ---
  const removeCartItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // --- UPDATE CART ITEM QUANTITY ---
  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeCartItem(id);
      return;
    }
    
    setCart(cart.map(item => {
      if (item.id === id) {
        const newBaseAmount = item.price * newQuantity;
        const newTaxableAmount = newBaseAmount - item.discount;
        const newGstAmount = newTaxableAmount * (item.gstPercent / 100);
        const newTotalAmount = newTaxableAmount + newGstAmount;
        
        return {
          ...item,
          quantity: newQuantity,
          baseAmount: newBaseAmount,
          taxableAmount: newTaxableAmount,
          gstAmount: newGstAmount,
          totalAmount: newTotalAmount
        };
      }
      return item;
    }));
  };

  // --- SELECT PRODUCT FROM DROPDOWN ---
  const selectProduct = (item) => {
    setProductId(item.id);
    setProductName(item.name);
    setProductSearch(`${item.id} - ${item.name}`);
    setCategory(item.category);
    setPrice(item.price.toString());
    setQuantity('1');
    setHsn(item.hsn);
    setGstPercent(item.gst || 5);
    setShowDropdown(false);
    setDiscount('');
  };

  // --- GENERATE BILL NUMBER ---
  const generateBillNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}${month}${day}-${random}`;
  };

  // --- GENERATE RECEIPT HTML ---
  const generateReceiptHTML = (billData) => {
    const date = new Date();
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Invoice ${billData.billNumber}</title>
          <style>
            @page { 
              margin: 0; 
              size: 80mm auto;
            }
            body {
              margin: 0;
              padding: 8px;
              font-family: 'Courier New', Courier, monospace;
              background: white;
              color: black;
              font-size: 12px;
              width: 80mm;
            }
            .header {
              text-align: center;
              margin-bottom: 12px;
              border-bottom: 1px dashed #000;
              padding-bottom: 8px;
            }
            .header h1 {
              font-size: 18px;
              margin: 0 0 4px 0;
            }
            .header p {
              margin: 2px 0;
              font-size: 10px;
            }
            .info {
              margin-bottom: 12px;
              font-size: 11px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 12px;
            }
            .items-table th {
              border-bottom: 1px dashed #000;
              padding: 4px 0;
              text-align: left;
              font-size: 11px;
            }
            .items-table td {
              padding: 4px 0;
              border-bottom: 1px dotted #ccc;
              font-size: 10px;
            }
            .totals {
              border-top: 1px dashed #000;
              padding-top: 8px;
              margin-top: 8px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
            }
            .grand-total {
              font-size: 14px;
              font-weight: bold;
              border-top: 1px solid #000;
              padding-top: 6px;
              margin-top: 6px;
            }
            .footer {
              text-align: center;
              margin-top: 16px;
              border-top: 1px dashed #000;
              padding-top: 8px;
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RETAIL MASTER</h1>
            <p>123 Main Road, Hyderabad - 500001</p>
            <p>GST: 36ABCDE1234F1Z5 | Ph: +91 9876543210</p>
          </div>

          <div class="info">
            <div class="info-row">
              <span>Bill No: ${billData.billNumber}</span>
              <span>Date: ${date.toLocaleDateString()}</span>
            </div>
            <div class="info-row">
              <span>Time: ${date.toLocaleTimeString()}</span>
              <span>Cashier: ${cashierName}</span>
            </div>
            <div class="info-row">
              <span>Customer: ${customerName || 'Walk-in Customer'}</span>
              <span>${mobile ? `Mobile: ${mobile}` : ''}</span>
            </div>
            <div class="info-row">
              <span>Payment: ${paymentMode}</span>
            </div>
          </div>

          <div style="border-top: 1px dashed #000;"></div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td style="max-width: 100px;">${item.productName.substring(0, 25)}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">${item.price.toFixed(2)}</td>
                  <td style="text-align: right;">${item.totalAmount.toFixed(2)}</td>
                </tr>
                ${item.discount > 0 ? `
                <tr>
                  <td colspan="3" style="padding-left: 8px; color: #666;">Disc: ₹${item.discount.toFixed(2)}</td>
                  <td style="text-align: right; color: #666;">-${item.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
              `).join('')}
            </tbody>
          </table>

          <div style="border-top: 1px dashed #000;"></div>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>₹ ${totals.baseAmount.toFixed(2)}</span>
            </div>
            ${totals.discount > 0 ? `
            <div class="total-row">
              <span>Discount</span>
              <span>- ₹ ${totals.discount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="total-row">
              <span>Taxable Amount</span>
              <span>₹ ${totals.taxableAmount.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>GST (${Object.keys(gstBreakdown).join(', ')}%)</span>
              <span>₹ ${totals.gstAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="border-top: 1px dashed #000;"></div>

          <div class="grand-total">
            <div class="total-row">
              <span style="font-size: 14px; font-weight: bold;">GRAND TOTAL</span>
              <span style="font-size: 16px; font-weight: bold;">₹ ${totals.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>*** THANK YOU! VISIT AGAIN ***</p>
            <p>This is a computer generated invoice</p>
          </div>
        </body>
      </html>
    `;
  };

  // --- PRINT INVOICE & RESET FOR NEW BILL ---
  const handlePrint = () => {
    if (cart.length === 0) {
      alert("Please add at least one item to the bill before printing!");
      return;
    }

    const billNumber = generateBillNumber();
    const billData = { billNumber, cart, totals, gstBreakdown };
    setCurrentBillData(billData);
    
    const htmlContent = generateReceiptHTML(billData);
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '-9999px';
    iframe.style.bottom = '-9999px';
    iframe.style.width = '80mm';
    iframe.style.height = '100vh';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        // AFTER PRINTING, RESET EVERYTHING FOR NEW BILL
        showSuccessAndReset();
      }, 2000);
    }, 250);
  };

  // --- SHOW SUCCESS POPUP AND RESET ---
  const showSuccessAndReset = () => {
    setShowSuccessPopup(true);
    // Reset all form fields and cart for new bill
    resetFormForNewBill();
    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  // --- SHOW RECEIPT MODAL ---
  const handleShowReceipt = () => {
    if (cart.length === 0) {
      alert("Please add items to generate receipt!");
      return;
    }
    setShowReceiptModal(true);
  };

  // --- CLEAR ALL CART ---
  const handleClearCart = () => {
    if (cart.length > 0 && window.confirm("Are you sure you want to clear all items?")) {
      setCart([]);
      setCustomerName('');
      setMobile('');
    }
  };

  // --- NEW BILL (Manual reset) ---
  const handleNewBill = () => {
    if (cart.length > 0 && window.confirm("Start a new bill? Current items will be cleared.")) {
      resetFormForNewBill();
    } else if (cart.length === 0) {
      resetFormForNewBill();
    }
  };

  // Current date and time
  const currentDateTime = new Date();
  const dateStr = currentDateTime.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  const timeStr = currentDateTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <StaffNavbar />
      
      <div className="p-4 md:p-6 max-w-[1920px] mx-auto">
        {/* Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <Check size={24} />
              <span className="font-bold">Bill Generated Successfully! Ready for next bill.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Bar */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-xl shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Point of Sale</h1>
              <p className="text-gray-400 text-sm">Retail Billing System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">{dateStr} | {timeStr}</span>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3">
                <Users size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">Cashier: <span className="text-white font-semibold">{cashierName}</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANEL - Product Entry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Search & Entry Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 px-6 py-4 border-b border-gray-700">
                <h2 className="text-blue-400 font-bold text-lg flex items-center gap-2">
                  <Search size={20} /> Add Product to Bill
                </h2>
              </div>
              
              <div className="p-6">
                {/* Searchable Product Dropdown */}
                <div className="relative mb-6">
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                    <Tag size={12} className="inline mr-1" /> Search Product by Name or SKU
                  </label>
                  <div className="relative">
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-xl p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none pl-10 transition-all"
                      placeholder="Type to search products..." 
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    {productSearch && (
                      <button 
                        onClick={() => {
                          setProductSearch('');
                          setShowDropdown(false);
                        }}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto"
                      >
                        {inventoryData
                          .filter(p => 
                            p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                            p.id.toLowerCase().includes(productSearch.toLowerCase())
                          )
                          .map(item => (
                            <div 
                              key={item.id} 
                              className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer transition-all border-b border-gray-700 last:border-0 flex justify-between items-center"
                              onClick={() => selectProduct(item)}
                            >
                              <div>
                                <span className="font-mono text-xs text-blue-400">{item.id}</span>
                                <p className="font-medium text-gray-200">{item.name}</p>
                                <div className="flex gap-3 text-xs text-gray-400 mt-1">
                                  <span>{item.category}</span>
                                  <span>HSN: {item.hsn}</span>
                                  <span>GST: {item.gst}%</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-green-400">₹{item.price}</p>
                                <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                              </div>
                            </div>
                          ))}
                        {inventoryData.filter(p => 
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.id.toLowerCase().includes(productSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="p-6 text-center text-gray-500">
                            <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                            <p>No products found</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Product Name</label>
                    <input 
                      type="text" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
                      placeholder="Product name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
                    >
                      <option value="Grocery">Grocery</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Household">Household</option>
                      <option value="Dry Fruits">Dry Fruits</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">HSN Code</label>
                    <input 
                      type="text" 
                      value={hsn} 
                      onChange={(e) => setHsn(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
                      placeholder="HSN code" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">GST %</label>
                    <select 
                      value={gstPercent}
                      onChange={(e) => setGstPercent(Number(e.target.value))}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
                      <DollarSign size={12} className="inline mr-1" /> Unit Price (₹)
                    </label>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                      placeholder="0.00" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
                      <Package size={12} className="inline mr-1" /> Quantity
                    </label>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                      placeholder="1" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
                      <Percent size={12} className="inline mr-1" /> Discount (₹)
                    </label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-green-400 focus:border-green-500 outline-none" 
                      placeholder="0.00" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-blue-400 mb-1 uppercase tracking-wider font-bold">
                      <Calculator size={12} className="inline mr-1" /> Net Amount
                    </label>
                    <input 
                      type="text" 
                      value={itemTotal.toFixed(2)}
                      disabled 
                      className="w-full bg-gray-900 border border-blue-500/30 rounded-lg p-2.5 text-blue-400 outline-none font-mono font-bold" 
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleAddItem}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Plus size={20} /> ADD TO CART
                  </button>
                  <button 
                    onClick={handleNewBill}
                    className="px-6 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <RefreshCw size={20} /> NEW BILL
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Customer Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 px-6 py-4 border-b border-gray-700">
                <h2 className="text-blue-400 font-bold text-lg flex items-center gap-2">
                  <Users size={20} /> Customer Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      <User size={12} className="inline mr-1" /> Customer Name
                    </label>
                    <input 
                      type="text" 
                      value={customerName} 
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
                      placeholder="Walk-in Customer" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      <Phone size={12} className="inline mr-1" /> Mobile Number
                    </label>
                    <input 
                      type="tel" 
                      value={mobile} 
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none" 
                      placeholder="+91 9876543210" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      <CreditCard size={12} className="inline mr-1" /> Payment Mode
                    </label>
                    <select 
                      value={paymentMode} 
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                    >
                      <option value="Cash">💵 Cash</option>
                      <option value="Card">💳 Card / POS</option>
                      <option value="UPI">📱 UPI / QR Code</option>
                      <option value="Bank Transfer">🏦 Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL - Cart & Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Cart Items Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden flex flex-col h-full">
              <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-blue-400 font-bold text-lg flex items-center gap-2">
                    <ShoppingBag size={20} /> Cart Items
                  </h2>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 max-h-[400px] overflow-y-auto p-4 space-y-2">
                <AnimatePresence>
                  {cart.length > 0 ? (
                    cart.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-900 rounded-xl p-3 border border-gray-700 hover:border-blue-500/30 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-white">
                              {idx + 1}. {item.productName}
                            </p>
                            <div className="flex gap-3 text-xs text-gray-500 mt-1">
                              <span>HSN: {item.hsn}</span>
                              <span>GST: {item.gstPercent}%</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeCartItem(item.id)}
                            className="text-red-500 hover:text-red-400 p-1 opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-white font-mono w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
                            >
                              +
                            </button>
                            <span className="text-gray-400 text-sm ml-2">
                              × ₹{item.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">₹{item.totalAmount.toFixed(2)}</p>
                            {item.discount > 0 && (
                              <p className="text-green-400 text-xs">-₹{item.discount.toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Store size={48} className="mx-auto mb-3 text-gray-600" />
                      <p className="text-gray-500">Cart is empty</p>
                      <p className="text-gray-600 text-sm mt-1">Search and add products</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Actions */}
              {cart.length > 0 && (
                <div className="px-4 pb-2">
                  <button 
                    onClick={handleClearCart}
                    className="w-full py-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                  >
                    Clear All Items
                  </button>
                </div>
              )}

              {/* Bill Summary */}
              {cart.length > 0 && (
                <>
                  <div className="border-t border-gray-700 p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-mono text-white">₹ {totals.baseAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Discount</span>
                      <span className="font-mono text-green-400">- ₹ {totals.discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Taxable Amount</span>
                      <span className="font-mono text-white">₹ {totals.taxableAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">GST Amount</span>
                      <span className="font-mono text-blue-400">+ ₹ {totals.gstAmount.toFixed(2)}</span>
                    </div>
                    
                    {/* GST Breakdown */}
                    {Object.keys(gstBreakdown).length > 0 && (
                      <div className="bg-gray-900 rounded-lg p-3 mt-2">
                        <p className="text-xs text-gray-500 mb-2">GST Breakdown</p>
                        {Object.entries(gstBreakdown).map(([gst, data]) => (
                          <div key={gst} className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">@{gst}%</span>
                            <span className="text-gray-500">
                              CGST: ₹{data.cgst.toFixed(2)} | SGST: ₹{data.sgst.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Grand Total */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 mx-4 mb-4 rounded-xl p-4 border border-blue-500/20">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Grand Total</p>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold text-white">₹ {totals.totalAmount.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">Incl. all taxes</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 pt-0 space-y-3">
                    <button 
                      onClick={handlePrint}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30"
                    >
                      <Printer size={20} /> PRINT INVOICE
                    </button>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={handleShowReceipt}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        <Download size={18} /> VIEW RECEIPT
                      </button>
                      <button 
                        className="flex-1 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                        onClick={() => alert("WhatsApp feature coming soon!")}
                      >
                        <Smartphone size={18} /> WHATSAPP
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowReceiptModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Bill Receipt</h3>
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <style>
                  {`
                    .receipt-content {
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 12px;
                      line-height: 1.4;
                    }
                    .receipt-content h1 { font-size: 16px; text-align: center; margin-bottom: 8px; }
                    .receipt-content .divider { border-top: 1px dashed #000; margin: 8px 0; }
                  `}
                </style>
                <div 
                  className="receipt-content"
                  dangerouslySetInnerHTML={{ 
                    __html: generateReceiptHTML({ 
                      billNumber: generateBillNumber(), 
                      cart, 
                      totals, 
                      gstBreakdown 
                    })
                  }}
                />
              </div>
              
              <div className="border-t border-gray-200 p-4 flex gap-3">
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
                >
                  Close
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffDashboard;