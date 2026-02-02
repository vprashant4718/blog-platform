import { LayoutDashboard, PenSquare, LogOut, BookOpen, LogIn, Home } from "lucide-react";
import Link from "next/link";
import '../globals.css';
const Navbar = () => {

  return (
    <nav className="bg-white border-b flex justify-center items-center border-gray-200 px-6 py-3 fixed w-full top-0 z-50">
        {/* Logo / Brand */}
        <Link href={'/'} className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
          <BookOpen size={20} />
          RealBlogs
        </Link>


      <div className="flex items-center justify-center gap-10 max-w-7xl mx-auto">

        {/* Navigation Links */}
        <div className="flex items-center pl-10 md:pr-10 gap-5 md:gap-20 text-sm font-medium text-gray-700">

          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            {/* <Home size={16} /> */}
            Home
          </Link >

          <Link
            href="/about"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            About
          </Link >
          
          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            Contact
          </Link >
         
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;