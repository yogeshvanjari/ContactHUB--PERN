import { Link } from "react-router-dom";
import { 
  BookUser, 
  Home, 
  Info, 
  PhoneCall, 
  ShieldCheck, 
  Heart, 
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 font-sans text-slate-600 antialiased select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ================= BRAND COLUMN ================= */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/Home" className="flex flex-row items-center space-x-3 shrink-0 no-underline group">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <BookUser className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                ContactHub
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              A modern, fast, and secure directory workspace designed to organize your professional and personal network effortlessly.
            </p>

            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Local Session Encrypted</span>
            </div>
          </div>

          {/* ================= NAVIGATION LINKS ================= */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/Home" className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 no-underline transition-colors">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/About" className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 no-underline transition-colors">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>About Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 no-underline transition-colors">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact Manager</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= QUICK ACCOUNT LINKS ================= */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Account
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/Login" className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 no-underline transition-colors">
                  <span>Sign In</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/Signup" className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 no-underline transition-colors">
                  <span>Create Account</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= SOCIAL CONNECT ================= */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Connect
            </h4>
            <div className="flex items-center space-x-2">
              <a href="#" className="p-2 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                <BookUser className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM COPYRIGHT BAR ================= */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="font-medium">
            &copy; {currentYear} ContactHub. All rights reserved.
          </p>

          <p className="flex items-center gap-1 font-medium">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>using React & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}