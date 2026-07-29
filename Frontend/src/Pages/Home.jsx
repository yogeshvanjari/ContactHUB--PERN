import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Users, 
  Search, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  BookUser,
  Star,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/Contactpage");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs (Light Palette) */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 my-auto w-full">
        
        {/* Hero Top Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Light Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Modern Contact Directory</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Your network, organized with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              absolute precision.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Experience an effortless contact management system designed for speed. Keep track of phone numbers, emails, and notes in one crisp interface.
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleNavigate}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading Directory...</span>
                </>
              ) : (
                <>
                  <BookUser className="w-5 h-5" />
                  <span>Explore Contact List</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <Link
              to="/About"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3.5 px-6 rounded-xl border border-slate-300 shadow-sm transition-colors no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Grid with White Cards & Indigo Accents */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-200">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Dialing & Info</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Store phone numbers, active tags, and emergency details accessible in milliseconds.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Query Filter</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Search by name, digits, or custom tags directly through the built-in search engine.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Privacy First</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your contact records remain strictly local to your browser session with zero data leakage.
            </p>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-indigo-600">100%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Responsive</div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-indigo-600">Instant</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Local Storage</div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-indigo-600">Zero</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Configuration</div>
          </div>
        </div>

      </main>

      {/* Light Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 font-medium">
        ContactHub — Modern Directory Workspace
      </footer>

    </div>
  );
}