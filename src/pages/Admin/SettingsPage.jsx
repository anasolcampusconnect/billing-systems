import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Palette,
  Receipt,
  Languages,
  History,
  Save,
  Download,
  RefreshCw,
  CheckCircle,
  Moon,
  Sun,
  Shield,
  Key,
  Bell,
  Mail,
  Clock,
  Building2,
  MapPin,
  Printer,
  FileText,
  Zap,
  Eye,
  EyeOff,
  CreditCard,
  Users,
  Briefcase,
  Phone,
  AtSign,
  Plus,
  X,
  Edit,
  Trash2,
  LogOut,
  ChevronRight,
  Globe,
  Smartphone,
  Volume2,
} from "lucide-react";

// ─── Toggle Switch Component ──────────────────────────────────────────────────
const Toggle = ({ enabled, setEnabled, disabled = false }) => (
  <button
    onClick={() => !disabled && setEnabled(!enabled)}
    disabled={disabled}
    aria-checked={enabled}
    role="switch"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white ${
      enabled ? "bg-indigo-600" : "bg-gray-200"
    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ${
        enabled ? "translate-x-6 bg-white" : "translate-x-1 bg-white"
      }`}
    />
  </button>
);

// ─── Setting Row Component ────────────────────────────────────────────────────
const SettingRow = ({
  icon: Icon,
  title,
  description,
  children,
  iconClass = "text-indigo-600",
  warning = false,
}) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 rounded-2xl border transition-all duration-300 ${
      warning
        ? "bg-amber-50 border-amber-100"
        : "bg-white border-gray-100 hover:shadow-md hover:border-indigo-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${iconClass} shadow-sm flex items-center justify-center`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-[15px] font-black text-gray-800 tracking-wide">
          {title}
        </p>
        <p className="text-[13px] text-gray-400 font-bold mt-0.5">
          {description}
        </p>
      </div>
    </div>
    {children}
  </div>
);

// ─── Input Field Component ────────────────────────────────────────────────────
const Field = ({
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder = "",
  error = "",
  required = false,
}) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-black tracking-[0.1em] text-gray-400 uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={16} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-2xl border ${
          error ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
        } text-gray-800 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all`}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// ─── Select Field Component ───────────────────────────────────────────────────
const SelectField = ({ label, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-black tracking-[0.1em] text-gray-400 uppercase">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// ─── Activity Item Component ──────────────────────────────────────────────────
const ActivityItem = ({ icon: Icon, action, time, type }) => {
  const colorMap = {
    success: "from-emerald-500 to-emerald-400",
    warning: "from-amber-500 to-amber-400",
    info: "from-indigo-500 to-indigo-400",
  };
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all group">
      <div
        className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${colorMap[type] || colorMap.info} shadow-sm flex items-center justify-center`}
      >
        <Icon size={16} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-700">{action}</p>
      </div>
      <p className="text-xs font-bold text-gray-400">{time}</p>
    </div>
  );
};

