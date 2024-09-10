import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-2xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
