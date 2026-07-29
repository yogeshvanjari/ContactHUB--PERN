import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Phone, 
  Lock, 
  BookUser, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  AlertCircle,
  X
} from "lucide-react";

export default function Login() {
  const [mob, setMob] = useState("");
  const [pass, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Top Notification Banner State
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  // Helper function to display auto-dismissing banner
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3500);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();

    if (!mob.trim() || !pass.trim()) {
      showMessage("Please enter both mobile number and password", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      let storedUser = null;

      try {
        storedUser = JSON.parse(localStorage.getItem("user") || "null");
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }

      // Check if user exists in localStorage
      if (!storedUser) {
        showMessage("No User Found! Please Signup First ❌", "error");
        setIsLoading(false);
        return;
      }

      // Verify Credentials (mobileno + password)
      if (storedUser.mobileno === mob && storedUser.password === pass) {
        // Store current active session
        sessionStorage.setItem("currentUser", mob);
        sessionStorage.setItem("usermob", mob);

        // Show Success Banner Notification
        showMessage("Login Successful! Redirecting... ✅", "success");

        // Small delay so user can read the success message
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home");
        }, 1200);
      } else {
        showMessage("Invalid Mobile Number or Password ❌", "error");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 my-auto">
        
        {/* ================= LEFT SIDE: Feature Sidebar ================= */}
        <div className="hidden lg:flex lg:w-5/12 p-8 flex-col justify-between space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm self-start">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Welcome Back</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Access your contact directory with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                absolute ease.
              </span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Log in to manage, search, and organize all your personal and professional connections effortlessly.
            </p>
          </div>

          <ul className="space-y-3 text-xs font-semibold text-slate-700">
            <li className="flex items-center space-x-3">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Instant session restoration</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Secure local credentials check</span>
            </li>
          </ul>

          <div className="flex items-center space-x-2 text-xs text-slate-500 pt-4 border-t border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Enterprise-grade privacy standards</span>
          </div>

        </div>

        {/* ================= RIGHT SIDE: Login Form Card ================= */}
        <div className="w-full lg:w-6/12 flex flex-col items-center justify-center">
          
          {/* TOP NOTIFICATION BANNER */}
          {message.text && (
            <div className="w-full max-w-md mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
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

          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex lg:hidden items-center space-x-2.5 mb-4">
                <div className="p-2 bg-indigo-600 rounded-xl text-white">
                  <BookUser className="w-5 h-5" />
                </div>
                <span className="text-lg font-black text-slate-900">ContactHub</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please enter your registered mobile details.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Mobile Field */}
              <div className="space-y-1">
                <label htmlFor="mobile" className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="mobile"
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={mob}
                    onChange={(e) => setMob(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label htmlFor="password" className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={pass}
                    onChange={(e) => setpassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group disabled:opacity-70 cursor-pointer text-xs mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Signup Link */}
            <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Don't have an account?{" "}
              <Link to="/Signup" className="text-indigo-600 font-bold hover:underline">
                Create an account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}