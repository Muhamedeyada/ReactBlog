import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

export default function navbar() {
  return (
    <nav className="bg-slate-200 flex justify-between items-center pr-3 py-0">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost btn-sm text-xl">
          <img src={Logo} alt="navnar Logo" className="w-10 h-10" />
        </Link>
      </div>
      <div className="pr-4">
        <ul className="flex gap-2">
          <li>
            {" "}
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            {" "}
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            {" "}
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>

      <Link to="/profile" className="flex-none relative"></Link>
    </nav>
  );
}
