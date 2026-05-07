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
        toast.success("Welcome back!");
        navigate("/Home");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
      <ToastContainer />
      
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10">
        <div className="p-10 md:p-14">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-green-700 p-4 rounded-3xl shadow-lg shadow-green-200 mb-6">
              <FontAwesomeIcon icon={faBlog} className="text-white text-4xl" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium">Log in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type={values.showPassword ? "text" : "password"}
                  className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-600 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={values.showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 hover:shadow-lg hover:shadow-green-200 transition-all transform active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-green-700 font-bold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
