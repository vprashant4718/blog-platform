import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, PenSquare, LogOut, BookOpen, LogIn } from "lucide-react";
import API from "../utils/api";
import { clearUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state)=> state.auth);
  console.log(user);
  
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
       dispatch(clearUser());
       navigate("/login");

    } catch (error) {
      alert("Logout failed");
    }
  };

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

         {user && <> <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <Link
            to="/blogs/create"
            className="flex items-center gap-1 hover:text-gray-900 transition"
          >
            <PenSquare size={16} />
            Create Blog
          </Link ></>}

          {/* Logout */}
          {user ?<button 
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
          :
          <Link
            to="/login"
            className="flex items-center gap-1 bg-neutral-900 p-2 rounded-md text-white hover:text-red-700 transition"
          >
            <LogIn size={16} />
            Login
          </Link>}

        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;