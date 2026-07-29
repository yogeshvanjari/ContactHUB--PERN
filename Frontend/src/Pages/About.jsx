import { useNavigate, Link } from "react-router-dom";
import { 
  BookUser, 
  ShieldCheck, 
  Zap, 
  Search, 
  Users, 
  Database, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-50 font-sans text-slate-800 antialiased p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full my-auto space-y-12">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>About ContactHub Workspace</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Designed for speed, clarity, and{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              effortless networking.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            ContactHub is a high-performance contact directory built to eliminate clutter. Manage phone numbers, emails, locations, and personal notes across your entire team.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/Contact")}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Open Contact Manager</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ================= FEATURE HIGHLIGHTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instant Sync & Query</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Filter through hundreds of saved contacts by name or mobile number with zero latency.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">REST API Connected</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fully integrated with backend REST endpoints for real-time CRUD operations.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Encrypted Local Session</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Active user sessions and quick settings are securely maintained in standard storage.
            </p>
          </div>

        </div>

        {/* ================= SYSTEM CAPABILITIES LIST ================= */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900">What you can do with ContactHub</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Add, edit, or delete contact records instantly</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Auto-reverse ordering displays newest contacts first</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Top-level auto-dismissing banner notifications</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Fully responsive design for desktop & mobile devices</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}