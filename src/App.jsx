import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import PostDetial from "./pages/PostDetial";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import AuthorPosts from "./pages/AuthorPosts";
import DeletePost from "./pages/DeletePost";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="posts/:id" element={<PostDetial />} />
        <Route path="login" element={<Login />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="authors" element={<Authors />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="posts/:id/edit" element={<EditPost />} />
        <Route path="posts/:id/delete" element={<DeletePost />} />
        <Route path="posts/user/:id" element={<AuthorPosts />} />
        |<Route path="myposts/:id" element={<Dashboard />} />
        <Route path="logot" element={<Logout />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default App;
