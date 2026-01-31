import { LayoutDashboard, PenSquare, LogOut, BookOpen, LogIn } from "lucide-react";
import Link from "next/link";
import '../globals.css';
const Navbar = () => {

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
          <BookOpen size={20} />
          Blog Admin
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

         

          <Link
            href="/blogs/create"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            <PenSquare size={16} />
            Create Blog
          </Link >
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;