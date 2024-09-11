import { Link } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [image, setImg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword !== confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:");
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <section className="profile flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <Link to={`/myposts/sdsad`} className="btn btn-primary mb-4">
          My Posts
        </Link>
        <div className="profile_details bg-white p-6 rounded-lg shadow-md text-center">
          <div className="image_wrapper flex flex-col items-center">
            <div className="profile_image mb-4">
              <img
                src={image}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover"
              />
            </div>
            <form className="form flex flex-col items-center">
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
                accept="image/png, image/jpg, image/jpeg"
                className="hidden"
              />
              <label htmlFor="profile" className="btn btn-secondary mb-2">
                <FaEdit />
              </label>
            </form>
            <button className="btn btn-success">
              <FaCheck />
            </button>
          </div>
          <h1 className="text-2xl font-bold mt-4">momom</h1>
          <form
            className="form profile_form mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.currentPassword && (
              <p className="text-red-500">{errors.currentPassword}</p>
            )}
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword}</p>
            )}
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500">{errors.confirmNewPassword}</p>
            )}
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
