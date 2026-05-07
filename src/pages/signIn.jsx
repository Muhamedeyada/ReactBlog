import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faImage, faUser, faEnvelope, faLock, faEye, faEyeSlash, faLink } from "@fortawesome/free-solid-svg-icons";
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
        `http://localhost:3000/users?email=${email}`
      );
      if (checkEmailResponse.data.length > 0) {
        handleShowToast("User with this email already has an account");
        return;
      }

      await axios.post("http://localhost:3000/users", {
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
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 py-20 relative overflow-hidden">
      <ToastContainer theme="dark" />
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 relative z-10">
        <div className="p-10 md:p-14">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-[2rem] shadow-xl shadow-indigo-500/20 mb-8 transform hover:scale-110 transition-transform">
              <FontAwesomeIcon icon={faBlog} className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-3">
              Initialize Profile
            </h1>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Access the Dark Realm</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avatar Preview Section */}
            <div className="md:col-span-2 flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full border-2 border-indigo-500/30 p-1 bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/10">
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
              <p className="text-[10px] text-slate-500 mt-2 uppercase font-black tracking-[0.2em]">Profile Avatar Preview</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Codename</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Frequency (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 outline-none transition-all"
                  placeholder="name@nexus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Avatar Vector URL</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 outline-none transition-all"
                  placeholder="https://visuals.source.com/vector.jpg"
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
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Encryption Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Verify Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-lg hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/20 transition-all transform active:scale-[0.98] mt-6 tracking-[0.2em] uppercase"
            >
              INITIALIZE IDENTITY
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-medium">
              Existing member of the realm?{" "}
              <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-500/30">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
