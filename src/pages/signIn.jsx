import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faImage } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleClickShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
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
      // Check if email already exists
      const checkEmailResponse = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );
      if (checkEmailResponse.data.length > 0) {
        handleShowToast("User with this email already has an account");
        return;
      }

      // Send registration request
      const response = await axios.post("http://localhost:3000/users", {
        userName,
        userImage,
        email,
        password,
      });

      console.log(response); // Log response for debugging
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error); // Log errors for debugging
      handleShowToast("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-green-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <FontAwesomeIcon
              icon={faBlog}
              className="text-white text-2xl bg-green-900 rounded-full p-2"
            />
            <h1 className="text-2xl font-semibold text-green-900">BLOG</h1>
          </div>
          <h2 className="text-xl font-bold">Welcome to our blog</h2>
          <p className="text-gray-600">Let's get started!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FontAwesomeIcon
                icon={faBlog}
                className="text-gray-500 text-lg"
              />
              <input
                type="text"
                className="ml-2 flex-1 border-none focus:ring-0"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FontAwesomeIcon
                icon={faImage}
                className="text-gray-500 text-lg"
              />
              <input
                type="text"
                className="ml-2 flex-1 border-none focus:ring-0"
                placeholder="Your image URL"
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FontAwesomeIcon
                icon={faImage}
                className="text-gray-500 text-lg"
              />
              <input
                type="text"
                className="ml-2 flex-1 border-none focus:ring-0"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <input
                type={showPassword ? "text" : "password"}
                className="ml-2 flex-1 border-none focus:ring-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IconButton
                onClick={() => handleClickShowPassword("password")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="ml-2 flex-1 border-none focus:ring-0"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <IconButton
                onClick={() => handleClickShowPassword("confirmPassword")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-700 text-white rounded-full hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-500 font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
