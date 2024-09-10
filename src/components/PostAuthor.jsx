import { Link } from "react-router-dom";

export default function PostAuthor() {
  return (
    <Link to={`/posts/users/sadasd`} className="flex items-center space-x-4">
      {/* Author Avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
        <img
          src="https://via.placeholder.com/48" // Placeholder image; replace with dynamic URL
          alt="Author Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Author Details */}
      <div className="text-sm">
        <h5 className="font-medium text-gray-900">by: fdgdf</h5>
        <small className="text-gray-500">Author Bio</small>{" "}
        {/* Replace with dynamic bio if available */}
      </div>
    </Link>
  );
}
