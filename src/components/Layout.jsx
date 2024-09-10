import Navbar from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> <Footer />
    </>
  );
}
