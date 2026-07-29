import axios from "axios";
import { useState, useEffect } from "react";

// DEBUG: Log environment variables
console.log("VITE ENV:", import.meta.env);
console.log("API URL:", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL;
import { 
  Users, 
  Search, 
  RefreshCw, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function ContactPage() {
  const [dataAll, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch contacts from backend
  const fetchContacts = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/contact`)
      .then((res) => {
        const contacts = Array.isArray(res.data?.menu)
          ? res.data.menu
          : Array.isArray(res.data)
          ? res.data
          : [];
        setData(contacts);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        setData([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Live search filtering (reversed order to show newest first)
  const filteredContacts = [...dataAll]
    .reverse()
    .filter((item) => {
      const s = search.toLowerCase();
      const itemName = item.name ? item.name.toLowerCase() : "";
      const itemMob = item.mob ? item.mob.toString() : "";
      const itemCity = item.city ? item.city.toLowerCase() : "";
      return itemName.includes(s) || itemMob.includes(s) || itemCity.includes(s);
    });

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-50 font-sans text-slate-800 antialiased p-4 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Read-Only Directory</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Contact List
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse and search all saved records in your network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                placeholder="Search name, mobile, city..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm transition-all"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchContacts}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3.5 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer shrink-0"
              title="Refresh List"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-indigo-600" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Directory Counter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Total Contacts:</span>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full font-extrabold">
              {filteredContacts.length}
            </span>
          </div>
        </div>

        {/* Contact Cards Grid (View-Only Mode) */}
        {isLoading && dataAll.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-xs font-semibold">Fetching directory records...</p>
          </div>
        ) : filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((item, index) => {
              const initial = item.name ? item.name.charAt(0).toUpperCase() : "?";

              return (
                <div
                  key={item.id || item._id || index}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg shrink-0 group-hover:scale-105 transition-transform duration-200">
                        {initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {item.name || "Unnamed Contact"}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 truncate mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{item.email || "No email provided"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-center space-x-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-500 w-14">Mobile:</span>
                        <span className="text-slate-800 font-medium truncate">
                          {item.mob || item.mobileno || "N/A"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <User className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-500">Age:</span>
                          <span className="text-slate-800 font-medium">{item.age || "N/A"}</span>
                        </div>

                        <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 min-w-0">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold text-slate-500">City:</span>
                          <span className="text-slate-800 font-medium truncate">{item.city || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm my-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Contacts Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No results match your search query. Try clearing the filter or refresh the directory.
            </p>
            <button
              onClick={() => {
                setSearch("");
                fetchContacts();
              }}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-4 rounded-xl border border-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}