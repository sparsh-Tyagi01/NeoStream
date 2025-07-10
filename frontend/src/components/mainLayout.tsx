import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import Footer from "./footer"

const MainLayout = () => {
  return (
    <>
        <nav className="sticky top-0 left-0 z-50"><Navbar/></nav>
        <main className="w-full min-h-screen">
            <Outlet/>
        </main>
        <footer className="w-full">
          <Footer/>
        </footer>
    </>
  )
}

export default MainLayout