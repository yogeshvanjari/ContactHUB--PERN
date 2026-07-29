import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BookUser, 
  Home, 
  Info, 
  PhoneCall, 
  Users, 
  LogOut, 
  LogIn, 
  UserPlus, 
  User, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";

export default function NavbarContact() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Get current active session
  const sessionMob = sessionStorage.getItem("currentUser") || sessionStorage.getItem("usermob");

  // Retrieve user object from localStorage
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
  }

  // Display Name logic: Uses full name if registered, otherwise session mobile number
  const userName = sessionMob 
    ? (storedUser?.name || storedUser?.fullname || sessionMob) 
    : null;

  // Extract first letter for Avatar Badge
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "?";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("usermob");
    setIsUserMenuOpen(false);
    navigate("/Login");
  };

  const handleProtectedNavigation = (path, e) => {
    const isAuthenticated =
      sessionStorage.getItem("currentUser") || sessionStorage.getItem("usermob");

    if (!isAuthenticated) {
      e.preventDefault();
      alert("⚠️ Please login first to access this page!");
      navigate("/Login");
    }
  };

  const isActive = (path) => location.pathname === path;

  // Nav links with updated routes
  const navLinks = [
    { name: "Home", path: "/Home", icon: Home },
    { name: "About", path: "/About", icon: Info },
    { name: "Contact Manger", path: "/Contact", icon: PhoneCall },
    { name: "Contact List", path: "/contactpage", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-16 gap-4">
          
          {/* ================= 1. BRAND LOGO ================= */}
          <Link 
            to="/Home" 
            className="flex flex-row items-center space-x-3 shrink-0 no-underline group"
          >
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookUser className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              ContactHub
            </span>
          </Link>

          {/* ================= 2. DESKTOP NAVIGATION LINKS ================= */}
          <nav className="hidden md:flex flex-row items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              const isProtected = link.path === "/Contact" || link.path === "/contactpage";
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => isProtected && handleProtectedNavigation(link.path, e)}
                  className={`flex flex-row items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 no-underline whitespace-nowrap ${
                    active
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-indigo-600" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* ================= 3. USER PROFILE CORNER (SEARCH REMOVED) ================= */}
          <div className="hidden md:flex flex-row items-center space-x-3 shrink-0">
            
            {/* User Profile Button */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex flex-row items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100/80 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                  {userName ? userInitial : <User className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold text-slate-800 max-w-[110px] truncate capitalize">
                  {userName ? userName : "Account"}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isUserMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 text-xs">
                  {userName ? (
                    <>
                      <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Logged in as</p>
                        <p className="font-bold text-slate-900 truncate capitalize text-xs mt-0.5">{userName}</p>
                        {storedUser?.email && (
                          <p className="text-[10px] text-slate-500 truncate">{storedUser.email}</p>
                        )}
                      </div>

                      {/* Contact List Quick Link inside Dropdown */}
                      <Link
                        to="/contactpage"
                        onClick={(e) => {
                          handleProtectedNavigation("/contactpage", e);
                          setIsUserMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3.5 py-2.5 font-semibold no-underline transition-colors ${
                          isActive("/contactpage") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>View Contact List</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center space-x-2 px-3.5 py-2.5 text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer border-t border-slate-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/Login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3.5 py-2.5 font-semibold no-underline transition-colors ${
                          isActive("/Login") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <LogIn className="w-4 h-4 text-indigo-600" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/Signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3.5 py-2.5 font-semibold no-underline transition-colors ${
                          isActive("/Signup") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <UserPlus className="w-4 h-4 text-indigo-600" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* ================= 4. MOBILE HAMBURGER BUTTON ================= */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              const isProtected = link.path === "/Contact" || link.path === "/contactpage";
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (isProtected) {
                      handleProtectedNavigation(link.path, e);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-row items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold no-underline ${
                    active ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {userName ? (
              <div className="space-y-2">
                <div className="px-2 py-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Signed in as</p>
                  <p className="text-xs font-bold text-slate-800 capitalize">{userName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 text-xs font-semibold text-red-600 bg-red-50 rounded-xl border border-red-100 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/Login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl border border-slate-200 no-underline"
                >
                  <LogIn className="w-4 h-4 text-indigo-600" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/Signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-xl no-underline"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}