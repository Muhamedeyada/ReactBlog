import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
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
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer theme="dark" />
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_0_80px_-12px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 relative z-10">
        <div className="p-12 md:p-16">
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-500/30 mb-8 transform hover:rotate-12 transition-all duration-500">
              <FontAwesomeIcon icon={faBlog} className="text-white text-5xl" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-3">
              Portal Login
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Identity Verification Module</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-2">Secure Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-14 pr-4 py-5 bg-slate-800/50 border border-white/5 rounded-[1.5rem] text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500/50 focus:bg-slate-800/80 transition-all outline-none"
                  placeholder="user@nexus.io"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-2">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={values.showPassword ? "text" : "password"}
                  className="block w-full pl-14 pr-14 py-5 bg-slate-800/50 border border-white/5 rounded-[1.5rem] text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500/50 focus:bg-slate-800/80 transition-all outline-none"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={values.showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/30 transition-all transform active:scale-[0.98] mt-8 tracking-[0.2em] uppercase"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-slate-500 font-medium">
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
