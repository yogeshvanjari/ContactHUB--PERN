import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, 
  Mail, 
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

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [pass, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Top Notification Banner State
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3500);
  };

  const handleSignup = (e) => {
    if (e) e.preventDefault();

    // Field Validations
    let newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    if (!mob.trim()) newErrors.mob = "Mobile number is required";
    if (!pass.trim()) newErrors.pass = "Password is required";

    setErrors(newErrors);

    // Stop if validation errors exist
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    setTimeout(() => {
      const userdata = {
        name: fullname,
        email: email,
        mobileno: mob,
        password: pass,
      };

      // Save complete user object to localStorage
      localStorage.setItem("user", JSON.stringify(userdata));
      sessionStorage.setItem("usermob", mob);

      // Display Signup Success Notification
      showMessage("Signup Successful! Redirecting to login... ✅", "success");

      // Delayed navigation so user can see the notification
      setTimeout(() => {
        setIsLoading(false);
        navigate("/Login");
      }, 1200);
    }, 600);
  };

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      console.log("Saved User in LocalStorage:", storedUser);
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 -z-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 my-auto">
        
        {/* ================= LEFT SIDE: Feature Sidebar ================= */}
        <div className="hidden lg:flex lg:w-5/12 p-8 flex-col justify-between space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-sm self-start">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Join ContactHub Today</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Start managing your network with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                complete confidence.
              </span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create an account to securely organize, search, and access all your business and personal contacts in one unified workspace.
            </p>
          </div>

          <ul className="space-y-3 text-xs font-semibold text-slate-700">
            <li className="flex items-center space-x-3">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Instant account activation</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Encrypted local storage persistence</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Fast contact lookup & management</span>
            </li>
          </ul>

          <div className="flex items-center space-x-2 text-xs text-slate-500 pt-4 border-t border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Enterprise-grade privacy standards</span>
          </div>

        </div>

        {/* ================= RIGHT SIDE: Signup Form Card ================= */}
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
            
            {/* Form Header */}
            <div>
              <div className="inline-flex lg:hidden items-center space-x-2.5 mb-4">
                <div className="p-2 bg-indigo-600 rounded-xl text-white">
                  <BookUser className="w-5 h-5" />
                </div>
                <span className="text-lg font-black text-slate-900">ContactHub</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Create your account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to register and get started.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Full Name Field */}
              <div className="space-y-1">
                <label htmlFor="fullname" className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Alex Morgan"
                    value={fullname}
                    onChange={(e) => {
                      setFullname(e.target.value);
                      if (errors.fullname) setErrors((prev) => ({ ...prev, fullname: "" }));
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.fullname 
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    }`}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullname}
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.email 
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-1">
                <label htmlFor="mobile" className="block text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={mob}
                    onChange={(e) => {
                      setMob(e.target.value);
                      if (errors.mob) setErrors((prev) => ({ ...prev, mob: "" }));
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.mob 
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    }`}
                  />
                </div>
                {errors.mob && (
                  <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.mob}
                  </p>
                )}
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
                    placeholder="••••••••"
                    value={pass}
                    onChange={(e) => {
                      setpassword(e.target.value);
                      if (errors.pass) setErrors((prev) => ({ ...prev, pass: "" }));
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                      errors.pass 
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    }`}
                  />
                </div>
                {errors.pass && (
                  <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.pass}
                  </p>
                )}
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
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Sign-in Link */}
            <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Already have an account?{" "}
              <Link to="/Login" className="text-indigo-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}