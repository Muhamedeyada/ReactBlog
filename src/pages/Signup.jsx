import { useState } from "react";

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Input change handler
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateField(name, value); // Validate individual field on change
  };

  // Validate a single field
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = value ? "" : "Name is required";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = emailRegex.test(value) ? "" : "Invalid email format";
        break;
      case "password":
        newErrors.password =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value === userData.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validate all fields before submission
  const validate = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = "Name is required";
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (userData.password !== userData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:", userData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={userData.name}
              onChange={changeInputHandler}
              className={`input input-bordered w-full ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm absolute bottom-0 left-0">
                {errors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={changeInputHandler}
              className={`input input-bordered w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm absolute bottom-0 left-0">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={changeInputHandler}
              className={`input input-bordered w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm absolute bottom-0 left-0">
                {errors.password}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={changeInputHandler}
              className={`input input-bordered w-full ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm absolute bottom-0 left-0">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
