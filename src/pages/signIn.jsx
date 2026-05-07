import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faImage, faUser, faEnvelope, faLock, faEye, faEyeSlash, faLink, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imgPreviewError, setImgPreviewError] = useState(false);

  const handleShowToast = (message) => {
    toast.error(message);
  };

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      handleShowToast("Invalid email address");
      return;
    }

    if (password.length < 6) {
      handleShowToast("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      handleShowToast("Passwords do not match");
      return;
    }

    try {
      const checkEmailResponse = await axios.get(
        `/api/users?email=${email}`
      );
      if (checkEmailResponse.data.length > 0) {
        handleShowToast("User with this email already has an account");
        return;
      }

      await axios.post("/api/users", {
        userName,
        userImage,
        email,
        password,
      });

      toast.success("Identity initialized successfully! ✨");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      handleShowToast("Initialization failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6 relative overflow-hidden">
      <ToastContainer theme="dark" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-5 bg-slate-900/40 backdrop-blur-3xl rounded-none md:rounded-[3.5rem] shadow-2xl overflow-hidden border-0 md:border border-white/5 relative z-10 min-h-[700px]">
        
        {/* Left Side: Brand & Preview (2/5) */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-between p-16 bg-gradient-to-br from-indigo-900/30 to-slate-900/60 border-r border-white/5 relative overflow-hidden">
           <div className="relative z-10">
              <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-10">
                <FontAwesomeIcon icon={faBlog} className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
                Craft Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500 underline decoration-indigo-500/20 underline-offset-8">Identity.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-xs mb-12">
                Begin your journey as a contributor to the global nexus of digital stories.
              </p>

              {/* Avatar Preview Case */}
              <div className="bg-slate-950/40 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm inline-flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full border-4 border-indigo-600/30 p-1.5 bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-500/20 mb-4 transition-all hover:scale-105 duration-500">
                    {userImage && !imgPreviewError ? (
                      <img 
                        src={userImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setImgPreviewError(true)}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="text-slate-500 text-3xl" />
                    )}
                 </div>
                 <div className="text-center">
                    <p className="text-white font-black text-sm uppercase tracking-widest">{userName || "New Explorer"}</p>
                    <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Preview Protocol</p>
                 </div>
              </div>
           </div>

           {/* Decorative grid */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>

        {/* Right Side: Registration Form (3/5) */}
        <div className="md:col-span-3 p-10 md:p-16 flex flex-col justify-center bg-slate-950/10">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-white mb-2">Initialize Profile</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Access Sequence Required</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Codename</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-14 pr-4 py-4 bg-slate-800/40 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Frequency (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-14 pr-4 py-4 bg-slate-800/40 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500 transition-all outline-none"
                  placeholder="name@nexus.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2 space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Avatar Vector (URL)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-14 pr-4 py-4 bg-slate-800/40 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500 transition-all outline-none"
                  placeholder="https://visuals.nexus.com/image.jpg"
                  value={userImage}
                  onChange={(e) => {
                    setUserImage(e.target.value);
                    setImgPreviewError(false);
                  }}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Secure Pass</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-14 pr-12 py-4 bg-slate-800/40 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500 transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1">Verify Pass</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-all">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full pl-14 pr-12 py-4 bg-slate-800/40 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/40 focus:border-indigo-500 transition-all outline-none"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="sm:col-span-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-lg hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/20 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center space-x-3 tracking-[0.2em] uppercase"
            >
              <span>Initialize Profile</span>
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-600 font-bold text-sm">
              Member of the nexus?{" "}
              <Link to="/login" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors underline underline-offset-8 decoration-indigo-500/20">
                Enter Portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
