import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="sticky top-0 left-0 z-50 shadow-md shadow-black/40">
        <Navbar />
      </header>

      <main className="flex-1 w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="w-full mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
