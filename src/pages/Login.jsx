import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        toast.success("Login successful!");
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
    <>
      <ToastContainer />
      <div className="bg-green-900 h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              className="text-green-900 text-3xl mr-2"
              icon={faBlog}
            />
            <h1 className="text-2xl font-bold text-gray-900">BLOG</h1>
          </div>
          <h2 className="text-lg font-semibold mb-4">Welcome back!</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="border rounded-lg p-2"
                placeholder="Email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <IconButton
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            New to BLOG?{" "}
            <Link
              to="/signUp"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
