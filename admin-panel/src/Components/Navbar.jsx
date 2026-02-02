import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PenSquare,
  LogOut,
  LogIn,
  Magnet,
  User2,
  Menu,
  X,
  BookAIcon,
} from "lucide-react";
import API from "../utils/api";
import { clearUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      dispatch(clearUser());
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 relative">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Magnet size={20} />
          Blog Admin
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {user && (
            <>
              <NavLink to="/dashboard" icon={<LayoutDashboard size={16} />} label="Dashboard" />
              <NavLink to="/dashboard/allblogs" icon={<BookAIcon size={16} />} label="All Blogs" />
              <NavLink to="/blogs/create" icon={<PenSquare size={16} />} label="Create Blog" />
            </>
          )}

          {user?.role === "superAdmin" && (
            <NavLink
              to="/dashboard/usermanagement"
              icon={<User2 size={16} />}
              label="User Management"
            />
          )}

          {/* Profile */}
          {user ? (
            <ProfileDropdown
              user={user}
              open={profileOpen}
              setOpen={setProfileOpen}
              onLogout={handleLogout}
            />
          ) : (
            <Link to="/login" className="bg-gray-900 text-white px-3 py-2 rounded-md">
              <LogIn size={16} />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white border rounded-lg shadow p-4 space-y-3">
          {user && (
            <>
              <MobileLink to="/dashboard" label="Dashboard" />
              <MobileLink to="/dashboard/allblogs" label="All Blogs" />
              <MobileLink to="/blogs/create" label="Create Blog" />
            </>
          )}

          {user?.role === "superAdmin" && (
            <MobileLink to="/dashboard/usermanagement" label="User Management" />
          )}

          {user ? (
            <>
              <div className="border-t pt-3 text-sm flex flex-col justify-center items-center gap-1">
                <p className="text-sm text-gray-400 capitalize mb-3">{user.role}</p>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 border-t pt-3 mt-3 flex items-center gap-2 justify-center"
              >
                Logout
              </button>
            </>
          ) : (
            <MobileLink to="/login" label="Login" />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* ---------- Components ---------- */

const NavLink = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-1 hover:text-gray-900">
    {icon} {label}
  </Link>
);

const MobileLink = ({ to, label }) => (
  <Link to={to} className="block text-gray-700">
    {label}
  </Link>
);

const ProfileDropdown = ({ user, open, setOpen, onLogout }) => (
  <div className="relative">
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center gap-2"
    >
      <div className="h-8 w-8 bg-gray-900 text-white rounded-full flex items-center justify-center">
        {user.name?.charAt(0).toUpperCase()}
      </div>
    </button>

    {open && (
      <div className="absolute flex flex-col justify-center items-center gap-1 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 text-sm z-50">
        <p className="text-sm text-gray-400 capitalize mb-3">{user.role}</p>
        <p className="font-semibold">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
        
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-600 border-t pt-3 mt-3 w-full justify-center"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    )}
  </div>
);
