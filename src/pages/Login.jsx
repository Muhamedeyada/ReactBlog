import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faEnvelope, faLock, faEye, faEyeSlash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userName") !== null;
    if (isLoggedIn) {
      navigate("/Home");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const togglePasswordVisibility = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!values.email) {
      toast.warning("Email is required.");
      return;
    }

    if (!values.password) {
      toast.warning("Password is required.");
      return;
    }

    try {
      const response = await axios.get(
        `/api/users?email=${values.email}&password=${values.password}`
      );

      if (response.data.length > 0) {
        const user = response.data[0];
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.userImage);
        toast.success("Identity Verified. Welcome back! ✨");
        navigate("/Home");
      } else {
        toast.error("Invalid credentials. Access denied.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Authentication server unreachable.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6 relative overflow-hidden">
      <ToastContainer theme="dark" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900/40 backdrop-blur-3xl rounded-none md:rounded-[3.5rem] shadow-2xl overflow-hidden border-0 md:border border-white/5 relative z-10 min-h-[600px]">
        
        {/* Left Side: Visual/Branding */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-gradient-to-br from-indigo-900/40 to-slate-900/60 border-r border-white/5 relative overflow-hidden">
           <div className="relative z-10">
              <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-10">
                <FontAwesomeIcon icon={faBlog} className="text-white text-2xl" />
              </div>
              <h2 className="text-5xl font-black text-white leading-tight mb-6">
                Explore the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Nexus of Stories.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-xs">
                A premium space for digital transmissions and profound experiences.
              </p>
           </div>
           
           <div className="relative z-10 flex items-center space-x-4">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 overflow-hidden`}>
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                 ))}
              </div>
              <span className="text-sm font-bold text-slate-500 tracking-wide uppercase">Join 10k+ Explorers</span>
           </div>

           {/* Decorative pattern */}
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-slate-950/20">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-white mb-2">Portal Access</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Identity Verification Module</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Frequency (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all duration-300">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-14 pr-4 py-5 bg-slate-800/40 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500/50 focus:bg-slate-800/80 transition-all outline-none"
                  placeholder="user@nexus.io"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Access Key (Pass)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all duration-300">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={values.showPassword ? "text" : "password"}
                  className="block w-full pl-14 pr-14 py-5 bg-slate-800/40 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500/50 focus:bg-slate-800/80 transition-all outline-none"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={values.showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center space-x-3 tracking-[0.2em] uppercase"
            >
              <span>Authenticate</span>
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-600 font-bold text-sm">
              New explorer?{" "}
              <Link to="/signUp" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors underline underline-offset-8 decoration-indigo-500/20">
                Initialize Identity
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
