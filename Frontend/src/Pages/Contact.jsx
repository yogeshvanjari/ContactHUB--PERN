import axios from "axios";
import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  X, 
  CheckCircle2, 
  RefreshCw, 
  Loader2, 
  Users,
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [eml, setEml] = useState("");
  const [mob, setMob] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [DataAll, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Top Notification Banner State
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3500);
  };

  // Fetch contacts
  const contact = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/contact")
      .then((res) => {
        setData(res.data.menu || res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    contact();
  }, []);

  // Save new contact
  const save = (e) => {
    if (e) e.preventDefault();
    if (!name || !eml || !mob) {
      showMessage("Please fill in required fields (Name, Email, Mobile)", "error");
      return;
    }

    setIsSubmitting(true);
    const dt = { name, email: eml, mob, age, city };

    axios
      .post("http://localhost:3000/addcontact", dt)
      .then(() => {
        clearForm();
        contact();
        showMessage("Contact added successfully!", "success");
      })
      .catch(() => showMessage("Failed to add contact. Something went wrong!", "error"))
      .finally(() => setIsSubmitting(false));
  };

  // Delete contact
  const del = (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    axios
      .delete("http://localhost:3000/contactDelById", { data: { id } })
      .then(() => {
        contact();
        // Show delete success message
        showMessage("Contact deleted successfully!", "success");
      })
      .catch(() => showMessage("Failed to delete contact!", "error"));
  };

  // Start edit mode
  const startEdit = (item) => {
    setEditId(item.id || item._id);
    setName(item.name || "");
    setEml(item.email || "");
    setMob(item.mob || item.mobileno || "");
    setAge(item.age || "");
    setCity(item.city || "");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update contact
  const updateUser = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    const dt = { id: editId, name, email: eml, mob, age, city };

    axios
      .put("http://localhost:3000/updcontact", dt)
      .then(() => {
        clearForm();
        contact();
        showMessage("Contact updated successfully!", "success");
      })
      .catch(() => showMessage("Update failed. Something went wrong!", "error"))
      .finally(() => setIsSubmitting(false));
  };

  // Clear form
  const clearForm = () => {
    setName("");
    setEml("");
    setMob("");
    setAge("");
    setCity("");
    setEditId(null);
  };

  // Filter contacts AND REVERSE order so newest appear on top
  const filteredContacts = [...DataAll]
    .reverse() // Reverses array so the latest added item appears FIRST
    .filter((item) => {
      const s = search.toLowerCase();
      const itemName = item.name ? item.name.toLowerCase() : "";
      const itemMob = item.mob ? item.mob.toString() : "";
      return itemName.includes(s) || itemMob.includes(s);
    });

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-50 font-sans text-slate-800 antialiased p-4 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Interactive Directory Manager</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Contact Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Add new contacts or edit existing entries below.
            </p>
          </div>

          <button
            onClick={contact}
            disabled={isLoading}
            className="self-start md:self-auto flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-indigo-600" : ""}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* TOP NOTIFICATION BANNER */}
        {message.text && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-semibold shadow-sm ${
                message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}
            >
              <div className="flex items-center space-x-2">
                {message.type === "error" ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>

              <button
                onClick={() => setMessage({ text: "", type: "" })}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Main Grid: Form (Left) & Directory Table (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT: ADD / EDIT FORM ================= */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600">
                  {editId ? <Edit3 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  {editId ? "Edit Contact" : "Add New Contact"}
                </h2>
              </div>
              {editId && (
                <button
                  onClick={clearForm}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </div>

            <form onSubmit={editId ? updateUser : save} className="space-y-4">
              
              {/* Name Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    placeholder="e.g. Alex Morgan"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={eml}
                    placeholder="alex@example.com"
                    required
                    onChange={(e) => setEml(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Mobile Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={mob}
                    placeholder="+1 (555) 000-0000"
                    required
                    onChange={(e) => setMob(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Age & City Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      value={age}
                      placeholder="e.g. 28"
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={city}
                      placeholder="e.g. New York"
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4 disabled:opacity-70 cursor-pointer text-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : editId ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Update Contact Details</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Save New Contact</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* ================= RIGHT: CONTACT DIRECTORY TABLE ================= */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            
            {/* Search and Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Saved Contacts</span>
                <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full font-bold">
                  {filteredContacts.length}
                </span>
              </h2>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  placeholder="Search name or mobile..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Mobile</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((item, index) => {
                      const initial = item.name ? item.name.charAt(0).toUpperCase() : "?";
                      const isEditingThis = editId === (item.id || item._id);

                      return (
                        <tr 
                          key={item.id || item._id || index}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isEditingThis ? "bg-indigo-50/40" : ""
                          }`}
                        >
                          {/* Name + Email */}
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                                {initial}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 truncate">
                                  {item.name || "N/A"}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                  {item.email || "No email"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Mobile */}
                          <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                            {item.mob || item.mobileno || "N/A"}
                          </td>

                          {/* City + Age */}
                          <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                            <span>{item.city || "N/A"}</span>
                            {item.age && (
                              <span className="text-[10px] text-slate-400 ml-1.5 bg-slate-100 px-1.5 py-0.5 rounded">
                                {item.age} yrs
                              </span>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="inline-flex items-center space-x-1">
                              <button
                                onClick={() => startEdit(item)}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Contact"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => del(item.id || item._id)}
                                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Contact"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">
                        No contacts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* Light Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white/50 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 lg:-mx-8 lg:-mb-8 py-4 text-center text-xs text-slate-500 font-medium">
        ContactHub — Modern Directory Workspace
      </footer>

    </div>
  );
}