// ─── Business Info Card Component ─────────────────────────────────────────────
const BusinessInfoCard = ({
  business,
  onEdit,
  isEditing,
  onSave,
  onCancel,
  onChange,
}) => {
  if (isEditing) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Business Name"
            value={business.name}
            onChange={(e) => onChange("name", e.target.value)}
            icon={Building2}
          />
          <Field
            label="GSTIN"
            value={business.gstin}
            onChange={(e) => onChange("gstin", e.target.value)}
            icon={CreditCard}
          />
          <Field
            label="Email"
            value={business.email}
            onChange={(e) => onChange("email", e.target.value)}
            icon={AtSign}
          />
          <Field
            label="Phone"
            value={business.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            icon={Phone}
          />
          <div className="md:col-span-2">
            <Field
              label="Address"
              value={business.address}
              onChange={(e) => onChange("address", e.target.value)}
              icon={MapPin}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:text-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-sm">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="text-base font-black text-gray-800">
              {business.name}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <p className="font-bold text-gray-500">
              GST: <span className="text-gray-700">{business.gstin}</span>
            </p>
            <p className="font-bold text-gray-500">
              Email: <span className="text-gray-700">{business.email}</span>
            </p>
            <p className="font-bold text-gray-500">
              Phone: <span className="text-gray-700">{business.phone}</span>
            </p>
            <p className="font-bold text-gray-500 sm:col-span-2">
              Address: <span className="text-gray-700">{business.address}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition"
        >
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
};

// ─── Bank Account Card Component ──────────────────────────────────────────────
const BankAccountCard = ({
  account,
  onEdit,
  onDelete,
  isEditing,
  onSave,
  onCancel,
  onChange,
}) => {
  if (isEditing) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Bank Name"
            value={account.bankName}
            onChange={(e) => onChange("bankName", e.target.value)}
          />
          <Field
            label="Account Number"
            value={account.accountNumber}
            onChange={(e) => onChange("accountNumber", e.target.value)}
          />
          <Field
            label="IFSC Code"
            value={account.ifsc}
            onChange={(e) => onChange("ifsc", e.target.value)}
          />
          <Field
            label="Account Holder"
            value={account.holderName}
            onChange={(e) => onChange("holderName", e.target.value)}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-sm">
              <CreditCard size={12} className="text-white" />
            </div>
            <span className="text-sm font-black text-gray-800">
              {account.bankName}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-500">
            •••• {account.accountNumber.slice(-4)}
          </p>
          <p className="text-xs font-bold text-gray-400">{account.ifsc}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-red-600 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Change Password Modal ────────────────────────────────────────────────────
const ChangePasswordModal = ({ isOpen, onClose, onSuccess, addActivity }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (currentPassword !== "admin123") {
      setErrors({ currentPassword: "Current password is incorrect" });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    addActivity("Password changed successfully", "success", Key);
    onSuccess();
    onClose();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-sm">
              <Key size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-black text-gray-800">
              Change Password
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1 font-bold">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1 font-bold">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 font-bold">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-black text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-3 bg-indigo-600 rounded-xl text-sm font-black text-white hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <CheckCircle size={16} />
              )}
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Settings Component ──────────────────────────────────────────────────
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@billing.co",
    phone: "+91 98765 43210",
    role: "Billing Manager",
    department: "Finance",
    location: "Hyderabad, India",
  });

  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const [darkMode, setDarkMode] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [accentColor, setAccentColor] = useState("indigo");
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    suffix: "",
    nextNumber: 1001,
    defaultTax: 18,
    defaultDiscount: 0,
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    footerNote: "Thank you for your business!",
  });
  const [autoSendEmail, setAutoSendEmail] = useState(true);
  const [attachPdf, setAttachPdf] = useState(true);

  const [businessInfo, setBusinessInfo] = useState({
    name: "Acme Billing Solutions Pvt Ltd",
    gstin: "36AABCU9603R1ZX",
    email: "accounts@acme.in",
    phone: "+91 40 1234 5678",
    address: "Hitech City, Hyderabad, Telangana - 500081",
  });
  const [editingBusiness, setEditingBusiness] = useState(false);
  const [tempBusiness, setTempBusiness] = useState({ ...businessInfo });

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: "HDFC Bank",
      accountNumber: "123456789012",
      ifsc: "HDFC0001234",
      holderName: "Acme Billing Solutions",
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      accountNumber: "987654321098",
      ifsc: "ICIC0005678",
      holderName: "Acme Billing Solutions",
    },
  ]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [tempAccount, setTempAccount] = useState(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
    holderName: "",
  });

  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [numberFormat, setNumberFormat] = useState("indian");

  const [activities, setActivities] = useState([
    {
      id: 1,
      action: "Profile information updated",
      time: "2 hours ago",
      type: "success",
      icon: User,
    },
    {
      id: 2,
      action: "Security settings modified",
      time: "1 day ago",
      type: "warning",
      icon: Shield,
    },
    {
      id: 3,
      action: "Bank account added",
      time: "3 days ago",
      type: "info",
      icon: CreditCard,
    },
    {
      id: 4,
      action: "Invoice settings configured",
      time: "1 week ago",
      type: "success",
      icon: Receipt,
    },
    {
      id: 5,
      action: "Password changed",
      time: "2 weeks ago",
      type: "success",
      icon: Key,
    },
  ]);

  const addActivity = (action, type, icon) => {
    setActivities((prev) => [
      { id: Date.now(), action, time: "Just now", type, icon },
      ...prev.slice(0, 19),
    ]);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    setSaveSuccess(true);
    addActivity(
      `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings saved`,
      "success",
      Save,
    );
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportSettings = () => {
    const settings = { profile, invoiceSettings, businessInfo, bankAccounts };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "billing_settings_backup.json";
    a.click();
    URL.revokeObjectURL(url);
    addActivity("Settings exported as backup", "success", Download);
  };

  const handleResetSettings = () => {
    if (window.confirm("Reset all settings to default?")) {
      setProfile({
        fullName: "John Doe",
        email: "john@billing.co",
        phone: "+91 98765 43210",
        role: "Billing Manager",
        department: "Finance",
        location: "Hyderabad, India",
      });
      setTwoFactor(false);
      setDarkMode(true);
      setCompactMode(false);
      setAccentColor("indigo");
      setInvoiceSettings({
        prefix: "INV",
        suffix: "",
        nextNumber: 1001,
        defaultTax: 18,
        defaultDiscount: 0,
        currency: "INR",
        dateFormat: "DD/MM/YYYY",
        footerNote: "Thank you for your business!",
      });
      addActivity("All settings reset to default", "warning", RefreshCw);
    }
  };

  const handleBusinessEdit = () => {
    setTempBusiness({ ...businessInfo });
    setEditingBusiness(true);
  };

  const handleBusinessSave = () => {
    setBusinessInfo(tempBusiness);
    setEditingBusiness(false);
    addActivity("Business information updated", "info", Building2);
  };

  const handleAddBankAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber) {
      const newId = Math.max(...bankAccounts.map((a) => a.id), 0) + 1;
      setBankAccounts([...bankAccounts, { id: newId, ...newAccount }]);
      setShowAddAccount(false);
      setNewAccount({
        bankName: "",
        accountNumber: "",
        ifsc: "",
        holderName: "",
      });
      addActivity(
        `Bank account ${newAccount.bankName} added`,
        "success",
        CreditCard,
      );
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account.id);
    setTempAccount({ ...account });
  };

  const handleSaveAccount = () => {
    setBankAccounts(
      bankAccounts.map((acc) =>
        acc.id === editingAccount ? tempAccount : acc,
      ),
    );
    setEditingAccount(null);
    addActivity(
      `Bank account ${tempAccount.bankName} updated`,
      "info",
      CreditCard,
    );
  };

  const handleDeleteAccount = (id) => {
    if (window.confirm("Remove this bank account?")) {
      setBankAccounts(bankAccounts.filter((acc) => acc.id !== id));
      addActivity("Bank account removed", "warning", CreditCard);
    }
  };

  const ACCENT_COLORS = [
    {
      name: "indigo",
      hex: "#4f46e5",
      gradient: "from-indigo-600 to-indigo-400",
    },
    { name: "blue", hex: "#3b82f6", gradient: "from-blue-600 to-blue-400" },
    {
      name: "emerald",
      hex: "#10b981",
      gradient: "from-emerald-600 to-emerald-400",
    },
    {
      name: "purple",
      hex: "#8b5cf6",
      gradient: "from-purple-600 to-purple-400",
    },
    { name: "rose", hex: "#f43f5e", gradient: "from-rose-600 to-rose-400" },
  ];

  const TABS = [
    {
      id: "profile",
      label: "Profile",
      desc: "Personal information",
      icon: User,
      group: "Account",
    },
    {
      id: "notifications",
      label: "Notifications",
      desc: "Alerts & reminders",
      icon: Bell,
      group: "Account",
    },
    {
      id: "security",
      label: "Security",
      desc: "Password & 2FA",
      icon: Lock,
      group: "Account",
    },
    {
      id: "appearance",
      label: "Appearance",
      desc: "Theme & display",
      icon: Palette,
      group: "System",
    },
    {
      id: "invoicing",
      label: "Invoicing",
      desc: "Invoice defaults",
      icon: Receipt,
      group: "System",
    },
    {
      id: "business",
      label: "Business",
      desc: "Company & bank",
      icon: Building2,
      group: "System",
    },
    {
      id: "language",
      label: "Language",
      desc: "Locale & region",
      icon: Languages,
      group: "System",
    },
    {
      id: "activity",
      label: "Activity",
      desc: "Recent actions",
      icon: History,
      group: "System",
    },
  ];

  const accountTabs = TABS.filter((t) => t.group === "Account");
  const systemTabs = TABS.filter((t) => t.group === "System");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Settings
            </h1>
            <p className="text-sm font-bold text-gray-400 mt-1 tracking-widest uppercase">
              Manage your billing software preferences
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResetSettings}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-amber-200 text-amber-600 rounded-2xl text-sm font-black hover:bg-amber-50 hover:shadow-md transition-all"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all shadow-sm ${
                saveSuccess
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : isSaving
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isSaving ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle size={16} />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 overflow-x-auto lg:overflow-visible">
            <div className="flex lg:flex-col gap-1 pb-2 lg:pb-0">
              <p className="hidden lg:block text-xs font-black text-gray-400 uppercase px-3 pb-2 tracking-wider">
                Account
              </p>
              {accountTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all whitespace-nowrap lg:whitespace-normal group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200"
                        : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm font-black">{tab.label}</p>
                      <p
                        className={`text-xs font-bold ${activeTab === tab.id ? "text-indigo-100" : "text-gray-400"}`}
                      >
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
              <p className="hidden lg:block text-xs font-black text-gray-400 uppercase px-3 pb-2 pt-4 tracking-wider">
                System
              </p>
              {systemTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all whitespace-nowrap lg:whitespace-normal group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200"
                        : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <div>
                      <p className="text-sm font-black">{tab.label}</p>
                      <p
                        className={`text-xs font-bold ${activeTab === tab.id ? "text-indigo-100" : "text-gray-400"}`}
                      >
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                  <h2 className="text-xl font-black text-gray-800 capitalize">
                    {TABS.find((t) => t.id === activeTab)?.label} Settings
                  </h2>
                  <p className="text-sm font-bold text-gray-400 mt-1">
                    {TABS.find((t) => t.id === activeTab)?.desc}
                  </p>
                </div>

                <div className="p-6">
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 shadow-lg flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                          {profile.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="text-center sm:text-left">
                          <p className="text-sm font-bold text-gray-500">
                            Profile Photo — JPG, PNG. Max 2MB.
                          </p>
                          <button className="text-sm font-black text-indigo-600 mt-2 hover:text-indigo-700 transition flex items-center gap-1">
                            Upload new photo <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field
                          label="Full Name"
                          value={profile.fullName}
                          icon={User}
                          onChange={(e) =>
                            setProfile({ ...profile, fullName: e.target.value })
                          }
                        />
                        <Field
                          label="Email Address"
                          value={profile.email}
                          icon={AtSign}
                          type="email"
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                        />
                        <Field
                          label="Phone Number"
                          value={profile.phone}
                          icon={Phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                        <Field
                          label="Location"
                          value={profile.location}
                          icon={MapPin}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                        />
                        <Field
                          label="Role"
                          value={profile.role}
                          icon={Briefcase}
                          onChange={(e) =>
                            setProfile({ ...profile, role: e.target.value })
                          }
                        />
                        <Field
                          label="Department"
                          value={profile.department}
                          icon={Users}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              department: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div className="space-y-3">
                      <SettingRow
                        icon={Volume2}
                        title="Push Notifications"
                        description="Real-time alerts in-app"
                        iconClass="from-indigo-600 to-indigo-400"
                      >
                        <Toggle
                          enabled={pushNotifs}
                          setEnabled={setPushNotifs}
                        />
                      </SettingRow>
                      <SettingRow
                        icon={Mail}
                        title="Email Notifications"
                        description="Invoice & payment updates via email"
                        iconClass="from-blue-600 to-blue-400"
                      >
                        <Toggle
                          enabled={emailNotifs}
                          setEnabled={setEmailNotifs}
                        />
                      </SettingRow>
                      <SettingRow
                        icon={Smartphone}
                        title="SMS Alerts"
                        description="Critical payment alerts via SMS"
                        iconClass="from-emerald-600 to-emerald-400"
                      >
                        <Toggle enabled={smsNotifs} setEnabled={setSmsNotifs} />
                      </SettingRow>
                      <SettingRow
                        icon={Bell}
                        title="Payment Reminders"
                        description="Auto-remind clients before due date"
                        iconClass="from-amber-500 to-amber-400"
                      >
                        <Toggle enabled={true} setEnabled={() => {}} />
                      </SettingRow>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div className="space-y-3">
                      <SettingRow
                        icon={Key}
                        title="Change Password"
                        description="Update your login credentials"
                        iconClass="from-amber-500 to-amber-400"
                      >
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-xl text-sm font-black hover:bg-gray-200 transition-all"
                        >
                          <Edit size={14} /> Change Password
                        </button>
                      </SettingRow>

                      <SettingRow
                        icon={Shield}
                        title="Two-Factor Authentication"
                        description="Extra layer of account security"
                        iconClass="from-emerald-600 to-emerald-400"
                      >
                        <Toggle enabled={twoFactor} setEnabled={setTwoFactor} />
                      </SettingRow>

                      <SettingRow
                        icon={Clock}
                        title="Session Timeout"
                        description="Auto-logout after inactivity"
                        iconClass="from-indigo-600 to-indigo-400"
                      >
                        <select
                          value={sessionTimeout}
                          onChange={(e) => setSessionTimeout(e.target.value)}
                          className="px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </SettingRow>

                      <SettingRow
                        icon={Bell}
                        title="Login Alerts"
                        description="Notify on new device login"
                        iconClass="from-purple-600 to-purple-400"
                      >
                        <Toggle
                          enabled={loginAlerts}
                          setEnabled={setLoginAlerts}
                        />
                      </SettingRow>

                      <SettingRow
                        icon={LogOut}
                        title="Active Sessions"
                        description="Manage connected devices"
                        iconClass="from-rose-600 to-rose-400"
                        warning
                      >
                        <button className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition">
                          View All →
                        </button>
                      </SettingRow>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === "appearance" && (
                    <div className="space-y-5">
                      <SettingRow
                        icon={darkMode ? Moon : Sun}
                        title="Dark Mode"
                        description="Toggle dark / light interface"
                        iconClass="from-indigo-600 to-indigo-400"
                      >
                        <Toggle enabled={darkMode} setEnabled={setDarkMode} />
                      </SettingRow>
                      <SettingRow
                        icon={Zap}
                        title="Compact Mode"
                        description="Reduce spacing for more content"
                        iconClass="from-emerald-600 to-emerald-400"
                      >
                        <Toggle
                          enabled={compactMode}
                          setEnabled={setCompactMode}
                        />
                      </SettingRow>
                      <SettingRow
                        icon={Palette}
                        title="Animations"
                        description="Enable smooth transitions"
                        iconClass="from-purple-600 to-purple-400"
                      >
                        <Toggle
                          enabled={animationEnabled}
                          setEnabled={setAnimationEnabled}
                        />
                      </SettingRow>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase mb-3 tracking-wider">
                          Accent Color
                        </p>
                        <div className="flex gap-3">
                          {ACCENT_COLORS.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setAccentColor(color.name)}
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${color.gradient} transition-all hover:scale-110 shadow-md ${
                                accentColor === color.name
                                  ? "ring-2 ring-indigo-500 ring-offset-2 scale-110"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invoicing Tab */}
                  {activeTab === "invoicing" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field
                          label="Invoice Prefix"
                          value={invoiceSettings.prefix}
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              prefix: e.target.value,
                            })
                          }
                        />
                        <Field
                          label="Invoice Suffix"
                          value={invoiceSettings.suffix}
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              suffix: e.target.value,
                            })
                          }
                        />
                        <Field
                          label="Next Invoice Number"
                          value={invoiceSettings.nextNumber}
                          type="number"
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              nextNumber: parseInt(e.target.value),
                            })
                          }
                        />
                        <Field
                          label="Default Tax (%)"
                          value={invoiceSettings.defaultTax}
                          type="number"
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              defaultTax: parseFloat(e.target.value),
                            })
                          }
                        />
                        <SelectField
                          label="Currency"
                          value={invoiceSettings.currency}
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              currency: e.target.value,
                            })
                          }
                          options={[
                            { value: "INR", label: "INR - Indian Rupee ₹" },
                            { value: "USD", label: "USD - US Dollar $" },
                            { value: "EUR", label: "EUR - Euro €" },
                          ]}
                        />
                        <SelectField
                          label="Date Format"
                          value={invoiceSettings.dateFormat}
                          onChange={(e) =>
                            setInvoiceSettings({
                              ...invoiceSettings,
                              dateFormat: e.target.value,
                            })
                          }
                          options={[
                            { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                            { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                            { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                          ]}
                        />
                      </div>
                      <Field
                        label="Invoice Footer Note"
                        value={invoiceSettings.footerNote}
                        icon={FileText}
                        onChange={(e) =>
                          setInvoiceSettings({
                            ...invoiceSettings,
                            footerNote: e.target.value,
                          })
                        }
                      />
                      <div className="space-y-3 mt-3">
                        <SettingRow
                          icon={Mail}
                          title="Auto-send Email"
                          description="Send invoice email automatically"
                          iconClass="from-blue-600 to-blue-400"
                        >
                          <Toggle
                            enabled={autoSendEmail}
                            setEnabled={setAutoSendEmail}
                          />
                        </SettingRow>
                        <SettingRow
                          icon={Printer}
                          title="Attach PDF"
                          description="Include PDF attachment with email"
                          iconClass="from-purple-600 to-purple-400"
                        >
                          <Toggle
                            enabled={attachPdf}
                            setEnabled={setAttachPdf}
                          />
                        </SettingRow>
                      </div>
                    </div>
                  )}

                  {/* Business Tab */}
                  {activeTab === "business" && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-wider">
                            Company Information
                          </p>
                        </div>
                        <BusinessInfoCard
                          business={businessInfo}
                          onEdit={handleBusinessEdit}
                          isEditing={editingBusiness}
                          onSave={handleBusinessSave}
                          onCancel={() => {
                            setEditingBusiness(false);
                            setTempBusiness({ ...businessInfo });
                          }}
                          onChange={(field, val) =>
                            setTempBusiness({ ...tempBusiness, [field]: val })
                          }
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-wider">
                            Bank Accounts
                          </p>
                          <button
                            onClick={() => setShowAddAccount(true)}
                            className="flex items-center gap-1.5 text-sm font-black text-indigo-600 hover:text-indigo-700"
                          >
                            <Plus size={14} /> Add Account
                          </button>
                        </div>
                        <div className="space-y-3">
                          {bankAccounts.map((acc) => (
                            <BankAccountCard
                              key={acc.id}
                              account={acc}
                              isEditing={editingAccount === acc.id}
                              onEdit={() => handleEditAccount(acc)}
                              onDelete={() => handleDeleteAccount(acc.id)}
                              onSave={handleSaveAccount}
                              onCancel={() => setEditingAccount(null)}
                              onChange={(field, val) =>
                                setTempAccount({ ...tempAccount, [field]: val })
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Language Tab */}
                  {activeTab === "language" && (
                    <div className="space-y-5">
                      <SelectField
                        label="Interface Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        options={[
                          { value: "english", label: "English (US)" },
                          { value: "hindi", label: "Hindi (हिन्दी)" },
                          { value: "spanish", label: "Spanish" },
                        ]}
                      />
                      <SelectField
                        label="Time Zone"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        options={[
                          {
                            value: "Asia/Kolkata",
                            label: "IST - Asia/Kolkata (+5:30)",
                          },
                          {
                            value: "America/New_York",
                            label: "EST - America/New_York (-5:00)",
                          },
                          {
                            value: "Europe/London",
                            label: "GMT - Europe/London (+0:00)",
                          },
                        ]}
                      />
                      <SelectField
                        label="Number Format"
                        value={numberFormat}
                        onChange={(e) => setNumberFormat(e.target.value)}
                        options={[
                          { value: "indian", label: "Indian - 1,00,000.00" },
                          {
                            value: "international",
                            label: "International - 100,000.00",
                          },
                        ]}
                      />
                    </div>
                  )}

                  {/* Activity Tab */}
                  {activeTab === "activity" && (
                    <div className="space-y-2">
                      {activities.map((item) => (
                        <ActivityItem key={item.id} {...item} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={() =>
          addActivity("Password changed successfully", "success", Key)
        }
        addActivity={addActivity}
      />

      <AnimatePresence>
        {showAddAccount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddAccount(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-sm">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-black text-gray-800">
                    Add Bank Account
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddAccount(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Field
                  label="Bank Name"
                  value={newAccount.bankName}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, bankName: e.target.value })
                  }
                />
                <Field
                  label="Account Number"
                  value={newAccount.accountNumber}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      accountNumber: e.target.value,
                    })
                  }
                />
                <Field
                  label="IFSC Code"
                  value={newAccount.ifsc}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, ifsc: e.target.value })
                  }
                />
                <Field
                  label="Account Holder Name"
                  value={newAccount.holderName}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, holderName: e.target.value })
                  }
                />
                <button
                  onClick={handleAddBankAccount}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 transition shadow-sm mt-2"
                >
                  Add Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;
